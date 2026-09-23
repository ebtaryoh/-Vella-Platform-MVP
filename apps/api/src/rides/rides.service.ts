import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AviationService } from '../aviation/aviation.service';

@Injectable()
export class RidesService {
  constructor(private prisma: PrismaService, private aviation: AviationService) {}

  // The Vella Economics Engine (Phase 1)
  calculateEstimatedFare(distanceKm: number, preferences: any) {
    const baseFare = 500;
    const perKmRate = 180;
    const baseFuelPricePerLiter = 1350; // Mock live fuel price from dynamic config
    
    let estimatedFare = baseFare + (distanceKm * perKmRate);

    // Feature 1: "AC Guaranteed"
    if (preferences?.acRequired) {
      // Calculate fuel premium: assume AC adds 15% to fuel consumption over the distance.
      // E.g. A car uses 1L per 10km. Distance is 20km = 2L. 15% of 2L = 0.3L extra fuel.
      const baseLitersUsed = distanceKm / 10; 
      const extraAcLiters = baseLitersUsed * 0.15;
      const acPremium = extraAcLiters * baseFuelPricePerLiter;
      
      estimatedFare += acPremium;
    }

    return Math.round(estimatedFare);
  }

  async requestRide(passengerId: string, payload: any) {
    const { pickupLat, pickupLng, pickupAddress, dropoffLat, dropoffLng, dropoffAddress, preferences, flightNumber, isAirportConcierge, safeSisterActive } = payload;
    
    // Mock Distance Calculation
    const distanceKm = 15; 
    
    let fareEstimated = 0;
    
    if (isAirportConcierge) {
      fareEstimated = this.aviation.calculateAviationFare(distanceKm, 'LOS');
      if (flightNumber) {
        // Asynchronously trigger flight tracking without blocking
        this.aviation.trackFlightStatus(flightNumber).catch(console.error);
      }
    } else {
      fareEstimated = this.calculateEstimatedFare(distanceKm, preferences);
    }

    // SafeSister Strict Matching Rule
    if (safeSisterActive) {
      const passenger = await this.prisma.user.findUnique({ where: { id: passengerId } });
      if (passenger?.gender !== 'FEMALE') {
        throw new BadRequestException('Vella SafeSister is strictly reserved for female passengers.');
      }
      // In a real dispatch engine, we would pass a strict strictGenderFilter: 'FEMALE' to the Geo-Spatial matching query.
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
}
