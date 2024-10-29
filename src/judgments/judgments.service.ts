import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Judgment } from './entities/judgment.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class JudgmentsService {
  constructor(
    @InjectRepository(Judgment)
    private judgmentsRepository: Repository<Judgment>,
    private usersService: UsersService,
  ) {}

  async create(judgmentData: Partial<Judgment>): Promise<Judgment> {
    const judgment = this.judgmentsRepository.create(judgmentData);
    const savedJudgment = await this.judgmentsRepository.save(judgment);

    // Update lawyer performance if outcome is final
    if (judgment.outcome === 'won' || judgment.outcome === 'lost') {
      const courtCase = judgment.courtCase;
      await this.usersService.updateLawyerPerformance(
        courtCase.assignedLawyer.id,
        judgment.outcome === 'won' ? 'won' : 'lost'
      );
    }

    return savedJudgment;
  }

  async findOne(id: number): Promise<Judgment> {
    const judgment = await this.judgmentsRepository.findOne({
      where: { id },
      relations: ['courtCase', 'courtCase.assignedLawyer'],
    });
    if (!judgment) {
      throw new NotFoundException(`Judgment #${id} not found`);
    }
    return judgment;
  }

  async findByCaseId(caseId: number): Promise<Judgment> {
    return this.judgmentsRepository.findOne({
      where: { courtCase: { id: caseId } },
      relations: ['courtCase'],
    });
  }

  async update(id: number, judgmentData: Partial<Judgment>): Promise<Judgment> {
    const judgment = await this.findOne(id);
    Object.assign(judgment, judgmentData);
    return this.judgmentsRepository.save(judgment);
  }

  async calculateLiability(caseId: number, factors: Record<string, any>): Promise<number> {
    // Implement your liability calculation logic here
    // This is a simplified example
    const baseAmount = factors.claimedAmount || 0;
    const faultPercentage = factors.faultPercentage || 100;
    const mitigatingFactors = factors.mitigatingFactors || 1;
    
    return (baseAmount * (faultPercentage / 100)) * mitigatingFactors;
  }
}