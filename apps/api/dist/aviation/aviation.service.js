"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AviationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AviationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AviationService = AviationService_1 = class AviationService {
    prisma;
    logger = new common_1.Logger(AviationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async trackFlightStatus(flightNumber) {
        this.logger.log(`[Aviation API Mock] Tracking flight ${flightNumber}...`);
        const estimatedArrival = new Date();
        estimatedArrival.setHours(estimatedArrival.getHours() + 2);
        return {
            status: 'ON_TIME',
            estimatedArrival
        };
    }
    calculateAviationFare(baseDistanceKm, airportCode) {
        const baseFare = baseDistanceKm * 300;
        const mma2Toll = 1000;
        const meetAndGreetFee = 2500;
        return baseFare + mma2Toll + meetAndGreetFee;
    }
};
exports.AviationService = AviationService;
exports.AviationService = AviationService = AviationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AviationService);
//# sourceMappingURL=aviation.service.js.map