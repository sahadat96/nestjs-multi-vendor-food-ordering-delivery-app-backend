-- CreateTable
CREATE TABLE "CartItemAddOn" (
    "cartItemId" TEXT NOT NULL,
    "addOnId" TEXT NOT NULL,

    CONSTRAINT "CartItemAddOn_pkey" PRIMARY KEY ("cartItemId","addOnId")
);

-- CreateIndex
CREATE INDEX "CartItemAddOn_addOnId_idx" ON "CartItemAddOn"("addOnId");

-- AddForeignKey
ALTER TABLE "CartItemAddOn" ADD CONSTRAINT "CartItemAddOn_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemAddOn" ADD CONSTRAINT "CartItemAddOn_addOnId_fkey" FOREIGN KEY ("addOnId") REFERENCES "AddOn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
