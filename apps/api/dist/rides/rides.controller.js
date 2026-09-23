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
var _a;
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RidesService } from './rides.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
let RidesController = class RidesController {
    ridesService;
    constructor(ridesService) {
        this.ridesService = ridesService;
    }
    async requestRide(req, payload) {
        return this.ridesService.requestRide(req.user.userId, payload);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    Post('request'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "requestRide", null);
RidesController = __decorate([
    Controller('api/v1/rides'),
    __metadata("design:paramtypes", [typeof (_a = typeof RidesService !== "undefined" && RidesService) === "function" ? _a : Object])
], RidesController);
export { RidesController };
//# sourceMappingURL=rides.controller.js.map