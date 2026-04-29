import { PaymentMethod, OrderStatus } from '@prisma/client';

export class OrderItemChoiceOptionResponseDto {
  id!: string;
  choiceOptionId?: string | null;
  name!: string;
  price!: number;
}

export class OrderItemAddOnResponseDto {
  id!: string;
  addOnId?: string | null;
  name!: string;
  price!: number;
}

export class OrderItemResponseDto {
  id!: string;
  productId!: string;
  productName!: string;
  quantity!: number;
  unitPrice!: number;
  sizeName?: string;
  sizePrice!: number;
  lineTotal!: number;
  choiceOptions!: OrderItemChoiceOptionResponseDto[];
  addOns!: OrderItemAddOnResponseDto[];
}

export class CreateOrderResponseDto {
  id!: string;
  orderNumber!: string;
  vendorId!: string;
  totalAmount!: number;
  status!: string;
  createdAt!: Date;
}