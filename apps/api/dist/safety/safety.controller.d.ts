import { SafetyService } from './safety.service';
export declare class SafetyController {
    private readonly safetyService;
    constructor(safetyService: SafetyService);
    registerAudioUpload(payload: {
        rideId: string;
        s3BucketKey: string;
        fileHash: string;
    }): Promise<any>;
}
