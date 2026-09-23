import { PrismaService } from '../prisma/prisma.service';
import { PaystackService } from './paystack.service';
export declare class WalletsService {
    private prisma;
    private paystackService;
    constructor(prisma: PrismaService, paystackService: PaystackService);
    resolveEscrow(rideId: string, amountToRefund: number): Promise<any>;
    fundWalletInitiate(userId: string, email: string, amount: number): Promise<any>;
    handleSuccessfulPayment(reference: string, amountPaid: number): Promise<any>;
}
