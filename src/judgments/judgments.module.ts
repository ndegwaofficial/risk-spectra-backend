import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Judgment } from './entities/judgment.entity';
import { JudgmentsService } from './judgments.service';
import { JudgmentsController } from './judgments.controller';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Judgment]),
    UsersModule,
    AuthModule,
  ],
  providers: [JudgmentsService],
  controllers: [JudgmentsController],
  exports: [JudgmentsService],
})
export class JudgmentsModule {}