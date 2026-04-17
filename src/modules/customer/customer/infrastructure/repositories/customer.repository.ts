import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ICustomerRepository } from '../../domain/interface/customer.repository.interface';
import { CustomerEntity } from '../../domain/entities/customer.entity';
import { NearbyVendorsQueryDto } from '../../presentation/dto/customer.dto';
import { Prisma, } from '@prisma/client';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<CustomerEntity | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { userId },
    });

    if (!customer) return null;

    return {
      id: customer.id,
      userId: customer.userId,
      phoneNumber: customer.phoneNumber ?? undefined,
      dateOfBirth: customer.dateOfBirth ?? undefined,
      address: customer.address ?? undefined,
      latitude: customer.latitude ?? undefined,
      longitude: customer.longitude ?? undefined,
      avatar: customer.avatar ?? undefined,
      isActive: customer.isActive,
      preferredRadius: customer.preferredRadius ?? undefined,
    };
  }

  async create(data: {
    userId: string;
    latitude: number;
    longitude: number;
    address?: string;
  }): Promise<any> {
    return this.prisma.customer.create({
      data,
    });
  }

  async updateLocation(
    userId: string,
    data: {
      latitude: number;
      longitude: number;
      address?: string;
    },
  ): Promise<any> {
    return this.prisma.customer.update({
      where: { userId },
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
      },
    });
  }

 async findNearbyVendorCandidates(
    query: NearbyVendorsQueryDto,
  ): Promise<any[]> {
    const search = query.search?.trim();
    const category = query.category?.trim();

    const where: Prisma.VendorWhereInput = {
      serviceArea: {
        isNot: null,
      },
    };

    const andConditions: Prisma.VendorWhereInput[] = [];

    if (search) {
      andConditions.push({
        OR: [
          {
            businessName: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            cuisines: {
              some: {
                cuisine: {
                  name: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
          },
          {
            products: {
              some: {
                isActive: true,
                name: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            },
          },
        ],
      });
    }

    if (category) {
      andConditions.push({
        OR: [
          {
            categories: {
              some: {
                name: {
                  contains: category,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            },
          },
          {
            products: {
              some: {
                isActive: true,
                category: {
                  name: {
                    contains: category,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            },
          },
        ],
      });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    return this.prisma.vendor.findMany({
      where,
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
          take: 1,
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

}