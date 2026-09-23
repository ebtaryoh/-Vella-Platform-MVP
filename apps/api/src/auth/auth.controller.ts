import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/passenger')
  async registerPassenger(@Body() body: any) {
    // In a real pro-level app, use DTOs and class-validator here
    return this.authService.registerPassenger(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    return this.authService.login(body);
  }
}
