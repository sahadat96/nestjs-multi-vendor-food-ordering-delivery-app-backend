import { Product } from '@prisma/client';
import { ProductResponseDto } from '../../presentation/dto/product.response.dto';
import { Prisma } from '@prisma/client';

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export interface SearchProductsParams {
  vendorId: string;
  search?: string;
  category?: string;
  isActive?: boolean;
  page: number;
  limit: number;
}

export interface PaginatedProducts {
  data: ProductWithCategory[];
  total: number;
  page: number;
  limit: number;
}

export interface IProductRepository {

  createFullProduct(data: {
    vendorId: string;
    dto: any;
    images: string[];
  }): Promise<Product>;

  findProductByVendorId(vendorId: string): Promise<ProductResponseDto[]>;

  searchProducts(
    params: SearchProductsParams,
  ): Promise<PaginatedProducts[]>;

}