// src/court-cases/court-cases.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtCase } from './entities/court-case.entity';
import { CourtCasesService } from './court-cases.service';
import { CourtCasesController } from './court-cases.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourtCase, User]),
    AuthModule,
    UsersModule,
],
  providers: [CourtCasesService],
  controllers: [CourtCasesController],
})
export class CourtCasesModule {}