import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import type {
  CustomerHomeProfile,
  IHomeRepository,
} from '../../domain/interface/home.repository.interface';

@Injectable()
export class HomeRepository implements IHomeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCustomerHomeProfileByUserId(
    userId: string,
  ): Promise<CustomerHomeProfile | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { userId },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        address: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true as any,
          },
        },
      },
    });

    if (!customer) {
      return null;
    }

    return {
      id: customer.id,
      latitude: customer.latitude,
      longitude: customer.longitude,
      address: customer.address,
      user: {
        id: customer.user.id,
        email: customer.user.email,
        name: (customer.user as any).name ?? 'Customer',
      },
    };
  }

  async findVendorCandidates(): Promise<any[]> {
    return this.prisma.vendor.findMany({
      where: {
        serviceArea: {
          isNot: null,
        },
      },
      include: {
        serviceArea: true,
        operationHours: true,
        cuisines: {
          include: {
            cuisine: true,
          },
        },
        products: {
          where: {
            isActive: true,
          },
          take: 3,
          include: {
            images: {
              orderBy: { position: 'asc' },
              take: 1,
            },
          },
        },
      },
    });
  }

  async findDistinctCategoryNames(limit: number): Promise<string[]> {
    const categories = await this.prisma.category.findMany({
      distinct: ['name'],
      select: {
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
      take: limit,
    });

    return categories.map((item) => item.name);
  }

  async findPopularCuisines(
    limit: number,
  ): Promise<{ id: string; name: string; imageUrl: string | null }[]> {
    const grouped = await this.prisma.vendorCuisine.groupBy({
      by: ['cuisineId'],
      _count: {
        cuisineId: true,
      },
      orderBy: {
        _count: {
          cuisineId: 'desc',
        },
      },
      take: limit,
    });

    const cuisineIds = grouped.map((item) => item.cuisineId);

    if (!cuisineIds.length) {
      return [];
    }

    const cuisines = await this.prisma.cuisine.findMany({
      where: {
        id: {
          in: cuisineIds,
        },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    });

    const cuisineMap = new Map(
      cuisines.map((cuisine) => [cuisine.id, cuisine]),
    );

    return grouped
      .map((item) => cuisineMap.get(item.cuisineId))
      .filter(
        (
          cuisine,
        ): cuisine is { id: string; name: string; imageUrl: string | null } =>
          cuisine !== undefined,
      );
  }

  async findProductsForHome(
    vendorIds: string[],
    limit: number,
    excludeProductIds: string[] = [],
  ): Promise<any[]> {
    if (!vendorIds.length) {
      return [];
    }

    return this.prisma.product.findMany({
      where: {
        vendorId: {
          in: vendorIds,
        },
        isActive: true,
        ...(excludeProductIds.length
          ? {
              id: {
                notIn: excludeProductIds,
              },
            }
          : {}),
      },
      include: {
        vendor: {
          include: {
            serviceArea: true,
          },
        },
        category: true,
        images: {
          orderBy: { position: 'asc' },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  async findProductsFallback(
    limit: number,
    excludeProductIds: string[] = [],
  ): Promise<any[]> {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        ...(excludeProductIds.length
          ? {
              id: {
                notIn: excludeProductIds,
              },
            }
          : {}),
      },
      include: {
        vendor: {
          include: {
            serviceArea: true,
          },
        },
        category: true,
        images: {
          orderBy: { position: 'asc' },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }
}