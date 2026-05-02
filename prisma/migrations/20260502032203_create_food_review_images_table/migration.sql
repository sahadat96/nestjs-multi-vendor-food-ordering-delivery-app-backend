-- CreateTable
CREATE TABLE "FoodReviewImage" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodReviewImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodReviewImage_reviewId_idx" ON "FoodReviewImage"("reviewId");

-- AddForeignKey
ALTER TABLE "FoodReviewImage" ADD CONSTRAINT "FoodReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "FoodReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
