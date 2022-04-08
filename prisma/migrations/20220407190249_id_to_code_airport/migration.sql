/*
  Warnings:

  - You are about to drop the column `airportId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `airportId` on the `Provider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[airportCode,providerId,userId,flightId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,airportCode,gstin]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `airportCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airportCode` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_airportId_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_airportId_fkey";

-- DropIndex
DROP INDEX "Order_airportId_providerId_userId_flightId_key";

-- DropIndex
DROP INDEX "Provider_name_airportId_gstin_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "airportId",
ADD COLUMN     "airportCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "airportId",
ADD COLUMN     "airportCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_airportCode_providerId_userId_flightId_key" ON "Order"("airportCode", "providerId", "userId", "flightId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_airportCode_gstin_key" ON "Provider"("name", "airportCode", "gstin");

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_airportCode_fkey" FOREIGN KEY ("airportCode") REFERENCES "Airport"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_airportCode_fkey" FOREIGN KEY ("airportCode") REFERENCES "Airport"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
