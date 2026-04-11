import { ProductResponseDto } from "../../presentation/dto/product.response.dto";

export class ProductMapper {
  static toResponse(p: any): ProductResponseDto {
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      isActive: p.isActive,
      category: p.category
        ? { id: p.category.id, name: p.category.name }
        : undefined,
    };
  }
}