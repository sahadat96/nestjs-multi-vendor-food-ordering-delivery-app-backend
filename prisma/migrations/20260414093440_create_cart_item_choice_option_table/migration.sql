/*
  Warnings:

  - You are about to drop the column `addOnIds` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `choiceOptionIds` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "addOnIds",
DROP COLUMN "choiceOptionIds",
ADD COLUMN     "note" TEXT;

-- CreateTable
CREATE TABLE "CartItemChoiceOption" (
    "cartItemId" TEXT NOT NULL,
    "choiceOptionId" TEXT NOT NULL,

    CONSTRAINT "CartItemChoiceOption_pkey" PRIMARY KEY ("cartItemId","choiceOptionId")
);

-- CreateIndex
CREATE INDEX "CartItemChoiceOption_choiceOptionId_idx" ON "CartItemChoiceOption"("choiceOptionId");

-- CreateIndex
CREATE INDEX "CartItem_productId_idx" ON "CartItem"("productId");

-- CreateIndex
CREATE INDEX "CartItem_sizeOptionId_idx" ON "CartItem"("sizeOptionId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_sizeOptionId_fkey" FOREIGN KEY ("sizeOptionId") REFERENCES "SizeOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemChoiceOption" ADD CONSTRAINT "CartItemChoiceOption_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemChoiceOption" ADD CONSTRAINT "CartItemChoiceOption_choiceOptionId_fkey" FOREIGN KEY ("choiceOptionId") REFERENCES "ChoiceOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
