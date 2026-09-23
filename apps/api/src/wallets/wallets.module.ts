import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { PaystackService } from './paystack.service';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService, PaystackService]
})
export class WalletsModule {}
