var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
let PaystackService = class PaystackService {
    secretKey = process.env.PAYSTACK_SECRET_KEY || 'sk_test_mock_secret_key';
    async initializeTransaction(email, amount, reference) {
        try {
            return {
                authorization_url: `https://checkout.paystack.com/${reference}`,
                access_code: `mock_access_code_${Date.now()}`,
                reference
            };
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to initialize Paystack transaction');
        }
    }
    verifySignature(signature, payload) {
        const hash = crypto
            .createHmac('sha512', this.secretKey)
            .update(JSON.stringify(payload))
            .digest('hex');
        return hash === signature;
    }
};
PaystackService = __decorate([
    Injectable()
], PaystackService);
export { PaystackService };
//# sourceMappingURL=paystack.service.js.map