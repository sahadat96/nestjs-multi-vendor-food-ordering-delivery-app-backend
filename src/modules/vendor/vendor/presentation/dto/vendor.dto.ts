import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class VendorMenuQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class UploadTruckGalleryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  caption?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  position?: number;
}

export class VendorReviewsQueryDto {
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

import {
  KycStatus,
  SubscriptionStatus,
  VerificationStatus,
} from '@prisma/client';

export class VendorHomeProfileDto {
  id!: string;
  businessName!: string;
  coverImage?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export class VendorHomeVerificationDto {
  isLimitedMode!: boolean;
  kycStatus!: KycStatus;
  businessVerificationStatus?: VerificationStatus;
  subscriptionStatus!: SubscriptionStatus;
  onboardingStep!: number;
  actionRequired!: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
}

export class VendorHomeLiveStatusDto {
  canGoLive!: boolean;
  isLive!: boolean;
  disabledReason?: string;
}

export class VendorHomeStatsDto {
  todaySale!: number;
  ordersCompleted!: number;
  pendingOrders!: number;
  cancelledOrders!: number;
}

export class VendorHomeLocationDto {
  address?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export class VendorHomeResponseDto {
  vendor!: VendorHomeProfileDto;
  verification!: VendorHomeVerificationDto;
  liveStatus!: VendorHomeLiveStatusDto;
  stats!: VendorHomeStatsDto;
  currentLocation?: VendorHomeLocationDto;
  unreadNotificationCount!: number;
}