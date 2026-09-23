export declare class PaystackService {
    private readonly secretKey;
    initializeTransaction(email: string, amount: number, reference: string): Promise<{
        authorization_url: string;
        access_code: string;
        reference: string;
    }>;
    verifySignature(signature: string, payload: any): boolean;
}
