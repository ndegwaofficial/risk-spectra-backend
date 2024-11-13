// src/reporting/reporting.module.ts
import { Module } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtCase } from '../court-cases/entities/court-case.entity';
import { Payment } from '../payments/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourtCase, Payment, User]),
    AuthModule
  ],
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}