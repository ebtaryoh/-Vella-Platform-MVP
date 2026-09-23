import { PrismaService } from '../prisma/prisma.service';
export declare class AviationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    trackFlightStatus(flightNumber: string): Promise<{
        status: string;
        estimatedArrival: Date;
    }>;
    calculateAviationFare(baseDistanceKm: number, airportCode: string): number;
}
