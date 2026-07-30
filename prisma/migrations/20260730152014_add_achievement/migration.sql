-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "issuer" TEXT,
    "issueDate" TIMESTAMP(3),
    "credentialUrl" TEXT,
    "imageId" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Achievement_displayOrder_idx" ON "Achievement"("displayOrder");

-- CreateIndex
CREATE INDEX "Achievement_visible_idx" ON "Achievement"("visible");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
