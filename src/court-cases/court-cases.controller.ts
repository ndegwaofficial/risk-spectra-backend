// src/court-cases/court-cases.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CourtCasesService } from './court-cases.service';
import { CourtCase } from './entities/court-case.entity';

@Controller('court-cases')
@UseGuards(JwtAuthGuard)
export class CourtCasesController {
  constructor(private readonly courtCasesService: CourtCasesService) {}

  @Get()
  async findAll(): Promise<CourtCase[]> {
    return this.courtCasesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourtCase> {
    return this.courtCasesService.findOne(+id);
  }

  @Post()
  async create(@Body() courtCase: Partial<CourtCase>): Promise<CourtCase> {
    return this.courtCasesService.create(courtCase);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() courtCase: Partial<CourtCase>): Promise<CourtCase> {
    return this.courtCasesService.update(+id, courtCase);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.courtCasesService.remove(+id);
  }

  @Post(':id/assign-lawyer')
  async assignLawyer(
    @Param('id') id: string,
     @Body() lawyerId: number
    ): Promise<CourtCase> {
    return this.courtCasesService.assignLawyer(+id, lawyerId);
}
}