/*
  Warnings:

  - The primary key for the `FXQL` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FXQL` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FXQL" DROP CONSTRAINT "FXQL_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FXQL_pkey" PRIMARY KEY ("id");
