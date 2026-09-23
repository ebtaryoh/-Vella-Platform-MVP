import { PrismaService } from '../prisma/prisma.service';
import { PaystackService } from './paystack.service';
export declare class WalletsService {
    private prisma;
    private paystackService;
    constructor(prisma: PrismaService, paystackService: PaystackService);
    resolveEscrow(rideId: string, amountToRefund: number): Promise<any>;
    fundWalletInitiate(userId: string, email: string, amount: number): Promise<{
        authorization_url: string;
        access_code: string;
        reference: string;
    }>;
    handleSuccessfulPayment(reference: string, amountPaid: number): Promise<any>;
}
