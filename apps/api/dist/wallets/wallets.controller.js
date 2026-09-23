var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
import { Controller, Post, Body, UseGuards, Headers, Req, BadRequestException } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { PaystackService } from './paystack.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
let WalletsController = class WalletsController {
    walletsService;
    paystackService;
    constructor(walletsService, paystackService) {
        this.walletsService = walletsService;
        this.paystackService = paystackService;
    }
    async resolveEscrow(payload) {
        return this.walletsService.resolveEscrow(payload.rideId, payload.amountToRefund);
    }
    async fundWallet(req, payload) {
        const { userId, email } = req.user;
        return this.walletsService.fundWalletInitiate(userId, email, payload.amount);
    }
    async paystackWebhook(signature, payload) {
        if (!signature)
            throw new BadRequestException('Missing signature');
        const isValid = this.paystackService.verifySignature(signature, payload);
        if (!isValid)
            throw new BadRequestException('Invalid signature');
        const event = payload.event;
        if (event === 'charge.success') {
            const { reference, amount } = payload.data;
            await this.walletsService.handleSuccessfulPayment(reference, amount);
        }
        return { status: 'ok' };
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    Post('escrow/resolve'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "resolveEscrow", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post('fund'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "fundWallet", null);
__decorate([
    Post('webhook/paystack'),
    __param(0, Headers('x-paystack-signature')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WalletsController.prototype, "paystackWebhook", null);
WalletsController = __decorate([
    Controller('api/v1/wallets'),
    __metadata("design:paramtypes", [typeof (_a = typeof WalletsService !== "undefined" && WalletsService) === "function" ? _a : Object, typeof (_b = typeof PaystackService !== "undefined" && PaystackService) === "function" ? _b : Object])
], WalletsController);
export { WalletsController };
//# sourceMappingURL=wallets.controller.js.map