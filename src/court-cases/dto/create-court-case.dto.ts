import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateCourtCaseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  claimedAmount: number;

  @IsString()
  status: string;

  @IsDate()
  courtDate: Date;

  @IsOptional()
  @IsNumber()
  assignedLawyerId?: number;
}