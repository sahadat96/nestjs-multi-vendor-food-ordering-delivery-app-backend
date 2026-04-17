-- CreateTable
CREATE TABLE "VendorReviewImage" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorReviewImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorReviewImage_reviewId_idx" ON "VendorReviewImage"("reviewId");

-- AddForeignKey
ALTER TABLE "VendorReviewImage" ADD CONSTRAINT "VendorReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "VendorReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
