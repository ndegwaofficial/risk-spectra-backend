import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClaimedAmountsService } from './claimed-amounts.service';
import { ClaimedAmount } from './entities/claimed-amount.entity';

@Controller('claimed-amounts')
@UseGuards(JwtAuthGuard)
export class ClaimedAmountsController {
  constructor(private readonly claimedAmountsService: ClaimedAmountsService) {}

  @Post()
  async create(@Body() claimedAmount: Partial<ClaimedAmount>): Promise<ClaimedAmount> {
    return this.claimedAmountsService.create(claimedAmount);
  }

  @Get('case/:caseId')
  async findByCaseId(@Param('caseId') caseId: string): Promise<ClaimedAmount[]> {
    return this.claimedAmountsService.findByCaseId(+caseId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() claimedAmount: Partial<ClaimedAmount>): Promise<ClaimedAmount> {
    return this.claimedAmountsService.update(+id, claimedAmount);
  }
}