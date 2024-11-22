/*
  Warnings:

  - A unique constraint covering the columns `[sourceCurrency,destinationCurrency]` on the table `FxqlStatement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `FxqlStatement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FxqlStatement" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FxqlStatement_sourceCurrency_destinationCurrency_key" ON "FxqlStatement"("sourceCurrency", "destinationCurrency");
