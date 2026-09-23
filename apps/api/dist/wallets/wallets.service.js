var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaystackService } from './paystack.service';
let WalletsService = class WalletsService {
    prisma;
    paystackService;
    constructor(prisma, paystackService) {
        this.prisma = prisma;
        this.paystackService = paystackService;
    }
    async resolveEscrow(rideId, amountToRefund) {
        if (amountToRefund <= 0) {
            throw new BadRequestException('Refund amount must be greater than zero');
        }
        return await this.prisma.$transaction(async (tx) => {
            const ride = await tx.ride.findUnique({
                where: { id: rideId },
                include: { driver: true, passenger: true }
            });
            if (!ride || !ride.driverId) {
                throw new NotFoundException('Ride or Driver not found');
            }
            const passengerWallet = await tx.wallet.findUnique({ where: { userId: ride.passengerId } });
            const driverWallet = await tx.wallet.findUnique({ where: { userId: ride.driverId } });
            if (!passengerWallet || !driverWallet) {
                throw new BadRequestException('Wallet not found for driver or passenger');
            }
            if (passengerWallet.balance < amountToRefund) {
                throw new BadRequestException('Passenger wallet has insufficient funds to cover exact change');
            }
            const updatedPassengerWallet = await tx.wallet.update({
                where: { id: passengerWallet.id },
                data: { balance: { decrement: amountToRefund } }
            });
            const updatedDriverWallet = await tx.wallet.update({
                where: { id: driverWallet.id },
                data: { balance: { increment: amountToRefund } }
            });
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
    async fundWalletInitiate(userId, email, amount) {
        if (amount < 100) {
            throw new BadRequestException('Minimum funding amount is ₦100');
        }
        const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
        if (!wallet)
            throw new NotFoundException('Wallet not found');
        const reference = `FUND_${wallet.id}_${Date.now()}`;
        const paystackInit = await this.paystackService.initializeTransaction(email, amount * 100, reference);
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
    async handleSuccessfulPayment(reference, amountPaid) {
        return await this.prisma.$transaction(async (tx) => {
            const pendingTx = await tx.transaction.findUnique({ where: { reference } });
            if (!pendingTx || pendingTx.status === 'COMPLETED') {
                return;
            }
            const amountNaira = amountPaid / 100;
            await tx.transaction.update({
                where: { id: pendingTx.id },
                data: { status: 'COMPLETED' }
            });
            await tx.wallet.update({
                where: { id: pendingTx.walletId },
                data: { balance: { increment: amountNaira } }
            });
            console.log(`[PAYSTACK WEBHOOK] Wallet funded successfully for Ref: ${reference}`);
        });
    }
};
WalletsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, typeof (_b = typeof PaystackService !== "undefined" && PaystackService) === "function" ? _b : Object])
], WalletsService);
export { WalletsService };
//# sourceMappingURL=wallets.service.js.map