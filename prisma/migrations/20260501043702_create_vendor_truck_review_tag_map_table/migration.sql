-- CreateTable
CREATE TABLE "VendorTruckReviewTagMap" (
    "reviewId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "VendorTruckReviewTagMap_pkey" PRIMARY KEY ("reviewId","tagId")
);

-- CreateIndex
CREATE INDEX "VendorTruckReviewTagMap_tagId_idx" ON "VendorTruckReviewTagMap"("tagId");

-- AddForeignKey
ALTER TABLE "VendorTruckReviewTagMap" ADD CONSTRAINT "VendorTruckReviewTagMap_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "VendorTruckReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorTruckReviewTagMap" ADD CONSTRAINT "VendorTruckReviewTagMap_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "VendorTruckReviewTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
