-- CreateTable
CREATE TABLE "VendorTruckReview" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorTruckReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorTruckReview_vendorId_idx" ON "VendorTruckReview"("vendorId");

-- CreateIndex
CREATE INDEX "VendorTruckReview_customerId_idx" ON "VendorTruckReview"("customerId");

-- CreateIndex
CREATE INDEX "VendorTruckReview_createdAt_idx" ON "VendorTruckReview"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "VendorTruckReview_vendorId_customerId_key" ON "VendorTruckReview"("vendorId", "customerId");

-- AddForeignKey
ALTER TABLE "VendorTruckReview" ADD CONSTRAINT "VendorTruckReview_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorTruckReview" ADD CONSTRAINT "VendorTruckReview_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
