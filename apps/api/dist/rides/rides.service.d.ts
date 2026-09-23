import { PrismaService } from '../prisma/prisma.service';
import { AviationService } from '../aviation/aviation.service';
export declare class RidesService {
    private prisma;
    private aviation;
    constructor(prisma: PrismaService, aviation: AviationService);
    calculateEstimatedFare(distanceKm: number, preferences: any): number;
    requestRide(passengerId: string, payload: any): Promise<{
        message: string;
        rideId: any;
        fareEstimated: number;
        acGuaranteed: any;
    }>;
}
