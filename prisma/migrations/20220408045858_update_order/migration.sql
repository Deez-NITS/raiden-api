/*
  Warnings:

  - You are about to drop the column `airportCode` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId,userId,flightId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_airportCode_fkey";

-- DropIndex
DROP INDEX "Order_airportCode_providerId_userId_flightId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "airportCode",
ALTER COLUMN "status" SET DEFAULT E'RECIEVED';

-- CreateIndex
CREATE UNIQUE INDEX "Order_providerId_userId_flightId_key" ON "Order"("providerId", "userId", "flightId");
