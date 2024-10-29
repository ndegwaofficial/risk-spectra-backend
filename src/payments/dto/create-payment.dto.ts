
import { IsNumber, IsEnum, IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsNumber()
  courtCaseId: number;

  @IsBoolean()
  isInstallment: boolean;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
    totalInstallments: any;
}
