/*
  Warnings:

  - You are about to drop the column `destinationId` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `Flight` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[flightNumber,startTime,endTime,sourceCode,destinationCode]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destinationCode` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceCode` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_sourceId_fkey";

-- DropIndex
DROP INDEX "Flight_flightNumber_startTime_endTime_sourceId_destinationI_key";

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "destinationId",
DROP COLUMN "sourceId",
ADD COLUMN     "destinationCode" TEXT NOT NULL,
ADD COLUMN     "sourceCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_startTime_endTime_sourceCode_destinatio_key" ON "Flight"("flightNumber", "startTime", "endTime", "sourceCode", "destinationCode");

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_sourceCode_fkey" FOREIGN KEY ("sourceCode") REFERENCES "Airport"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_destinationCode_fkey" FOREIGN KEY ("destinationCode") REFERENCES "Airport"("code") ON DELETE CASCADE ON UPDATE CASCADE;
