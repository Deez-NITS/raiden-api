/*
  Warnings:

  - Added the required column `otpExpiry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpValue` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "otpValue" TEXT NOT NULL;
