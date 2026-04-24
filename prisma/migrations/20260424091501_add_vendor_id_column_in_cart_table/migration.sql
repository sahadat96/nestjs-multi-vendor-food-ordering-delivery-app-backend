/*
  Warnings:

  - A unique constraint covering the columns `[customerId,vendorId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vendorId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cart_customerId_key";

-- DropIndex
DROP INDEX "CartItem_sizeOptionId_idx";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "vendorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Cart_customerId_idx" ON "Cart"("customerId");

-- CreateIndex
CREATE INDEX "Cart_vendorId_idx" ON "Cart"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_customerId_vendorId_key" ON "Cart"("customerId", "vendorId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
