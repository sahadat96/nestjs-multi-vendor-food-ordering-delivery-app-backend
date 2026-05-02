-- CreateTable
CREATE TABLE "FoodReviewTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FoodReviewTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodReviewTagMap" (
    "reviewId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "FoodReviewTagMap_pkey" PRIMARY KEY ("reviewId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodReviewTag_name_key" ON "FoodReviewTag"("name");

-- CreateIndex
CREATE INDEX "FoodReviewTagMap_tagId_idx" ON "FoodReviewTagMap"("tagId");

-- AddForeignKey
ALTER TABLE "FoodReviewTagMap" ADD CONSTRAINT "FoodReviewTagMap_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "FoodReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodReviewTagMap" ADD CONSTRAINT "FoodReviewTagMap_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "FoodReviewTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
