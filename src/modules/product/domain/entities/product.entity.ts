export class Product {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  estimateCookTime!: number;
  isActive!: boolean;
  vendorId!: string;
  categoryId!: string | null;
  createdAt!: Date;
  category?: { id: string; name: string } | null;
}

export class ProductCart {
  id!: string;
  name!: string;
  price!: number;
  isActive!: boolean;
  vendorId!: string;

  sizeOptions!: {
    id: string;
    name: string;
    price: number;
    isRequired: boolean;
  }[];

  choiceOptions!: {
    id: string;
    name: string;
    price: number;
    isRequired: boolean;
  }[];

  addOns!: {
    id: string;
    name: string;
    price: number;
    isRequired: boolean;
  }[];
}
