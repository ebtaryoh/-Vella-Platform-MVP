import { Module } from '@nestjs/common';
import { AviationService } from './aviation.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AviationService],
  exports: [AviationService],
})
export class AviationModule {}
