export class CartItemResponseDto {
  id!: string;

  productId!: string;
  name!: string;

  quantity!: number;
  price!: number;

  sizeOption?: {
    id: string;
    name: string;
  };

  choiceOptions?: {
    id: string;
    name: string;
  }[];

  addOns?: {
    id: string;
    name: string;
  }[];
}

export class CartResponseDto {
  id!: string;
  customerId!: string;

  items!: CartItemResponseDto[];

  totalAmount!: number;
}