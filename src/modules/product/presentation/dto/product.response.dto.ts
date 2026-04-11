export class ProductResponseDto {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  isActive!: boolean;

  category?: {
    id: string;
    name: string;
  };
}