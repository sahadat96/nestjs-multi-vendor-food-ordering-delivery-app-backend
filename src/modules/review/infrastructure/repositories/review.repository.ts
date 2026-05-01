import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, OrderStatus } from '@prisma/client';

import { VendorTruckReviewsQueryDto } from '../../presentation/dto/review.dto';

import type {
  CreateVendorTruckReviewInput,
  IVendorTruckReviewRepository,
} from '../../domain/interface/review.repository.interface';


@Injectable()
export class VendorTruckReviewRepository implements IVendorTruckReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async countVendorTruckReviews(vendorId: string): Promise<number> {
    return this.prisma.vendorTruckReview.count({
      where: {
        vendorId,
      },
    });
  }

  async findExistingReview(data: {
    vendorId: string;
    customerId: string;
  }): Promise<{ id: string } | null> {
    return this.prisma.vendorTruckReview.findUnique({
      where: {
        vendorId_customerId: {
          vendorId: data.vendorId,
          customerId: data.customerId,
        },
      },
      select: { id: true },
    });
  }

  async validateTags(
    tagIds: string[],
  ): Promise<{ id: string; name: string }[]> {
    if (!tagIds.length) {
      return [];
    }

    return this.prisma.vendorTruckReviewTag.findMany({
      where: {
        id: {
          in: tagIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async createReview(data: CreateVendorTruckReviewInput): Promise<any> {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const review = await tx.vendorTruckReview.create({
        data: {
          vendorId: data.vendorId,
          customerId: data.customerId,
          rating: data.rating,
          reviewText: data.reviewText,
        },
      });

      if (data.imageUrls?.length) {
        await tx.vendorTruckReviewImage.createMany({
          data: data.imageUrls.map((imageUrl, index) => ({
            reviewId: review.id,
            imageUrl,
            position: index,
          })),
        });
      }

      if (data.tagIds?.length) {
        await tx.vendorTruckReviewTagMap.createMany({
          data: data.tagIds.map((tagId) => ({
            reviewId: review.id,
            tagId,
          })),
        });
      }

      const aggregate = await tx.vendorTruckReview.aggregate({
        where: {
          vendorId: data.vendorId,
        },
        _avg: {
          rating: true,
        },
        _count: {
          id: true,
        },
      });

      await tx.vendor.update({
        where: {
          id: data.vendorId,
        },
        data: {
          truckReviewAverage: aggregate._avg.rating ?? 0,
          truckReviewCount: aggregate._count.id,
        },
      });

      return tx.vendorTruckReview.findUnique({
        where: {
          id: review.id,
        },
        include: {
          images: {
            orderBy: {
              position: 'asc',
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });
  }

  async findAllTags(): Promise<
    {
      id: string;
      name: string;
    }[]
  > {
    return this.prisma.vendorTruckReviewTag.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findVendorReviewSummary(vendorId: string): Promise<{
    id: string;
    truckReviewAverage: number;
    truckReviewCount: number;
  } | null> {
    return this.prisma.vendor.findUnique({
      where: { id: vendorId },
      select: {
        id: true,
        truckReviewAverage: true,
        truckReviewCount: true,
      },
    });
  }

  async findVendorTruckReviews(
    vendorId: string,
    query: VendorTruckReviewsQueryDto,
  ): Promise<any[]> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    return this.prisma.vendorTruckReview.findMany({
      where: {
        vendorId,
      },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        images: {
          orderBy: {
            position: 'asc',
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });
  }

}