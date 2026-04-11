import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProductRepository } from '../../domain/interfaces/product.interface';
import { Product } from '@prisma/client';
import { ProductResponseDto } from '../../presentation/dto/product.response.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createFullProduct(data: {
    vendorId: string;
    dto: any;
    images: string[];
  }): Promise<Product> {
    const { vendorId, dto, images } = data;

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          estimateCookTime: dto.estimateCookTime,
          vendorId,
          categoryId: dto.categoryId,
        },
      });

      if (images.length) {
        await tx.productImage.createMany({
          data: images.map((url, index) => ({
            productId: product.id,
            url,
            isPrimary: index === 0,
            position: index,
          })),
        });
      }

      if (dto.sizeOptions?.length) {
        await tx.sizeOption.createMany({
          data: dto.sizeOptions.map((s) => ({
            ...s,
            productId: product.id,
          })),
        });
      }

      if (dto.choiceOptions?.length) {
        await tx.choiceOption.createMany({
          data: dto.choiceOptions.map((c) => ({
            ...c,
            productId: product.id,
          })),
        });
      }

      if (dto.addOns?.length) {
        await tx.addOn.createMany({
          data: dto.addOns.map((a) => ({
            ...a,
            productId: product.id,
          })),
        });
      }

      return product;
    });
  }
  
  async findProductByVendorId(vendorId: string): Promise<ProductResponseDto[]> {

    const products = await this.prisma.product.findMany({
      where: { vendorId },
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      isActive: p.isActive,

      category: p.category
        ? { id: p.category.id, name: p.category.name }
        : undefined,
    }));
  }

  async searchProducts(params: {
    vendorId: string;
    search?: string;
    category?: string;
    isActive?: boolean;
    page: number;
    limit: number;
  }): Promise<any[]> {

    const { vendorId, search, category,  isActive,  page, limit,  } = params;

    return this.prisma.product.findMany({
      where: {
        vendorId,

        ...(isActive !== undefined && { isActive }),

        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive', 
          },
        }),

        ...(category && {
          category: {
            name: {
              equals: category,
              mode: 'insensitive',
            },
          },
        }),
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: 'desc',
      },

      skip: (page - 1) * limit,
      take: limit,
    });
  }

}