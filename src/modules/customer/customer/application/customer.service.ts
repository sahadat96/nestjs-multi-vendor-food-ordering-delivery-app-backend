import {
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import type { ICustomerRepository } from '../domain/interface/customer.repository.interface';
import  { SetCustomerLocationDto } from '../presentation/dto/customer.dto';
import { CustomerResponseDto } from '../presentation/dto/customer.response.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repo: ICustomerRepository,
  ) {}

  async setLocation(
    userId: string,
    dto: SetCustomerLocationDto,
  ): Promise<CustomerResponseDto> {
    let customer = await this.repo.findByUserId(userId);

    if (!customer) {
      customer = await this.repo.create({
        userId,
        latitude: dto.latitude,
        longitude: dto.longitude,
        address: dto.address,
      });
    } else {
      customer = await this.repo.updateLocation(userId, dto);
    }

    return {
      id: customer.id,
      latitude: customer.latitude,
      longitude: customer.longitude,
      address: customer.address,
    };
  }
}