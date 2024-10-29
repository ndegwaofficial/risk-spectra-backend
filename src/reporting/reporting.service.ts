// src/reporting/reporting.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CourtCase } from '../court-cases/entities/court-case.entity';
import { Payment } from '../payments/entities/payment.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(CourtCase)
    private courtCaseRepository: Repository<CourtCase>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getCaseStatusReport(startDate: Date, endDate: Date) {
    const cases = await this.courtCaseRepository.find({
      where: { createdAt: Between(startDate, endDate) },
    });

    const statusCounts = cases.reduce((acc, courtCase) => {
      acc[courtCase.status] = (acc[courtCase.status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalCases: cases.length,
      statusBreakdown: statusCounts,
    };
  }

  async getFinancialImpactReport(startDate: Date, endDate: Date) {
    const payments = await this.paymentRepository.find({
      where: { createdAt: Between(startDate, endDate) },
      relations: ['courtCase'],
    });

    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const paymentsByType = payments.reduce((acc, payment) => {
      acc[payment.type] = (acc[payment.type] || 0) + payment.amount;
      return acc;
    }, {});

    return {
      totalAmount,
      paymentsByType,
      averagePayment: totalAmount / payments.length || 0,
    };
  }

  async getLawyerPerformanceReport() {
    const lawyers = await this.userRepository.find({
      where: { role: 'lawyer' },
      relations: ['assignedCases'],
    });

    return lawyers.map(lawyer => ({
      id: lawyer.id,
      name: `${lawyer.firstName} ${lawyer.lastName}`,
      casesWon: lawyer.casesWon,
      casesLost: lawyer.casesLost,
      winRate: lawyer.casesWon / (lawyer.casesWon + lawyer.casesLost) || 0,
      activeCases: lawyer.assignedCases.filter(c => c.status !== 'closed').length,
    }));
  }

  async getCaseTimelineReport() {
    const cases = await this.courtCaseRepository.find({
      relations: ['payments', 'judgment'],
    });

    return cases.map(courtCase => ({
      id: courtCase.id,
      title: courtCase.title,
      createdAt: courtCase.createdAt,
      closedAt: courtCase.status === 'closed' ? courtCase.updatedAt : null,
      duration: courtCase.status === 'closed' 
        ? this.daysBetween(courtCase.createdAt, courtCase.updatedAt)
        : null,
      payments: courtCase.payments.map(p => ({
        amount: p.amount,
        date: p.createdAt,
      })),
      judgmentDate: courtCase.judgment?.judgmentDate,
    }));
  }

  private daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  }
}