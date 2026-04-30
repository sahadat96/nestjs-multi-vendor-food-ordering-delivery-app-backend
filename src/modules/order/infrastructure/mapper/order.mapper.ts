import { OrderStatus } from '@prisma/client';

import { 
  CreateOrderResponseDto,
  OrderSummaryResponseDto,
  OrderTrackResponseDto,
  OrderTrackStepDto,
} from '../../presentation/dto/order.response.dto';

export class OrderMapper {

  static toCreateResponse(order: any): CreateOrderResponseDto {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      vendorId: order.vendorId,
      status: order.status,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      tax: order.tax,
      serviceFee: order.serviceFee,
      totalAmount: order.totalAmount,
      estimatedReadyAt: order.estimatedReadyAt ?? null,
      createdAt: order.createdAt,
      orderItems: order.orderItems.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        sizeName: item.sizeName ?? undefined,
        sizePrice: item.sizePrice,
        lineTotal: item.lineTotal,
        choiceOptions: item.orderItemChoiceOption.map((choice: any) => ({
          id: choice.id,
          choiceOptionId: choice.choiceOptionId,
          name: choice.name,
          price: choice.price,
        })),
        addOns: item.orderItemAddOn.map((addon: any) => ({
          id: addon.id,
          addOnId: addon.addOnId,
          name: addon.name,
          price: addon.price,
        })),
      })),
    };
  }

  static toUserOrserSummaryResponse(order: any): OrderSummaryResponseDto {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentMethod: order.paymentMethod,
      estimatedReadyAt: order.estimatedReadyAt ?? null,

      vendor: {
        id: order.vendor.id,
        businessName: order.vendor.businessName ?? 'Unnamed Vendor',
        contactNumber: order.vendor.contactNumber ?? undefined,
        address: order.vendor.serviceArea?.address ?? undefined,
        latitude: order.vendor.serviceArea?.latitude ?? undefined,
        longitude: order.vendor.serviceArea?.longitude ?? undefined,
      },

      items: order.orderItems.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        sizeName: item.sizeName ?? undefined,
        sizePrice: item.sizePrice,
        lineTotal: item.lineTotal,

        choiceOptions: item.orderItemChoiceOption.map((choice: any) => ({
          id: choice.id,
          name: choice.name,
          price: choice.price,
        })),

        addOns: item.orderItemAddOn.map((addon: any) => ({
          id: addon.id,
          name: addon.name,
          price: addon.price,
        })),
      })),

      subtotal: order.subtotal,
      tax: order.tax,
      serviceFee: order.serviceFee,
      totalAmount: order.totalAmount,
      note: order.note ?? undefined,
      createdAt: order.createdAt,
    };
  }

static toTrackResponse(order: any): OrderTrackResponseDto {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,

      placedAt: order.createdAt,
      estimatedReadyAt: order.estimatedReadyAt ?? null,

      vendor: {
        id: order.vendor.id,
        businessName: order.vendor.businessName ?? 'Unnamed Vendor',
        contactNumber: order.vendor.contactNumber ?? undefined,
        address: order.vendor.serviceArea?.address ?? undefined,
        latitude: order.vendor.serviceArea?.latitude ?? undefined,
        longitude: order.vendor.serviceArea?.longitude ?? undefined,
      },

      timeline: OrderMapper.buildTrackTimeline(order),

      canCancel: OrderMapper.canCancelOrder(order.status),

      totalAmount: order.totalAmount,
    };
  }

  private static buildTrackTimeline(order: any): OrderTrackStepDto[] {
    const status = order.status as OrderStatus;

    const isCancelled = status === OrderStatus.CANCELLED;

    const orderConfirmedDone =
      status === OrderStatus.PENDING ||
      status === OrderStatus.CONFIRMED ||
      status === OrderStatus.PREPARING ||
      status === OrderStatus.READY_FOR_PICKUP ||
      status === OrderStatus.COMPLETED ||
      status === OrderStatus.CANCELLED;

    const preparingDone =
      status === OrderStatus.PREPARING ||
      status === OrderStatus.READY_FOR_PICKUP ||
      status === OrderStatus.COMPLETED;

    const readyDone =
      status === OrderStatus.READY_FOR_PICKUP ||
      status === OrderStatus.COMPLETED;

    const completedDone = status === OrderStatus.COMPLETED;

    const timeline: OrderTrackStepDto[] = [
      {
        status: 'ORDER_CONFIRMED',
        title: 'Order Confirmed',
        description: isCancelled
          ? 'Your order was received before cancellation.'
          : 'Your order has been received.',
        isCompleted: orderConfirmedDone,
        isCurrent:
          status === OrderStatus.PENDING ||
          status === OrderStatus.CONFIRMED,
        timestamp: order.confirmedAt ?? order.createdAt,
        estimatedTime: null,
      },
      {
        status: 'PREPARING',
        title: 'Preparing your food',
        description: 'Chef is preparing your food.',
        isCompleted: preparingDone,
        isCurrent: status === OrderStatus.PREPARING,
        timestamp: order.preparingAt ?? null,
        estimatedTime: order.estimatedReadyAt ?? null,
      },
      {
        status: 'READY_FOR_PICKUP',
        title: 'Ready for Pickup',
        description: 'Your food is ready to pickup.',
        isCompleted: readyDone,
        isCurrent: status === OrderStatus.READY_FOR_PICKUP,
        timestamp: order.readyAt ?? null,
        estimatedTime: order.estimatedReadyAt ?? null,
      },
      {
        status: 'COMPLETED',
        title: 'Completed',
        description: 'Enjoy your meal!',
        isCompleted: completedDone,
        isCurrent: status === OrderStatus.COMPLETED,
        timestamp: order.completedAt ?? null,
        estimatedTime: null,
      },
    ];

    if (isCancelled) {
      timeline.push({
        status: 'CANCELLED',
        title: 'Cancelled',
        description: 'This order was cancelled.',
        isCompleted: true,
        isCurrent: true,
        timestamp: order.cancelledAt ?? null,
        estimatedTime: null,
      });
    }

    return timeline;
  }

  private static canCancelOrder(status: OrderStatus): boolean {
    return (
      status === OrderStatus.PENDING ||
      status === OrderStatus.CONFIRMED
    );
  }
}