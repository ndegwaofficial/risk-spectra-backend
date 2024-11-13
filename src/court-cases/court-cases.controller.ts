// src/court-cases/court-cases.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CourtCasesService } from './court-cases.service';
import { CourtCase } from './entities/court-case.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { CreateCourtCaseDto } from './dto/create-court-case.dto';

@Controller('court-cases')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourtCasesController {
  constructor(private readonly courtCasesService: CourtCasesService) {}

  @Post()
  @Roles(UserRole.LAWYER, UserRole.ADMIN)
  create(@Body() createCourtCaseDto: CreateCourtCaseDto) {
    return this.courtCasesService.create(createCourtCaseDto);
  }

  @Get()
  @Roles(UserRole.LAWYER, UserRole.ADMIN)
  findAll() {
    return this.courtCasesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.LAWYER, UserRole.ADMIN, UserRole.CLIENT)
  findOne(@Param('id') id: string) {
    return this.courtCasesService.findOne(+id);
  }

  // @Get()
  // async findAll(): Promise<CourtCase[]> {
  //   return this.courtCasesService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<CourtCase> {
  //   return this.courtCasesService.findOne(+id);
  // }

  // @Post()
  // async create(@Body() courtCase: Partial<CourtCase>): Promise<CourtCase> {
  //   return this.courtCasesService.create(courtCase);
  // }

  @Put(':id')
  @Roles(UserRole.LAWYER, UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() courtCase: Partial<CourtCase>): Promise<CourtCase> {
    return this.courtCasesService.update(+id, courtCase);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    return this.courtCasesService.remove(+id);
  }

  @Post(':id/assign-lawyer')
  @Roles(UserRole.ADMIN)
  async assignLawyer(
    @Param('id') id: string,
     @Body() lawyerId: number
    ): Promise<CourtCase> {
    return this.courtCasesService.assignLawyer(+id, lawyerId);
}

@Get('flagged')
@Roles(UserRole.ADMIN)
async getFlaggedCases() {
  return this.courtCasesService.getFlaggedCases();
}

@Post(':id/review')
@Roles(UserRole.ADMIN)
async reviewCase(@Param('id') id: string, @Body('approved') approved: boolean) {
  return this.courtCasesService.reviewCase(+id, approved);
}
}