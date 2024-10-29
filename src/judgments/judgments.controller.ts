// src/judgments/judgments.controller.ts
import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JudgmentsService } from './judgments.service';
import { Judgment } from './entities/judgment.entity';

@Controller('judgments')
@UseGuards(JwtAuthGuard)
export class JudgmentsController {
  constructor(private readonly judgmentsService: JudgmentsService) {}

  @Post()
  async create(@Body() judgmentData: Partial<Judgment>): Promise<Judgment> {
    return this.judgmentsService.create(judgmentData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Judgment> {
    return this.judgmentsService.findOne(+id);
  }

  @Get('case/:caseId')
  async findByCaseId(@Param('caseId') caseId: string): Promise<Judgment> {
    return this.judgmentsService.findByCaseId(+caseId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() judgmentData: Partial<Judgment>
  ): Promise<Judgment> {
    return this.judgmentsService.update(+id, judgmentData);
  }

  @Post('calculate-liability/:caseId')
  async calculateLiability(
    @Param('caseId') caseId: string,
    @Body() factors: Record<string, any>
  ): Promise<{ liabilityAmount: number }> {
    const amount = await this.judgmentsService.calculateLiability(+caseId, factors);
    return { liabilityAmount: amount };
  }
}