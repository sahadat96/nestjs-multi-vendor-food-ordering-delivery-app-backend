// src/modules/vendor/infrastructure/mapper/vendor-insights.mapper.ts

import { Injectable } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import {
  VendorInsightsOverviewResponseDto,
  VendorRevenueChartResponseDto,
} from '../../presentation/dto/vendor-insights.response.dto';
import type {
  VendorInsightsDateRange,
  VendorInsightsOverviewRaw,
  VendorRevenueChartRaw,
  VendorRevenueDateRange,
} from '../../domain/interface/vendor.repository.interface';

@Injectable()
export class VendorInsightsMapper {
  toOverviewResponse(data: {
    raw: VendorInsightsOverviewRaw;
    range: VendorInsightsDateRange;
    month: string;
  }): VendorInsightsOverviewResponseDto {
    const daysInMonth = this.getDaysInMonth(data.range.startDate);

    const revenueTrend = this.buildDailyMoneyTrend(
      data.raw.revenueOrders,
      daysInMonth,
    );

    const profileViewsTrend = this.buildDailyCountTrend(
      data.raw.profileViews,
      daysInMonth,
    );

    const revenueTotal = data.raw.revenueOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    const profileViewTotal = data.raw.profileViews.length;

    return {
      period: {
        month: data.month,
        label: this.getMonthLabel(data.range.startDate),
        startDate: data.range.startDate,
        endDate: data.range.endDate,
      },

      revenue: {
        total: this.roundMoney(revenueTotal),
        previousTotal: this.roundMoney(data.raw.previousRevenueTotal),
        changePercent: this.calculateChangePercent(
          revenueTotal,
          data.raw.previousRevenueTotal,
        ),
        trend: revenueTrend,
      },

      profileViews: {
        total: profileViewTotal,
        previousTotal: data.raw.previousProfileViewTotal,
        changePercent: this.calculateChangePercent(
          profileViewTotal,
          data.raw.previousProfileViewTotal,
        ),
        trend: profileViewsTrend,
      },

      rating: {
        average: Number(data.raw.vendor.truckReviewAverage.toFixed(1)),
        reviewCount: data.raw.vendor.truckReviewCount,
        distribution: this.buildRatingDistribution(
          data.raw.ratingDistribution,
        ),
      },

      favorites: {
        count: data.raw.favoriteCount,
      },

      subscription: {
        status: data.raw.vendor.subscriptionStatus,
        planName: data.raw.vendor.subscriptionPlan?.name ?? null,
        expiresAt: data.raw.vendor.subscriptionExpiry ?? null,
        isActive:
          data.raw.vendor.subscriptionStatus === SubscriptionStatus.ACTIVE,
        showUpgradeCard:
          data.raw.vendor.subscriptionStatus !== SubscriptionStatus.ACTIVE,
        upgradeTitle: 'Ready to grow?',
        upgradeDescription:
          'Upgrade to see full performance insights about order distribution, customer engagement, top content, and more.',
      },
    };
  }

  private buildDailyMoneyTrend(
    orders: { createdAt: Date; totalAmount: number }[],
    daysInMonth: number,
  ) {
    const map = new Map<number, number>();

    for (let day = 1; day <= daysInMonth; day++) {
      map.set(day, 0);
    }

    for (const order of orders) {
      const day = new Date(order.createdAt).getDate();
      map.set(day, (map.get(day) ?? 0) + order.totalAmount);
    }

    return Array.from(map.entries()).map(([day, value]) => ({
      day,
      value: this.roundMoney(value),
    }));
  }

  private buildDailyCountTrend(
    views: { viewedAt: Date }[],
    daysInMonth: number,
  ) {
    const map = new Map<number, number>();

    for (let day = 1; day <= daysInMonth; day++) {
      map.set(day, 0);
    }

    for (const view of views) {
      const day = new Date(view.viewedAt).getDate();
      map.set(day, (map.get(day) ?? 0) + 1);
    }

    return Array.from(map.entries()).map(([day, value]) => ({
      day,
      value,
    }));
  }

  private buildRatingDistribution(
    rows: { rating: number; count: number }[],
  ) {
    const distribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (const row of rows) {
      if (row.rating >= 1 && row.rating <= 5) {
        distribution[row.rating as 1 | 2 | 3 | 4 | 5] = row.count;
      }
    }

    return distribution;
  }

  private calculateChangePercent(
    current: number,
    previous: number,
  ): number {
    if (previous === 0 && current === 0) {
      return 0;
    }

    if (previous === 0) {
      return 100;
    }

    return Number((((current - previous) / previous) * 100).toFixed(1));
  }

  private getDaysInMonth(date: Date): number {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      0,
    ).getUTCDate();
  }

  private getMonthLabel(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  private roundMoney(value: number): number {
    return Number(value.toFixed(2));
  }

  toRevenueChartResponse(data: {
    raw: VendorRevenueChartRaw;
    range: VendorRevenueDateRange;
    month: string;
  }): VendorRevenueChartResponseDto {
    const daysInMonth = this.getDaysInMonth(data.range.startDate);

    const chart = this.buildRevenueChartPoints(
      data.raw.currentOrders,
      data.range.startDate,
      daysInMonth,
    );

    const totalRevenue = chart.reduce(
      (sum, point) => sum + point.revenue,
      0,
    );

    const bestDay = this.findBestRevenueDay(chart);

    return {
      period: {
        month: data.month,
        label: this.getMonthLabel(data.range.startDate),
        startDate: data.range.startDate,
        endDate: data.range.endDate,
      },

      summary: {
        totalRevenue: this.roundMoney(totalRevenue),
        previousRevenue: this.roundMoney(data.raw.previousRevenueTotal),
        changePercent: this.calculateChangePercent(
          totalRevenue,
          data.raw.previousRevenueTotal,
        ),

        completedOrderCount: data.raw.completedOrderCount,

        averageDailyRevenue: this.roundMoney(
          totalRevenue / daysInMonth,
        ),

        bestDay,
      },

      chart,
    };
  }

  private buildRevenueChartPoints(
    orders: { createdAt: Date; totalAmount: number }[],
    monthStartDate: Date,
    daysInMonth: number,
  ) {
    const map = new Map<
      number,
      {
        revenue: number;
        orderCount: number;
      }
    >();

    for (let day = 1; day <= daysInMonth; day++) {
      map.set(day, {
        revenue: 0,
        orderCount: 0,
      });
    }

    for (const order of orders) {
      const day = new Date(order.createdAt).getUTCDate();

      const current = map.get(day) ?? {
        revenue: 0,
        orderCount: 0,
      };

      current.revenue += order.totalAmount;
      current.orderCount += 1;

      map.set(day, current);
    }

    return Array.from(map.entries()).map(([day, value]) => {
      const date = new Date(
        Date.UTC(
          monthStartDate.getUTCFullYear(),
          monthStartDate.getUTCMonth(),
          day,
        ),
      );

      return {
        day,
        date: date.toISOString().slice(0, 10),
        revenue: this.roundMoney(value.revenue),
        orderCount: value.orderCount,
      };
    });
  }

  private findBestRevenueDay(
    chart: {
      day: number;
      date: string;
      revenue: number;
      orderCount: number;
    }[],
  ): {
    day: number;
    date: string;
    revenue: number;
    orderCount: number;
  } | null {
    const daysWithRevenue = chart.filter((point) => point.revenue > 0);

    if (!daysWithRevenue.length) {
      return null;
    }

    return daysWithRevenue.reduce((best, current) =>
      current.revenue > best.revenue ? current : best,
    );
  }
}