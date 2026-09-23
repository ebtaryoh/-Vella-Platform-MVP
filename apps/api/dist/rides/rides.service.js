var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AviationService } from '../aviation/aviation.service';
let RidesService = class RidesService {
    prisma;
    aviation;
    constructor(prisma, aviation) {
        this.prisma = prisma;
        this.aviation = aviation;
    }
    calculateEstimatedFare(distanceKm, preferences) {
        const baseFare = 500;
        const perKmRate = 180;
        const baseFuelPricePerLiter = 1350;
        let estimatedFare = baseFare + (distanceKm * perKmRate);
        if (preferences?.acRequired) {
            const baseLitersUsed = distanceKm / 10;
            const extraAcLiters = baseLitersUsed * 0.15;
            const acPremium = extraAcLiters * baseFuelPricePerLiter;
            estimatedFare += acPremium;
        }
        return Math.round(estimatedFare);
    }
    async requestRide(passengerId, payload) {
        const { pickupLat, pickupLng, pickupAddress, dropoffLat, dropoffLng, dropoffAddress, preferences, flightNumber, isAirportConcierge, safeSisterActive } = payload;
        const distanceKm = 15;
        let fareEstimated = 0;
        if (isAirportConcierge) {
            fareEstimated = this.aviation.calculateAviationFare(distanceKm, 'LOS');
            if (flightNumber) {
                this.aviation.trackFlightStatus(flightNumber).catch(console.error);
            }
        }
        else {
            fareEstimated = this.calculateEstimatedFare(distanceKm, preferences);
        }
        if (safeSisterActive) {
            const passenger = await this.prisma.user.findUnique({ where: { id: passengerId } });
            if (passenger?.gender !== 'FEMALE') {
                throw new BadRequestException('Vella SafeSister is strictly reserved for female passengers.');
            }
            console.log(`[DISPATCH] STRICT MATCHING: Searching ONLY for FEMALE drivers near [${pickupLat}, ${pickupLng}]`);
        }
        const ride = await this.prisma.ride.create({
            data: {
                passengerId,
                pickupLat,
                pickupLng,
                pickupAddress,
                dropoffLat,
                dropoffLng,
                dropoffAddress,
                fareEstimated,
                preferencesJson: preferences || {},
                flightNumber: flightNumber || null,
                isAirportConcierge: isAirportConcierge || false,
                safeSisterActive: safeSisterActive || false,
                distanceKm,
            }
        });
        return {
            message: 'Ride requested successfully',
            rideId: ride.id,
            fareEstimated,
            acGuaranteed: preferences?.acRequired || false
        };
    }
};
RidesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, typeof (_b = typeof AviationService !== "undefined" && AviationService) === "function" ? _b : Object])
], RidesService);
export { RidesService };
//# sourceMappingURL=rides.service.js.map