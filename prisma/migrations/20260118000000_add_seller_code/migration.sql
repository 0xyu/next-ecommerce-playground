-- AlterTable
ALTER TABLE "User" ADD COLUMN "sellerCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_sellerCode_key" ON "User"("sellerCode");
