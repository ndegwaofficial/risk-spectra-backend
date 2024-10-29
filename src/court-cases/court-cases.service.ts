// src/court-cases/court-cases.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtCase } from './entities/court-case.entity';
import { User } from '../users/entities/user.entity';
import { CreateCourtCaseDto } from './dto/create-court-case.dto';
import { UpdateCourtCaseDto } from './dto/update-court-case.dto';

@Injectable()
export class CourtCasesService {
  constructor(
    @InjectRepository(CourtCase)
    private courtCasesRepository: Repository<CourtCase>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createCourtCaseDto: CreateCourtCaseDto): Promise<CourtCase> {
    const courtCase = this.courtCasesRepository.create(createCourtCaseDto);
    
    if (createCourtCaseDto.assignedLawyerId) {
      const lawyer = await this.usersRepository.findOne({
        where: { id: createCourtCaseDto.assignedLawyerId }
      });
      if (!lawyer) {
        throw new NotFoundException('Lawyer not found');
      }
      courtCase.assignedLawyer = lawyer;
    }
    
    return this.courtCasesRepository.save(courtCase);
  }

  async findAll(): Promise<CourtCase[]> {
    return this.courtCasesRepository.find({
      relations: ['assignedLawyer', 'claimedAmounts', 'judgment', 'payments'],
    });
  }

  async findOne(id: number): Promise<CourtCase> {
    const courtCase = await this.courtCasesRepository.findOne({
      where: { id },
      relations: ['assignedLawyer', 'claimedAmounts', 'judgment', 'payments'],
    });
    
    if (!courtCase) {
      throw new NotFoundException(`Court case #${id} not found`);
    }
    
    return courtCase;
  }

  async update(id: number, updateCourtCaseDto: UpdateCourtCaseDto): Promise<CourtCase> {
    const courtCase = await this.findOne(id);
    
    if (updateCourtCaseDto.assignedLawyerId) {
      const lawyer = await this.usersRepository.findOne({
        where: { id: updateCourtCaseDto.assignedLawyerId }
      });
      if (!lawyer) {
        throw new NotFoundException('Lawyer not found');
      }
      courtCase.assignedLawyer = lawyer;
      delete updateCourtCaseDto.assignedLawyerId;
    }
    
    Object.assign(courtCase, updateCourtCaseDto);
    return this.courtCasesRepository.save(courtCase);
  }

  async remove(id: number): Promise<void> {
    const courtCase = await this.findOne(id);
    await this.courtCasesRepository.remove(courtCase);
  }

  async assignLawyer(caseId: number, lawyerId: number): Promise<CourtCase> {
    const courtCase = await this.findOne(caseId);
    const lawyer = await this.usersRepository.findOne({
      where: { id: lawyerId }
    });
    
    if (!lawyer) {
      throw new NotFoundException('Lawyer not found');
    }
    
    courtCase.assignedLawyer = lawyer;
    return this.courtCasesRepository.save(courtCase);
  }
}