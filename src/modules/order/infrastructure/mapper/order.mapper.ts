import { 
  CreateOrderResponseDto,
  OrderSummaryResponseDto
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
}