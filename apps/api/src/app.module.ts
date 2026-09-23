import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RidesModule } from './rides/rides.module.js';
import { SafetyModule } from './safety/safety.module.js';

@Module({
  imports: [RidesModule, SafetyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
