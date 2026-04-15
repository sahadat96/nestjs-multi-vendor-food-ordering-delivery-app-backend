-- CreateTable
CREATE TABLE "OrderItemChoiceOption" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "choiceOptionId" TEXT,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItemChoiceOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderItemChoiceOption_orderItemId_idx" ON "OrderItemChoiceOption"("orderItemId");

-- AddForeignKey
ALTER TABLE "OrderItemChoiceOption" ADD CONSTRAINT "OrderItemChoiceOption_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
