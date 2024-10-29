import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaimedAmount } from './entities/claimed-amount.entity';

@Injectable()
export class ClaimedAmountsService {
  constructor(
    @InjectRepository(ClaimedAmount)
    private claimedAmountsRepository: Repository<ClaimedAmount>,
  ) {}

  async create(claimedAmount: Partial<ClaimedAmount>): Promise<ClaimedAmount> {
    const newClaimedAmount = this.claimedAmountsRepository.create(claimedAmount);
    return this.claimedAmountsRepository.save(newClaimedAmount);
  }

  async findByCaseId(caseId: number): Promise<ClaimedAmount[]> {
    return this.claimedAmountsRepository.find({
      where: { courtCase: { id: caseId } },
      order: { claimDate: 'DESC' },
    });
  }

  async update(id: number, claimedAmount: Partial<ClaimedAmount>): Promise<ClaimedAmount> {
    await this.claimedAmountsRepository.update(id, claimedAmount);
    return this.claimedAmountsRepository.findOne({ where: { id } });
  }
}