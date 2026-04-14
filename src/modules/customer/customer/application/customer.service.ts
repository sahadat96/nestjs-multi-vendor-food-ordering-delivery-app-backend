import {
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import type { ICustomerRepository } from '../domain/interface/customer.repository.interface';
import  { SetCustomerLocationDto } from '../presentation/dto/customer.dto';
import { CustomerResponseDto } from '../presentation/dto/customer.response.dto';
import { CustomerEntity } from '../domain/entities/customer.entity';
import { CustomerMapper } from '../infrastructure/mapper/customer.mapper';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repo: ICustomerRepository,
  ) {}

  async findActiveByUserId(userId: string): Promise<CustomerEntity | null> {
    return this.repo.findByUserId(userId);
  }

  async setLocation(
    userId: string,
    dto: SetCustomerLocationDto,
  ): Promise<CustomerResponseDto> {
    const customer = await this.repo.findByUserId(userId);

    let finalCustomer: CustomerEntity;

    if (!customer) {
      finalCustomer = await this.repo.create({
        userId,
        latitude: dto.latitude,
        longitude: dto.longitude,
        address: dto.address,
      });
    } else {
      finalCustomer = await this.repo.updateLocation(userId, dto);
    }

    return CustomerMapper.toResponse(finalCustomer);
  }
}