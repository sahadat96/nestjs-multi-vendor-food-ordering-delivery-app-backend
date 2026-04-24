export class CartItemResponseDto {
  id!: string;
  productId!: string;
  productName!: string;
  productImage?: string;
  vendorId!: string;
  vendorName!: string;

  quantity!: number;
  unitBasePrice!: number;
  sizePrice!: number;
  addOnTotal!: number;
  lineTotal!: number;

  note?: string;

  sizeOption?: {
    id: string;
    name: string;
    price: number;
  };

  choiceOptions!: {
    id: string;
    name: string;
    price: number;
  }[];

  addOns!: {
    id: string;
    name: string;
    price: number;
  }[];
}

export class CartResponseDto {
  id!: string;
  customerId!: string;
  vendorId!: string;
  vendorName!: string;
  totalAmount!: number;
  items!: CartItemResponseDto[];
  itemCount!: number;
  updatedAt!: Date;
}

export class CartListItemDto {
  id!: string;
  productId!: string;
  productName!: string;
  productImage?: string;
  quantity!: number;
}

export class CartListVendorDto {
  id!: string;
  businessName!: string;
  coverImage?: string;
  address?: string;
}

export class CartListItemResponseDto {
  cartId!: string;
  vendor!: CartListVendorDto;
  items!: CartListItemDto[];
  totalAmount!: number;
  itemCount!: number;
  updatedAt!: Date;
}

export class CartListResponseDto {
  carts!: CartListItemResponseDto[];
}