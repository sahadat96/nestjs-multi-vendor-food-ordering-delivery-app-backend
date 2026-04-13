import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SetCustomerLocationDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsString()
  address?: string;
}