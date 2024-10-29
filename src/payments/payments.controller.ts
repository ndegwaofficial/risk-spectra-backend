import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<any> {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.paymentsService.findOne(+id);
  }

  @Get('case/:caseId')
  async findByCaseId(@Param('caseId') caseId: string): Promise<any> {
    return this.paymentsService.findByCaseId(+caseId);
  }

  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto
  ): Promise<any> {
    return this.paymentsService.updatePaymentStatus(+id, updatePaymentDto.status, updatePaymentDto);
  }

  @Post('installment-plan')
  async createInstallmentPlan(
    @Body() createInstallmentPlanDto: any
  ): Promise<any> {
    return this.paymentsService.createInstallmentPlan(
      createInstallmentPlanDto.caseId,
      createInstallmentPlanDto.totalAmount,
      createInstallmentPlanDto.numberOfInstallments,
      createInstallmentPlanDto.paymentType
    );
  }

  @Get('summary/:caseId')
  async getPaymentSummary(@Param('caseId') caseId: string): Promise<any> {
    return this.paymentsService.getPaymentSummary(+caseId);
  }
}