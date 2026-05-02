-- CreateTable
CREATE TABLE "FoodReview" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodReview_productId_idx" ON "FoodReview"("productId");

-- CreateIndex
CREATE INDEX "FoodReview_customerId_idx" ON "FoodReview"("customerId");

-- CreateIndex
CREATE INDEX "FoodReview_createdAt_idx" ON "FoodReview"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FoodReview_orderItemId_key" ON "FoodReview"("orderItemId");

-- AddForeignKey
ALTER TABLE "FoodReview" ADD CONSTRAINT "FoodReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodReview" ADD CONSTRAINT "FoodReview_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodReview" ADD CONSTRAINT "FoodReview_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
