import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Judgment } from './entities/judgment.entity';
import { JudgmentsService } from './judgments.service';
import { JudgmentsController } from './judgments.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Judgment]),
    UsersModule,
  ],
  providers: [JudgmentsService],
  controllers: [JudgmentsController],
  exports: [JudgmentsService],
})
export class JudgmentsModule {}