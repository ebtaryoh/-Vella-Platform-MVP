import { WalletsService } from './wallets.service';
import { PaystackService } from './paystack.service';
export declare class WalletsController {
    private readonly walletsService;
    private readonly paystackService;
    constructor(walletsService: WalletsService, paystackService: PaystackService);
    resolveEscrow(payload: {
        rideId: string;
        amountToRefund: number;
    }): Promise<any>;
    fundWallet(req: any, payload: {
        amount: number;
    }): Promise<any>;
    paystackWebhook(signature: string, payload: any): Promise<{
        status: string;
    }>;
}
