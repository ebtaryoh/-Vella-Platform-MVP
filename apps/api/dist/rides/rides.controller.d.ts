import { RidesService } from './rides.service';
export declare class RidesController {
    private readonly ridesService;
    constructor(ridesService: RidesService);
    requestRide(req: any, payload: any): Promise<any>;
}
