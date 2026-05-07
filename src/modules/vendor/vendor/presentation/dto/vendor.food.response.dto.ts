import {
  OrderStatus 
} from '@prisma/client';


export class VendorPendingOrderCustomerDto {
  id!: string;
  name!: string;
  imageUrl?: string;
}

export class VendorPendingOrderItemDto {
  id!: string;
  productName!: string;
  quantity!: number;
  sizeName?: string;
  lineTotal!: number;
  displayText!: string;
}

export class VendorPendingOrderListItemDto {
  id!: string;
  orderNumber!: string;
  status!: OrderStatus;

  customer!: VendorPendingOrderCustomerDto;

  items!: VendorPendingOrderItemDto[];

  itemCount!: number;
  uniqueItemCount!: number;
  itemSummaryLabel!: string;

  subtotal!: number;
  totalAmount!: number;

  createdAt!: Date;
  timeLabel!: string;

  statusLabel!: string;
  actionLabel!: string;
}

export class VendorPendingOrdersResponseDto {
  total!: number;
  items!: VendorPendingOrderListItemDto[];
}