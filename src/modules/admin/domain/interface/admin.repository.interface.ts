import { 
  VerificationStatus,
  KycStatus,
  SubscriptionStatus ,
 } from '@prisma/client';

import { 
  VendorVerificationSort,
  DashboardRevenueMetric,
  DashboardRevenueRange,
  AdminVendorAccountSort,
 } from '../../presentation/dto/admin.dto';

export interface FindVendorVerificationsInput {
  status?: VerificationStatus;
  page: number;
  limit: number;
  sort: VendorVerificationSort;
}

export interface VendorVerificationListResult {
  total: number;
  items: any[];
}

export interface VendorVerificationStatsResult {
  totalPending: number;
  rejectedVerifications: number;
  avgReviewTimeDays: number;
  rejectionRate: number;
}

export interface AdminDashboardOverviewRaw {
  totalVendors: number;
  totalCustomers: number;
  activeTrucksToday: number;

  platformRevenue: number;
  todayRevenue: number;
  currency: string;

  issuesNeedAttention: number;
  pendingOnboarding: number;
  inactiveVendors: number;

  vendorsByStatus: {
    pending: number;
    verified: number;
    expired: number;
    suspended: number;
    rejected: number;
    total: number;
  };
}

export interface AdminDashboardRevenueInput {
  range: DashboardRevenueRange;
  metric: DashboardRevenueMetric;
}

export interface AdminDashboardRevenueRaw {
  range: DashboardRevenueRange;
  metric: DashboardRevenueMetric;
  currency: string;
  total: number;
  items: AdminDashboardRevenueRawItem[];
}

export interface AdminDashboardRevenueRawItem {
  label: string;
  value: number;
}

export interface RevenueSubscriptionRow {
  createdAt: Date;
  subscriptionPlan: {
    price: number;
    currency: string;
  } | null;
}

export interface SalesOrderRow {
  createdAt: Date;
  totalAmount: number;
}

export interface FindAdminVendorAccountsInput {
  search?: string;
  status?: KycStatus;
  subscriptionStatus?: SubscriptionStatus;
  sort: AdminVendorAccountSort;
  page: number;
  limit: number;
}

export interface AdminVendorAccountListResult {
  total: number;
  items: any[];
}

export interface AdminVendorAccountStatsResult {
  totalVendors: number;
  verifiedVendors: number;
  newThisMonth: number;
  suspendedVendors: number;
}

export interface IAdminVendorVerificationRepository {
  findManagementList(
    input: FindVendorVerificationsInput,
  ): Promise<VendorVerificationListResult>;

  getManagementStats(): Promise<VendorVerificationStatsResult>;

  findDetailById(verificationId: string): Promise<any | null>;
  
  findDocumentFileByVerificationId(
    verificationId: string,
  ): Promise<any | null>;

  getOverview(): Promise<AdminDashboardOverviewRaw>;

  findSubscriptionRevenueRows(startDate: Date): Promise<RevenueSubscriptionRow[]>;

  findSalesRows(startDate: Date): Promise<SalesOrderRow[]>;

  findVerificationForDecision(
    verificationId: string,
  ): Promise<any | null>;

  approveVerification(
    verificationId: string,
  ): Promise<any>;

  findVendorAccounts(
    input: FindAdminVendorAccountsInput,
  ): Promise<AdminVendorAccountListResult>;

  getVendorAccountStats(): Promise<AdminVendorAccountStatsResult>;
}