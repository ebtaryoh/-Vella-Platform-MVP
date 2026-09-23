import { RidesService } from './rides.service';
export declare class RidesController {
    private readonly ridesService;
    constructor(ridesService: RidesService);
    requestRide(req: any, payload: any): Promise<{
        message: string;
        rideId: any;
        fareEstimated: number;
        acGuaranteed: any;
    }>;
}
