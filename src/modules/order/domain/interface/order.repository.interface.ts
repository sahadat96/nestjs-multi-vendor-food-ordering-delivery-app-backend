import { PaymentMethod, Prisma } from '@prisma/client';

export interface CreateOrderInput {
  customerId: string;
  vendorId: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  serviceFee: number;
  totalAmount: number;
  note?: string;
  estimatedReadyAt?: Date;
  orderNumber: string;
  cart: Prisma.CartGetPayload<{
    include: {
      items: {
        include: {
          product: true;
          sizeOption: true;
          choiceOptions: {
            include: {
              choiceOption: true;
            };
          };
          addOns: {
            include: {
              addOn: true;
            };
          };
        };
      };
    };
  }>;
}

export interface IOrderRepository {
  createOrderFromCart(input: CreateOrderInput): Promise<any>;
}