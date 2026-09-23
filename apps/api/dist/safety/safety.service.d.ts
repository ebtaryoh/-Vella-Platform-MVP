import { PrismaService } from '../prisma/prisma.service';
export declare class SafetyService {
    private prisma;
    constructor(prisma: PrismaService);
    registerAudioUpload(rideId: string, s3BucketKey: string, fileHash: string): Promise<{
        message: string;
        recordingId: any;
    }>;
}
