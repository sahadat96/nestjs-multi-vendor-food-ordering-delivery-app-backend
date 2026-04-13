import { Module } from '@nestjs/common';
import { CustomerService } from './application/customer.service';
import { CustomerController } from './presentation/controllers/customer.controller';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
  ],
  exports: ['ICustomerRepository'],
})
export class CustomerModule {}