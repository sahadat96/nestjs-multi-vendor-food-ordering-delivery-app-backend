-- CreateEnum
CREATE TYPE "HelpTicketUserType" AS ENUM ('CUSTOMER', 'VENDOR');

-- CreateEnum
CREATE TYPE "HelpTicketStatus" AS ENUM ('OPEN', 'IN_REVIEW', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "HelpTicketPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "HelpCenterTicket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT,
    "vendorId" TEXT,
    "userType" "HelpTicketUserType" NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "HelpTicketStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "HelpTicketPriority" NOT NULL DEFAULT 'NORMAL',
    "adminReply" TEXT,
    "repliedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HelpCenterTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HelpCenterTicket_userId_idx" ON "HelpCenterTicket"("userId");

-- CreateIndex
CREATE INDEX "HelpCenterTicket_customerId_idx" ON "HelpCenterTicket"("customerId");

-- CreateIndex
CREATE INDEX "HelpCenterTicket_vendorId_idx" ON "HelpCenterTicket"("vendorId");

-- CreateIndex
CREATE INDEX "HelpCenterTicket_userType_idx" ON "HelpCenterTicket"("userType");

-- CreateIndex
CREATE INDEX "HelpCenterTicket_status_idx" ON "HelpCenterTicket"("status");

-- CreateIndex
CREATE INDEX "HelpCenterTicket_priority_idx" ON "HelpCenterTicket"("priority");

-- CreateIndex
CREATE INDEX "HelpCenterTicket_createdAt_idx" ON "HelpCenterTicket"("createdAt");

-- AddForeignKey
ALTER TABLE "HelpCenterTicket" ADD CONSTRAINT "HelpCenterTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpCenterTicket" ADD CONSTRAINT "HelpCenterTicket_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpCenterTicket" ADD CONSTRAINT "HelpCenterTicket_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
