import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentType } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentsRepository.create(createPaymentDto);
    
    // If it's an installment payment, calculate installment details
    if (createPaymentDto.isInstallment) {
      if (!createPaymentDto.totalInstallments || createPaymentDto.totalInstallments < 1) {
        throw new BadRequestException('Invalid installment configuration');
      }
      
      const installmentAmount = createPaymentDto.amount / createPaymentDto.totalInstallments;
      payment.amount = installmentAmount;
      payment.installmentNumber = 1;
    }

    return this.paymentsRepository.save(payment);
  }

  async createInstallmentPlan(
    caseId: number,
    totalAmount: number,
    numberOfInstallments: number,
    paymentType: PaymentType
  ): Promise<Payment[]> {
    const installmentAmount = totalAmount / numberOfInstallments;
    const installments: Payment[] = [];

    for (let i = 1; i <= numberOfInstallments; i++) {
      const payment = this.paymentsRepository.create({
        courtCase: { id: caseId },
        amount: installmentAmount,
        type: paymentType,
        isInstallment: true,
        installmentNumber: i,
        totalInstallments: numberOfInstallments,
        dueDate: this.calculateDueDate(i),
      });
      installments.push(await this.paymentsRepository.save(payment));
    }

    return installments;
  }

  private calculateDueDate(installmentNumber: number): Date {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + installmentNumber);
    return dueDate;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({
      relations: ['courtCase'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['courtCase'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment #${id} not found`);
    }
    return payment;
  }

  async findByCaseId(caseId: number): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { courtCase: { id: caseId } },
      order: { createdAt: 'DESC' },
    });
  }

  async updatePaymentStatus(
    id: number,
    status: PaymentStatus,
    transactionDetails?: Record<string, any>
  ): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = status;
    if (transactionDetails) {
      payment.paymentDetails = {
        ...payment.paymentDetails,
        ...transactionDetails,
        lastUpdated: new Date(),
      };
    }
    return this.paymentsRepository.save(payment);
  }

  async getPaymentSummary(caseId: number): Promise<{
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    paymentsByType: Record<PaymentType, number>;
  }> {
    const payments = await this.findByCaseId(caseId);
    const summary = {
      totalAmount: 0,
      paidAmount: 0,
      pendingAmount: 0,
      paymentsByType: {} as Record<PaymentType, number>,
    };

    payments.forEach(payment => {
      summary.totalAmount += Number(payment.amount);
      if (payment.status === PaymentStatus.COMPLETED) {
        summary.paidAmount += Number(payment.amount);
      } else {
        summary.pendingAmount += Number(payment.amount);
      }

      summary.paymentsByType[payment.type] = 
        (summary.paymentsByType[payment.type] || 0) + Number(payment.amount);
    });

    return summary;
  }
}