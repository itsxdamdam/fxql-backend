/*
  Warnings:

  - You are about to drop the `FxqlStatement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FxqlStatement";

-- CreateTable
CREATE TABLE "FXQL" (
    "id" TEXT NOT NULL,
    "sourceCurrency" TEXT NOT NULL,
    "destinationCurrency" TEXT NOT NULL,
    "sellPrice" MONEY NOT NULL,
    "BuyPrice" MONEY NOT NULL,
    "CapAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FXQL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FXQL_sourceCurrency_destinationCurrency_key" ON "FXQL"("sourceCurrency", "destinationCurrency");
