import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import type { CreateOrderInput, IOrderRepository } from '../../domain/interface/order.repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderFromCart(input: CreateOrderInput): Promise<any> {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const order = await tx.order.create({
        data: {
          orderNumber: input.orderNumber,
          customerId: input.customerId,
          vendorId: input.vendorId,
          paymentMethod: input.paymentMethod,
          subtotal: input.subtotal,
          tax: input.tax,
          serviceFee: input.serviceFee,
          totalAmount: input.totalAmount,
          note: input.note,
          estimatedReadyAt: input.estimatedReadyAt,
        },
      });

      for (const cartItem of input.cart.items) {
        const sizePrice = cartItem.sizeOption?.price ?? 0;

        const addOnTotal = cartItem.addOns.reduce(
          (sum, entry) => sum + entry.addOn.price,
          0,
        );

        const lineTotal =
          (cartItem.price + sizePrice + addOnTotal) * cartItem.quantity;

        const orderItem = await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: cartItem.productId,
            productName: cartItem.product.name,
            quantity: cartItem.quantity,
            unitPrice: cartItem.price,
            sizeName: cartItem.sizeOption?.name ?? null,
            sizePrice,
            lineTotal,
          },
        });

        if (cartItem.choiceOptions.length) {
          await tx.orderItemChoiceOption.createMany({
            data: cartItem.choiceOptions.map((entry) => ({
              orderItemId: orderItem.id,
              choiceOptionId: entry.choiceOption.id,
              name: entry.choiceOption.name,
              price: entry.choiceOption.price,
            })),
          });
        }

        if (cartItem.addOns.length) {
          await tx.orderItemAddOn.createMany({
            data: cartItem.addOns.map((entry) => ({
              orderItemId: orderItem.id,
              addOnId: entry.addOn.id,
              name: entry.addOn.name,
              price: entry.addOn.price,
            })),
          });
        }
      }

      await tx.cartItem.deleteMany({
        where: { cartId: input.cart.id },
      });

      await tx.cart.update({
        where: { id: input.cart.id },
        data: { totalAmount: 0 },
      });

      return tx.order.findUnique({
        where: { id: order.id },
        include: {
          orderItems: {
            include: {
              orderItemChoiceOption: true,
              orderItemAddOn: true,
            },
          },
        },
      });
    });
  }
}