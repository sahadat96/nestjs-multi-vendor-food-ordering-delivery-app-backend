import { SubscriptionStatus } from '@prisma/client';

export class InsightPeriodDto {
  month!: string;
  label!: string;
  startDate!: Date;
  endDate!: Date;
}

export class InsightTrendPointDto {
  day!: number;
  value!: number;
}

export class RevenueOverviewDto {
  total!: number;
  previousTotal!: number;
  changePercent!: number;
  trend!: InsightTrendPointDto[];
}

export class ProfileViewsOverviewDto {
  total!: number;
  previousTotal!: number;
  changePercent!: number;
  trend!: InsightTrendPointDto[];
}

export class RatingDistributionDto {
  1!: number;
  2!: number;
  3!: number;
  4!: number;
  5!: number;
}

export class RatingOverviewDto {
  average!: number;
  reviewCount!: number;
  distribution!: RatingDistributionDto;
}

export class FavoriteOverviewDto {
  count!: number;
}

export class SubscriptionOverviewDto {
  status!: SubscriptionStatus;
  planName?: string | null;
  expiresAt?: Date | null;
  isActive!: boolean;
  showUpgradeCard!: boolean;
  upgradeTitle!: string;
  upgradeDescription!: string;
}

export class VendorInsightsOverviewResponseDto {
  period!: InsightPeriodDto;
  revenue!: RevenueOverviewDto;
  profileViews!: ProfileViewsOverviewDto;
  rating!: RatingOverviewDto;
  favorites!: FavoriteOverviewDto;
  subscription!: SubscriptionOverviewDto;
}

export class RevenueChartPeriodDto {
  month!: string;
  label!: string;
  startDate!: Date;
  endDate!: Date;
}

export class RevenueChartPointDto {
  day!: number;
  date!: string;
  revenue!: number;
  orderCount!: number;
}

export class RevenueChartSummaryDto {
  totalRevenue!: number;
  previousRevenue!: number;
  changePercent!: number;

  completedOrderCount!: number;
  averageDailyRevenue!: number;

  bestDay!: {
    day: number;
    date: string;
    revenue: number;
    orderCount: number;
  } | null;
}

export class VendorRevenueChartResponseDto {
  period!: RevenueChartPeriodDto;
  summary!: RevenueChartSummaryDto;
  chart!: RevenueChartPointDto[];
}

export type TrafficLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export class PeakHoursPeriodDto {
  month!: string;
  label!: string;
  startDate!: Date;
  endDate!: Date;
}

export class PeakHourChartPointDto {
  hour!: number;              // 0 - 23
  label!: string;             // "1 PM"
  orderCount!: number;
  revenue!: number;
  trafficLevel!: TrafficLevel;
}

export class PeakHourSummaryDto {
  totalOrders!: number;
  totalRevenue!: number;

  peakHour!: {
    hour: number;
    label: string;
    orderCount: number;
    revenue: number;
    trafficLevel: TrafficLevel;
  } | null;

  bestTimeWindow!: {
    startHour: number;
    endHour: number;
    label: string;
    orderCount: number;
    revenue: number;
  } | null;
}

export class VendorPeakHoursResponseDto {
  period!: PeakHoursPeriodDto;
  summary!: PeakHourSummaryDto;
  chart!: PeakHourChartPointDto[];

  legend!: {
    low: string;
    medium: string;
    high: string;
  };
}