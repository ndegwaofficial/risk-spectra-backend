// src/court-cases/court-cases.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtCase } from './entities/court-case.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CourtCasesService {
  constructor(
    @InjectRepository(CourtCase)
    private courtCasesRepository: Repository<CourtCase>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async assignLawyer(caseId: number, lawyerID: number): Promise<CourtCase>{
    const courtCase = await this.courtCasesRepository.findOne({ where: { id: caseId } });
    const lawyer = await this.usersRepository.findOne({ where: { id: lawyerID } });

    if (!courtCase || !lawyer) {
      throw new Error('Court case or lawyer not found');
    }

    courtCase.assignedLawyer = lawyer;
    return this.courtCasesRepository.save(courtCase);
  }
}