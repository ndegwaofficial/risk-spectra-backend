// src/court-cases/court-cases.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtCase } from './entities/court-case.entity';
import { CourtCasesService } from './court-cases.service';
import { CourtCasesController } from './court-cases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourtCase])],
  providers: [CourtCasesService],
  controllers: [CourtCasesController],
})
export class CourtCasesModule {}