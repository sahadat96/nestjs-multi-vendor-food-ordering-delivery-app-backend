export class VendorMenuProductResponseDto {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  estimateCookTime!: number;
  image?: string;
  categoryName?: string;
}

export class VendorMenuSectionResponseDto {
  categoryId!: string;
  categoryName!: string;
  products!: VendorMenuProductResponseDto[];
}

export class VendorMenuVendorInfoResponseDto {
  id!: string;
  businessName!: string;
  coverImage?: string;
  bio?: string;
  cityLabel?: string;
  distanceKm?: number;
  isOpen!: boolean;
  statusLabel!: string;
  reviewAverage!: number;
  reviewCount!: number;
  cuisines!: string[];
}

export class VendorMenuResponseDto {
  vendor!: VendorMenuVendorInfoResponseDto;
  sections!: VendorMenuSectionResponseDto[];
}

export class VendorInfoOpeningHourResponseDto {
  dayOfWeek!: number;
  dayLabel!: string;
  openTime?: string | null;
  closeTime?: string | null;
  isClosed!: boolean;
}

export class VendorInfoSocialLinkResponseDto {
  platform!: string;
  url!: string;
}

export class VendorInfoResponseDto {
  id!: string;
  bio?: string;
  publicEmail?: string;
  contactNumber?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  openingHours!: VendorInfoOpeningHourResponseDto[];
  socialLinks!: VendorInfoSocialLinkResponseDto[];
}

export class TruckGalleryImageResponseDto {
  id!: string;
  url!: string;
  caption?: string;
  isPrimary!: boolean;
  position!: number;
  createdAt!: Date;
}

export class UploadTruckGalleryResponseDto {
  message!: string;
}

export class TruckGalleryResponseDto {
  vendorId!: string;
  items!: TruckGalleryImageResponseDto[];
}

export class VendorReviewTagItemResponseDto {
  id!: string;
  name!: string;
}

export class VendorReviewImageItemResponseDto {
  id!: string;
  imageUrl!: string;
  position!: number;
}

export class VendorReviewItemResponseDto {
  id!: string;
  customerId!: string;
  customerName!: string;
  customerAvatar?: string;
  rating!: number;
  reviewText?: string;
  createdAt!: Date;
  tags!: VendorReviewTagItemResponseDto[];
  images!: VendorReviewImageItemResponseDto[];
}

export class VendorReviewsResponseDto {
  vendorId!: string;
  reviewAverage!: number;
  reviewCount!: number;
  items!: VendorReviewItemResponseDto[];
  page!: number;
  limit!: number;
  total!: number;
  totalPages!: number;
}