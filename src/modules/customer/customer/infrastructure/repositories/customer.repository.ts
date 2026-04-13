import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ICustomerRepository } from '../../domain/interface/customer.repository.interface';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<any | null> {
    return this.prisma.customer.findUnique({
      where: { userId },
    });
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