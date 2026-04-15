import { Module } from '@nestjs/common';

import { OrderController } from './presentation/controllers/order.controller';
import { OrderService } from './application/order.service';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { CustomerModule } from '../customer/customer/customer.module';
import { CartModule } from '../customer/cart/cart.module';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [
    CustomerModule, 
    CartModule, 
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}