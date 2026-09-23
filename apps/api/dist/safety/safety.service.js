var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
let SafetyService = class SafetyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerAudioUpload(rideId, s3BucketKey, fileHash) {
        try {
            const recording = await this.prisma.audioRecording.create({
                data: {
                    rideId,
                    s3BucketKey,
                    encryptedHash: fileHash,
                }
            });
            return {
                message: 'SecureAudio uploaded and logged successfully',
                recordingId: recording.id,
            };
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to register audio upload');
        }
    }
};
SafetyService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], SafetyService);
export { SafetyService };
//# sourceMappingURL=safety.service.js.map