-- CreateTable
CREATE TABLE "VendorTruckReviewTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VendorTruckReviewTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorTruckReviewTag_name_key" ON "VendorTruckReviewTag"("name");
