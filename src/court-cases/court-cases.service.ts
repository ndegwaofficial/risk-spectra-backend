// src/court-cases/court-cases.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtCase } from './entities/court-case.entity';

@Injectable()
export class CourtCasesService {
  constructor(
    @InjectRepository(CourtCase)
    private courtCasesRepository: Repository<CourtCase>,
  ) {}

  async findAll(): Promise<CourtCase[]> {
    return this.courtCasesRepository.find();
  }

  async findOne(id: number): Promise<CourtCase> {
    return this.courtCasesRepository.findOne({ where: { id } });
  }

  async create(courtCase: Partial<CourtCase>): Promise<CourtCase> {
    const newCase = this.courtCasesRepository.create(courtCase);
    return this.courtCasesRepository.save(newCase);
  }

  async update(id: number, courtCase: Partial<CourtCase>): Promise<CourtCase> {
    await this.courtCasesRepository.update(id, courtCase);
    return this.courtCasesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.courtCasesRepository.delete(id);
  }
}