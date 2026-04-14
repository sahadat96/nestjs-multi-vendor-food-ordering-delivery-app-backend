export interface CreateCartItemInput {
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  sizeOptionId?: string;
  note?: string;
  choiceOptionIds?: string[];
  addOnIds?: string[];
}

export interface CartOwnerView {
  id: string;
  customerId: string;
}

export interface ICartRepository {
  findOrCreateCartByCustomerId(
    customerId: string,
  ): Promise<CartOwnerView>;

  findCartByCustomerId(customerId: string): Promise<any | null>;

  createCartItem(input: CreateCartItemInput): Promise<void>;

  recalculateCartTotal(cartId: string): Promise<void>;
}