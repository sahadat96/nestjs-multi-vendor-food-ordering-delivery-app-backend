-- AlterTable
ALTER TABLE "Cuisine" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Cuisine_isActive_idx" ON "Cuisine"("isActive");

-- CreateIndex
CREATE INDEX "Cuisine_position_idx" ON "Cuisine"("position");

-- CreateIndex
CREATE INDEX "VendorCuisine_cuisineId_idx" ON "VendorCuisine"("cuisineId");
