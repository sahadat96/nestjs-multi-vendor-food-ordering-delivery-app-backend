import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ICustomerRepository } from '../../domain/interface/customer.repository.interface';
import { CustomerEntity } from '../../domain/entities/customer.entity';

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
}