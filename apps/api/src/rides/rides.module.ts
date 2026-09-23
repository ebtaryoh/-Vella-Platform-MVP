import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { AviationModule } from '../aviation/aviation.module';

@Module({
  imports: [AviationModule],
  controllers: [RidesController],
  providers: [RidesService]
})
export class RidesModule {}
