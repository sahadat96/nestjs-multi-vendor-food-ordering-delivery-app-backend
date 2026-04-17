-- CreateTable
CREATE TABLE "ReviewTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ReviewTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorReviewTagMap" (
    "reviewId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "VendorReviewTagMap_pkey" PRIMARY KEY ("reviewId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewTag_name_key" ON "ReviewTag"("name");

-- CreateIndex
CREATE INDEX "VendorReviewTagMap_tagId_idx" ON "VendorReviewTagMap"("tagId");

-- AddForeignKey
ALTER TABLE "VendorReviewTagMap" ADD CONSTRAINT "VendorReviewTagMap_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "VendorReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorReviewTagMap" ADD CONSTRAINT "VendorReviewTagMap_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ReviewTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
