// src/reporting/reporting.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentsService } from '../payments/payments.service';
import { UsersService } from '../users/users.service';
import { CourtCasesService } from '../court-cases/court-cases.service';

@Injectable()
export class ReportingService {
  constructor(
    private paymentsService: PaymentsService,
    private usersService: UsersService,
    private courtCasesService: CourtCasesService,
  ) {}

  async getPaymentSummary(caseId: number) {
    return this.paymentsService.getPaymentSummary(caseId);
  }

  async getLawyerPerformance(lawyerId: number) {
    const lawyer = await this.usersService.findOneById(lawyerId);
    if (!lawyer) {
        throw new NotFoundException(`Lawyer #${lawyerId} not found`);
      }
    return {
      casesWon: lawyer.casesWon,
      casesLost: lawyer.casesLost,
      winLossRecord: lawyer.winLossRecord,
    };
  }

  async getAllCaseStats() {
    const cases = await this.courtCasesService.findAll();
    return {
      totalCases: cases.length,
      pendingCases: cases.filter(c => c.status === 'pending').length,
      completedCases: cases.filter(c => c.status === 'completed').length,
    };
  }
}