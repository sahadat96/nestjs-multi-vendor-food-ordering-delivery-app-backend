import { CreateVendorTruckReviewResponseDto } from '../../presentation/dto/review.response.dto';

export class VendorTruckReviewMapper {

  static toCreateResponse(review: any): CreateVendorTruckReviewResponseDto {
    return {
      id: review.id,
      vendorId: review.vendorId,
      customerId: review.customerId,
      rating: review.rating,
      reviewText: review.reviewText ?? undefined,
      images: review.images.map((image: any) => ({
        id: image.id,
        imageUrl: image.imageUrl,
        position: image.position,
      })),
      tags: review.tags.map((entry: any) => ({
        id: entry.tag.id,
        name: entry.tag.name,
      })),
      createdAt: review.createdAt,
    };
  }
}