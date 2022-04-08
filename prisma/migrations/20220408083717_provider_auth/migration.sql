/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpExpiry` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpValue` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "otpExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "otpValue" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");
