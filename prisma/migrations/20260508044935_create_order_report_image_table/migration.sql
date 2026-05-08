-- CreateTable
CREATE TABLE "OrderReportImage" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderReportImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderReportImage_reportId_idx" ON "OrderReportImage"("reportId");

-- AddForeignKey
ALTER TABLE "OrderReportImage" ADD CONSTRAINT "OrderReportImage_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "OrderReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
