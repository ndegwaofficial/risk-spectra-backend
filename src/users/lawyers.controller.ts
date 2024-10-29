
import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('lawyers')
@UseGuards(JwtAuthGuard)
export class LawyersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findLawyers();
  }

  @Put(':id/performance')
  async updatePerformance(
    @Param('id') id: string,
    @Body('outcome') outcome: 'won' | 'lost',
  ): Promise<User> {
    return this.usersService.updateLawyerPerformance(+id, outcome);
  }
}