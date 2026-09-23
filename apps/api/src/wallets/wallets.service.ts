import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaystackService } from './paystack.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService, private paystackService: PaystackService) {}

  // Feature 2: "No-Change" Wallet Escrow (Phase 1)
  async resolveEscrow(rideId: string, amountToRefund: number) {
    if (amountToRefund <= 0) {
      throw new BadRequestException('Refund amount must be greater than zero');
    }

    return await this.prisma.$transaction(async (tx) => {
      // 1. Fetch Ride Details
      const ride = await tx.ride.findUnique({
        where: { id: rideId },
        include: { driver: true, passenger: true }
      });

      if (!ride || !ride.driverId) {
        throw new NotFoundException('Ride or Driver not found');
      }

      // 2. Fetch Wallets
      const passengerWallet = await tx.wallet.findUnique({ where: { userId: ride.passengerId } });
      const driverWallet = await tx.wallet.findUnique({ where: { userId: ride.driverId } });

      if (!passengerWallet || !driverWallet) {
        throw new BadRequestException('Wallet not found for driver or passenger');
      }

      if (passengerWallet.balance < amountToRefund) {
        throw new BadRequestException('Passenger wallet has insufficient funds to cover exact change');
      }

      // 3. Perform Transfers (Deduct Passenger, Credit Driver)
      const updatedPassengerWallet = await tx.wallet.update({
        where: { id: passengerWallet.id },
        data: { balance: { decrement: amountToRefund } }
      });

      const updatedDriverWallet = await tx.wallet.update({
        where: { id: driverWallet.id },
        data: { balance: { increment: amountToRefund } }
      });

      // 4. Create Transaction Records (Marked as Escrow for auditing)
      await tx.transaction.createMany({
        data: [
          {
            walletId: passengerWallet.id,
            amount: -amountToRefund,
            type: 'DEBIT',
            reference: `ESCROW_OUT_${ride.id}_${Date.now()}`,
            description: 'Change Escrow Transfer',
            isEscrow: true
          },
          {
            walletId: driverWallet.id,
            amount: amountToRefund,
            type: 'CREDIT',
            reference: `ESCROW_IN_${ride.id}_${Date.now()}`,
            description: 'Change Escrow Transfer',
            isEscrow: true
          }
        ]
      });

      return {
        message: 'Escrow resolved successfully. Exact change transferred.',
        passengerNewBalance: updatedPassengerWallet.balance,
        driverNewBalance: updatedDriverWallet.balance
      };
    });
  }

  // Feature: Wallet Funding via Paystack (Init)
  async fundWalletInitiate(userId: string, email: string, amount: number) {
    if (amount < 100) {
      throw new BadRequestException('Minimum funding amount is ₦100');
    }

    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    const reference = `FUND_${wallet.id}_${Date.now()}`;
    
    // 1. Initialize Paystack Checkout
    const paystackInit = await this.paystackService.initializeTransaction(email, amount * 100, reference);

    // 2. Create PENDING transaction in Ledger
    await this.prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount: amount,
        type: 'CREDIT',
        status: 'PENDING',
        reference: reference,
        description: 'Wallet Top-up via Paystack',
      }
    });

    return paystackInit;
  }

  // Feature: Wallet Funding Webhook Processing
  async handleSuccessfulPayment(reference: string, amountPaid: number) {
    return await this.prisma.$transaction(async (tx) => {
      const pendingTx = await tx.transaction.findUnique({ where: { reference } });
      
      if (!pendingTx || pendingTx.status === 'COMPLETED') {
        return; // Idempotency check: Already processed or doesn't exist
      }

      // Convert kobo back to Naira
      const amountNaira = amountPaid / 100;

      // Update Transaction status to COMPLETED
      await tx.transaction.update({
        where: { id: pendingTx.id },
        data: { status: 'COMPLETED' }
      });

      // Credit Wallet Balance
      await tx.wallet.update({
        where: { id: pendingTx.walletId },
        data: { balance: { increment: amountNaira } }
      });
      
      console.log(`[PAYSTACK WEBHOOK] Wallet funded successfully for Ref: ${reference}`);
    });
  }
}
