import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}