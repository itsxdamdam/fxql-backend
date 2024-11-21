-- CreateTable
CREATE TABLE "FxqlStatement" (
    "id" TEXT NOT NULL,
    "sourceCurrency" TEXT NOT NULL,
    "destinationCurrency" TEXT NOT NULL,
    "sellPrice" MONEY NOT NULL,
    "BuyPrice" MONEY NOT NULL,
    "CapAmount" INTEGER NOT NULL,

    CONSTRAINT "FxqlStatement_pkey" PRIMARY KEY ("id")
);
