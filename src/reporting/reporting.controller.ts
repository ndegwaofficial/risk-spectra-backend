// src/reporting/reporting.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportingService } from './reporting.service';

@Controller('reporting')
@UseGuards(JwtAuthGuard)
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('case-status')
  async getCaseStatusReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportingService.getCaseStatusReport(new Date(startDate), new Date(endDate));
  }

  @Get('financial-impact')
  async getFinancialImpactReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportingService.getFinancialImpactReport(new Date(startDate), new Date(endDate));
  }

  @Get('lawyer-performance')
  async getLawyerPerformanceReport() {
    return this.reportingService.getLawyerPerformanceReport();
  }

  @Get('case-timeline')
  async getCaseTimelineReport() {
    return this.reportingService.getCaseTimelineReport();
  }
}