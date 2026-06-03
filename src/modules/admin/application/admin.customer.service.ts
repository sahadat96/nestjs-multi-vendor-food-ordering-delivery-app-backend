import { 
  Inject, 
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
 } from '@nestjs/common';

import {
  VerificationStatus,
  OrderStatus,
  VendorAdminStatus,
} from '@prisma/client';

import type { 
  IAdminCustomerRepository,
 } from '../domain/interface/admin.customer.repository.interface';

import {
  GetCustomersQueryDto,
 } from '../presentation/dto/admin.dto';
import { 
  PaginatedCustomerResponseDto
 } from '../presentation/dto/admin.response.dto';
import { AdminMapper } from '../infrastructure/mapper/admin.mapper';

import { VendorService } from '@/modules/vendor/vendor/application/vendor.service';


@Injectable()
export class AdminCustomerService {
  constructor(
    @Inject('IAdminVendorVerificationRepository')
    private readonly adminCustomerRepository: IAdminCustomerRepository,
    private readonly adminMapper: AdminMapper,
    private readonly vendorService: VendorService,
  ) {}

  async getCustomers(
    query: GetCustomersQueryDto,
  ): Promise<PaginatedCustomerResponseDto> {

    const { search, status, page = 1, limit = 10, sortBy } = query;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { id: { contains: search } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const orderBy = {
      createdAt: sortBy === 'oldest' ? 'asc' : 'desc',
    };

    const { data, total } = await this.adminCustomerRepository.findAll({
      where,
      page,
      limit,
      orderBy,
    });

    const customers = data.map((c) =>
      this.adminMapper.toCustomerListResponse(c),
    );

    return {
      data: customers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}


