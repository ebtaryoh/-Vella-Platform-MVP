import { Controller, Post, Body, UseGuards, Headers, Req, BadRequestException } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { PaystackService } from './paystack.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService, private readonly paystackService: PaystackService) {}

  @UseGuards(JwtAuthGuard)
  @Post('escrow/resolve')
  async resolveEscrow(@Body() payload: { rideId: string; amountToRefund: number }) {
    return this.walletsService.resolveEscrow(payload.rideId, payload.amountToRefund);
  }

  @UseGuards(JwtAuthGuard)
  @Post('fund')
  async fundWallet(@Req() req: any, @Body() payload: { amount: number }) {
    // Assuming req.user contains the decoded JWT with userId and email
    const { userId, email } = req.user;
    return this.walletsService.fundWalletInitiate(userId, email, payload.amount);
  }

  @Post('webhook/paystack')
  async paystackWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Body() payload: any
  ) {
    if (!signature) throw new BadRequestException('Missing signature');

    const isValid = this.paystackService.verifySignature(signature, payload);
    if (!isValid) throw new BadRequestException('Invalid signature');

    const event = payload.event;
    if (event === 'charge.success') {
      const { reference, amount } = payload.data;
      await this.walletsService.handleSuccessfulPayment(reference, amount);
    }

    return { status: 'ok' }; // Paystack requires a 200 OK immediately
  }
}
