-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "aboutImageId" TEXT,
ADD COLUMN     "faviconId" TEXT,
ADD COLUMN     "ogImageId" TEXT;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_aboutImageId_fkey" FOREIGN KEY ("aboutImageId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_faviconId_fkey" FOREIGN KEY ("faviconId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
