// src/reporting/reporting.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportingService } from './reporting.service';

@Controller('reporting')
@UseGuards(JwtAuthGuard)
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('payment-summary/:caseId')
  async getPaymentSummary(@Param('caseId') caseId: string) {
    return this.reportingService.getPaymentSummary(+caseId);
  }

  @Get('lawyer-performance/:lawyerId')
  async getLawyerPerformance(@Param('lawyerId') lawyerId: string) {
    return this.reportingService.getLawyerPerformance(+lawyerId);
  }

  @Get('case-stats')
  async getAllCaseStats() {
    return this.reportingService.getAllCaseStats();
  }
}