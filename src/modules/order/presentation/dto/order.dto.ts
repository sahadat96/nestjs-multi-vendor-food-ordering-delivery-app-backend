import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum VendorOrderHistoryStatusFilter {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class VendorOrderHistoryQueryDto {
  @IsOptional()
  @IsEnum(VendorOrderHistoryStatusFilter)
  status?: VendorOrderHistoryStatusFilter = VendorOrderHistoryStatusFilter.ALL;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}