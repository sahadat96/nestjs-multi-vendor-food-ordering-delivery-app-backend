export type VendorInsightPlan =
  | 'FREE'
  | 'TRIAL'
  | 'STARTER'
  | 'PRO'
  | 'ELITE';

export class VendorInsightAccessDto {
  plan!: VendorInsightPlan;

  canViewRevenue!: boolean;
  canViewPeakHours!: boolean;
  canViewOrderDistribution!: boolean;
  canViewCustomerEngagement!: boolean;
  canViewTopDishes!: boolean;
  canViewTopCustomers!: boolean;
  canViewTopSpots!: boolean;
  canViewProfileViews!: boolean;
  canViewRatings!: boolean;
  canViewFavorites!: boolean;
  canViewAiGuidance!: boolean;
  canViewEvents!: boolean;

  upgradeRequired!: boolean;
  upgradePlan?: 'PRO' | 'ELITE';
  lockedMessage?: string;
}

export class VendorLockedInsightSectionDto {
  key!: string;
  title!: string;
  requiredPlan!: 'PRO' | 'ELITE';
  message!: string;
}

export class VendorInsightMetricDto {
  label!: string;
  value!: number | string;
  changePercent?: number;
  changeLabel?: string;
}

export class VendorRevenuePointDto {
  label!: string;
  value!: number;
}

export class VendorPeakHourPointDto {
  time!: string;
  orderCount!: number;
  trafficLevel!: 'LOW' | 'MEDIUM' | 'HIGH';
}

export class VendorOrderDistributionDto {
  totalOrders!: number;
  completedOrders!: number;
  cancelledOrders!: number;
  pendingOrders!: number;
  itemsSold!: number;
  completedPercent!: number;
  cancelledPercent!: number;
}

export class VendorCustomerEngagementDto {
  totalCustomers!: number;
  newCustomers!: number;
  repeatCustomers!: number;
  repeatRate!: number;
}

export class VendorTopDishDto {
  productId!: string;
  name!: string;
  orderCount!: number;
  quantitySold!: number;
  revenue!: number;
}

export class VendorTopCustomerDto {
  customerId!: string;
  name!: string;
  orderCount!: number;
  totalSpent!: number;
}

export class VendorTopSpotDto {
  id!: string;
  name!: string;
  orderCount!: number;
  revenue!: number;
}

export class VendorRatingSummaryDto {
  rating!: number;
  reviewCount!: number;
}

export class VendorInsightsOverviewResponseDto {
  access!: VendorInsightAccessDto;

  range!: 'today' | 'week' | 'month' | 'year';
  startDate!: Date;
  endDate!: Date;

  emptyState!: boolean;

  revenueSummary?: VendorInsightMetricDto;
  revenueChart?: VendorRevenuePointDto[];

  peakHours?: VendorPeakHourPointDto[];

  profileViews?: VendorInsightMetricDto;
  averageRating?: VendorRatingSummaryDto;
  favorites?: VendorInsightMetricDto;

  orderDistribution?: VendorOrderDistributionDto;
  customerEngagement?: VendorCustomerEngagementDto;

  topDishes?: VendorTopDishDto[];
  topCustomers?: VendorTopCustomerDto[];
  topSpots?: VendorTopSpotDto[];

  lockedSections!: VendorLockedInsightSectionDto[];
}