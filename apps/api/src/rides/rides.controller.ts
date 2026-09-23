import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RidesService } from './rides.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming this exists based on Phase 1 summary

@Controller('api/v1/rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('request')
  async requestRide(@Req() req, @Body() payload: any) {
    // req.user is populated by JwtAuthGuard
    return this.ridesService.requestRide(req.user.userId, payload);
  }
}
