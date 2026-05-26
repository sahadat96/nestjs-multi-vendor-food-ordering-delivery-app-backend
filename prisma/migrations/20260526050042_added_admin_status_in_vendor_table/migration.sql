-- CreateEnum
CREATE TYPE "VendorAdminStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DISABLED');

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "adminStatus" "VendorAdminStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "disabledAt" TIMESTAMP(3),
ADD COLUMN     "statusReason" TEXT,
ADD COLUMN     "suspendedAt" TIMESTAMP(3);
