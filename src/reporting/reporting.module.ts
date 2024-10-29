// src/reporting/reporting.module.ts
import { Module } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { PaymentsModule } from '../payments/payments.module';
import { UsersModule } from '../users/users.module';
import { CourtCasesModule } from '../court-cases/court-cases.module';

@Module({
  imports: [
    PaymentsModule,
    UsersModule,
    CourtCasesModule,
  ],
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}