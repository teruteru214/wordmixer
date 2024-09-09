/*
  Warnings:

  - You are about to drop the `Good` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolveLater` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TranslationType" AS ENUM ('ja', 'en');

-- DropForeignKey
ALTER TABLE "Good" DROP CONSTRAINT "Good_textId_fkey";

-- DropForeignKey
ALTER TABLE "Good" DROP CONSTRAINT "Good_userId_fkey";

-- DropForeignKey
ALTER TABLE "SolveLater" DROP CONSTRAINT "SolveLater_textId_fkey";

-- DropForeignKey
ALTER TABLE "SolveLater" DROP CONSTRAINT "SolveLater_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "translation" "TranslationType" NOT NULL DEFAULT 'ja';

-- DropTable
DROP TABLE "Good";

-- DropTable
DROP TABLE "SolveLater";
