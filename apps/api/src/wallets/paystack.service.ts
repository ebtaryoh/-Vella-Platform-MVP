import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PaystackService {
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY || 'sk_test_mock_secret_key';

  async initializeTransaction(email: string, amount: number, reference: string) {
    try {
      // In production, we would use native fetch() or axios to call Paystack's API
      // const response = await fetch('https://api.paystack.co/transaction/initialize', { ... });
      
      // Mocking the Paystack API response for now
      return {
        authorization_url: `https://checkout.paystack.com/${reference}`,
        access_code: `mock_access_code_${Date.now()}`,
        reference
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to initialize Paystack transaction');
    }
  }

  verifySignature(signature: string, payload: any): boolean {
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    return hash === signature;
  }
}
