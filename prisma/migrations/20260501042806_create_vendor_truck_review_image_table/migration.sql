-- CreateTable
CREATE TABLE "VendorTruckReviewImage" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorTruckReviewImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorTruckReviewImage_reviewId_idx" ON "VendorTruckReviewImage"("reviewId");

-- AddForeignKey
ALTER TABLE "VendorTruckReviewImage" ADD CONSTRAINT "VendorTruckReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "VendorTruckReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
