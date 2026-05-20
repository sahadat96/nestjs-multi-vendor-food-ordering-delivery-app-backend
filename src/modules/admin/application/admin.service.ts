import { 
  Inject, 
  Injectable,
  NotFoundException,
 } from '@nestjs/common';

import { VerificationStatus } from '@prisma/client';

import type { 
  IAdminVendorVerificationRepository,
  RevenueSubscriptionRow,
  SalesOrderRow,
 } from '../domain/interface/admin.repository.interface';

import { 
  VendorVerificationListQueryDto,
  VendorVerificationSort,
  AdminVendorVerificationDocumentType,
  AdminDashboardOverviewQueryDto,
  AdminDashboardRevenueQueryDto,
  DashboardRevenueRange,
  DashboardRevenueMetric,
 } from '../presentation/dto/admin.dto';
import { 
  VendorVerificationManagementResponseDto,
  AdminVendorVerificationDetailResponseDto,
  AdminVendorVerificationFileResponseDto,
  AdminDashboardOverviewResponseDto,
  AdminDashboardRevenueResponseDto,
 } from '../presentation/dto/admin.response.dto';
import { AdminMapper } from '../infrastructure/mapper/admin.mapper';

export interface RevenueChartItem {
  label: string;
  value: number;
}

type DateBucket = {
  key: string;
  label: string;
  start: Date;
  end: Date;
};

@Injectable()
export class AdminVendorVerificationService {
  constructor(
    @Inject('IAdminVendorVerificationRepository')
    private readonly repository: IAdminVendorVerificationRepository,
    private readonly adminMapper: AdminMapper,
  ) {}

  async getManagementList(
    query: VendorVerificationListQueryDto,
  ): Promise<VendorVerificationManagementResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const status = query.status ?? VerificationStatus.PENDING;
    const sort = query.sort ?? VendorVerificationSort.NEWEST;

    const [stats, result] = await Promise.all([
      this.repository.getManagementStats(),
      this.repository.findManagementList({
        status,
        page,
        limit,
        sort,
      }),
    ]);

    return this.adminMapper.toManagementResponse({
      stats,
      result,
      page,
      limit,
    });
  }

  async getVerificationDetail(
    verificationId: string,
  ): Promise<AdminVendorVerificationDetailResponseDto> {
    const verification =
      await this.repository.findDetailById(verificationId);

    if (!verification) {
      throw new NotFoundException('Vendor verification not found');
    }

    return this.adminMapper.toDetailResponse(verification);
  }

  async getVerificationDocumentFile(
    verificationId: string,
    documentType: AdminVendorVerificationDocumentType,
  ): Promise<AdminVendorVerificationFileResponseDto> {
    const verification =
      await this.repository.findDocumentFileByVerificationId(verificationId);

    if (!verification) {
      throw new NotFoundException('Vendor verification not found');
    }

    return this.adminMapper.toFileResponse({
      verification,
      documentType,
    });
  }

  async getOverview(
    query: AdminDashboardOverviewQueryDto,
  ): Promise<AdminDashboardOverviewResponseDto> {
  
    void query;

    const overview = await this.repository.getOverview();

    return this.adminMapper.toOverviewResponse(overview);
  }

  async getRevenueChart(
    query: AdminDashboardRevenueQueryDto,
  ): Promise<AdminDashboardRevenueResponseDto> {
    const range = query.range ?? DashboardRevenueRange.YEAR;
    const metric = query.metric ?? DashboardRevenueMetric.REVENUE;

    const { startDate, buckets } = this.buildDateBuckets(range);

    if (metric === DashboardRevenueMetric.SALES) {
      const orders = await this.repository.findSalesRows(startDate);

      const items = this.calculateSalesChartItems({
        rows: orders,
        buckets,
      });

      const total = this.calculateTotal(items);

      return this.adminMapper.toRevenueResponse({
        range,
        metric,
        currency: 'USD',
        total,
        items,
      });
    }

    const subscriptions =
      await this.repository.findSubscriptionRevenueRows(startDate);

    const items = this.calculateSubscriptionRevenueChartItems({
      rows: subscriptions,
      buckets,
    });

    const total = this.calculateTotal(items);

    const currency = this.resolveSubscriptionCurrency(subscriptions);

    return this.adminMapper.toRevenueResponse({
      range,
      metric,
      currency,
      total,
      items,
    });
  }

  private calculateSubscriptionRevenueChartItems(data: {
    rows: RevenueSubscriptionRow[];
    buckets: DateBucket[];
  }): RevenueChartItem[] {
    const bucketMap = this.createEmptyBucketMap(data.buckets);

    for (const row of data.rows) {
      const bucket = this.findBucketForDate(row.createdAt, data.buckets);

      if (!bucket) {
        continue;
      }

      const amount = row.subscriptionPlan?.price ?? 0;

      bucketMap.set(bucket.key, (bucketMap.get(bucket.key) ?? 0) + amount);
    }

    return this.mapBucketsToChartItems(data.buckets, bucketMap);
  }

  private calculateSalesChartItems(data: {
    rows: SalesOrderRow[];
    buckets: DateBucket[];
  }): RevenueChartItem[] {
    const bucketMap = this.createEmptyBucketMap(data.buckets);

    for (const row of data.rows) {
      const bucket = this.findBucketForDate(row.createdAt, data.buckets);

      if (!bucket) {
        continue;
      }

      bucketMap.set(
        bucket.key,
        (bucketMap.get(bucket.key) ?? 0) + row.totalAmount,
      );
    }

    return this.mapBucketsToChartItems(data.buckets, bucketMap);
  }

  private createEmptyBucketMap(buckets: DateBucket[]): Map<string, number> {
    const bucketMap = new Map<string, number>();

    for (const bucket of buckets) {
      bucketMap.set(bucket.key, 0);
    }

    return bucketMap;
  }

  private findBucketForDate(
    date: Date,
    buckets: DateBucket[],
  ): DateBucket | undefined {
    return buckets.find((bucket) => date >= bucket.start && date <= bucket.end);
  }

  private mapBucketsToChartItems(
    buckets: DateBucket[],
    bucketMap: Map<string, number>,
  ): RevenueChartItem[] {
    return buckets.map((bucket) => ({
      label: bucket.label,
      value: Number((bucketMap.get(bucket.key) ?? 0).toFixed(2)),
    }));
  }

  private calculateTotal(items: RevenueChartItem[]): number {
    const total = items.reduce((sum, item) => sum + item.value, 0);

    return Number(total.toFixed(2));
  }

  private resolveSubscriptionCurrency(
    rows: RevenueSubscriptionRow[],
  ): string {
    return rows.find((row) => row.subscriptionPlan?.currency)?.subscriptionPlan
      ?.currency ?? 'USD';
  }

  private buildDateBuckets(range: DashboardRevenueRange): {
    startDate: Date;
    buckets: DateBucket[];
  } {
    const now = new Date();

    if (range === DashboardRevenueRange.WEEK) {
      return this.buildWeeklyBuckets(now);
    }

    if (range === DashboardRevenueRange.MONTH) {
      return this.buildMonthlyDailyBuckets(now);
    }

    return this.buildYearlyMonthlyBuckets(now);
  }

  private buildWeeklyBuckets(now: Date): {
    startDate: Date;
    buckets: DateBucket[];
  } {
    const buckets: DateBucket[] = [];

    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const start = new Date(startDate);
      start.setDate(startDate.getDate() + i);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setHours(23, 59, 59, 999);

      buckets.push({
        key: start.toISOString().slice(0, 10),
        label: new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
        }).format(start),
        start,
        end,
      });
    }

    return {
      startDate,
      buckets,
    };
  }

  private buildMonthlyDailyBuckets(now: Date): {
    startDate: Date;
    buckets: DateBucket[];
  } {
    const year = now.getFullYear();
    const month = now.getMonth();

    const startDate = new Date(year, month, 1);
    startDate.setHours(0, 0, 0, 0);

    const lastDay = new Date(year, month + 1, 0).getDate();

    const buckets: DateBucket[] = [];

    for (let day = 1; day <= lastDay; day++) {
      const start = new Date(year, month, day);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setHours(23, 59, 59, 999);

      buckets.push({
        key: start.toISOString().slice(0, 10),
        label: String(day),
        start,
        end,
      });
    }

    return {
      startDate,
      buckets,
    };
  }

  private buildYearlyMonthlyBuckets(now: Date): {
    startDate: Date;
    buckets: DateBucket[];
  } {
    const year = now.getFullYear();

    const startDate = new Date(year, 0, 1);
    startDate.setHours(0, 0, 0, 0);

    const buckets: DateBucket[] = [];

    for (let month = 0; month < 12; month++) {
      const start = new Date(year, month, 1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(year, month + 1, 0);
      end.setHours(23, 59, 59, 999);

      buckets.push({
        key: `${year}-${String(month + 1).padStart(2, '0')}`,
        label: new Intl.DateTimeFormat('en-US', {
          month: 'short',
        }).format(start),
        start,
        end,
      });
    }

    return {
      startDate,
      buckets,
    };
  }
}