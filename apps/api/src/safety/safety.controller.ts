import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SafetyService } from './safety.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/safety')
export class SafetyController {
  constructor(private readonly safetyService: SafetyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('audio-upload')
  async registerAudioUpload(@Body() payload: { rideId: string; s3BucketKey: string; fileHash: string }) {
    return this.safetyService.registerAudioUpload(payload.rideId, payload.s3BucketKey, payload.fileHash);
  }
}
