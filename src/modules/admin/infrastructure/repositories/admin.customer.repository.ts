import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { 
  Customer,
 } from '@prisma/client';

import type {
 IAdminCustomerRepository
} from '../../domain/interface/admin.customer.repository.interface';

import { 
  VendorVerificationSort,
 } from '../../presentation/dto/admin.dto';

@Injectable()
export class AdminCustomerRepository
  implements IAdminCustomerRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    where: any;
    page: number;
    limit: number;
    orderBy: any;
  }): Promise<{ data: Customer[]; total: number }> {

    const { where, page, limit, orderBy } = params;

    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
      }),
      this.prisma.customer.count({ where }),
    ]);

    return { data, total };
  }
}