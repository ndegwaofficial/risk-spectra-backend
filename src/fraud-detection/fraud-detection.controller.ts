import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from '../ai-service/ai-service.service';

@Controller('fraud-detection')
@UseGuards(JwtAuthGuard)
export class FraudDetectionController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async detectFraud(@Body() caseData: any) {
    return this.aiService.detectFraud(caseData);
  }
}