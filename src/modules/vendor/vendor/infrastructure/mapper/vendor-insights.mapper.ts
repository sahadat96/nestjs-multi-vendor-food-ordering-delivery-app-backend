// src/modules/vendor/infrastructure/mapper/vendor-insights.mapper.ts

import { Injectable } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import {
  VendorInsightsOverviewResponseDto,
} from '../../presentation/dto/vendor-insights.response.dto';
import type {
  VendorInsightsDateRange,
} from '../../domain/interface/vendor.repository.interface';

@Injectable()
export class VendorInsightsMapper {

}