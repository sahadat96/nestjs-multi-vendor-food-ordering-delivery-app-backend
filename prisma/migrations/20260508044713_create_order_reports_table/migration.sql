-- CreateEnum
CREATE TYPE "OrderReportReason" AS ENUM ('CUSTOMER_NO_SHOW', 'CUSTOMER_UNREACHABLE', 'FAKE_ORDER', 'PAYMENT_ISSUE', 'ABUSIVE_BEHAVIOR', 'WRONG_ORDER_CLAIM', 'OTHER');

-- CreateEnum
CREATE TYPE "OrderReportStatus" AS ENUM ('OPEN', 'IN_REVIEW', 'RESOLVED', 'REJECTED');

-- CreateTable
CREATE TABLE "OrderReport" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "reason" "OrderReportReason" NOT NULL,
    "description" TEXT,
    "status" "OrderReportStatus" NOT NULL DEFAULT 'OPEN',
    "reviewedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderReport_orderId_idx" ON "OrderReport"("orderId");

-- CreateIndex
CREATE INDEX "OrderReport_vendorId_idx" ON "OrderReport"("vendorId");

-- CreateIndex
CREATE INDEX "OrderReport_customerId_idx" ON "OrderReport"("customerId");

-- CreateIndex
CREATE INDEX "OrderReport_status_idx" ON "OrderReport"("status");

-- CreateIndex
CREATE INDEX "OrderReport_createdAt_idx" ON "OrderReport"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "OrderReport_orderId_vendorId_key" ON "OrderReport"("orderId", "vendorId");

-- AddForeignKey
ALTER TABLE "OrderReport" ADD CONSTRAINT "OrderReport_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderReport" ADD CONSTRAINT "OrderReport_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderReport" ADD CONSTRAINT "OrderReport_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
