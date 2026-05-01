import { VendorTruckReviewsQueryDto } from "../../presentation/dto/review.dto";

export interface CreateVendorTruckReviewInput {
  vendorId: string;
  customerId: string;
  rating: number;
  reviewText?: string;
  imageUrls?: string[];
  tagIds?: string[];
}

export interface IVendorTruckReviewRepository {

  findExistingReview(data: {
    vendorId: string;
    customerId: string;
  }): Promise<{ id: string } | null>;

  validateTags(tagIds: string[]): Promise<{ id: string; name: string }[]>;

  createReview(data: CreateVendorTruckReviewInput): Promise<any>;

  findAllTags(): Promise<
    {
      id: string;
      name: string;
    }[]
  >;

  findVendorReviewSummary(vendorId: string): Promise<{
    id: string;
    truckReviewAverage: number;
    truckReviewCount: number;
  } | null>;

  findVendorTruckReviews(
    vendorId: string,
    query: VendorTruckReviewsQueryDto,
  ): Promise<any[]>;

  countVendorTruckReviews(vendorId: string): Promise<number>;
}