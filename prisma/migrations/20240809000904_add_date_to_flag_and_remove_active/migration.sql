/*
  Warnings:

  - The primary key for the `Flag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Active` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Flag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Active" DROP CONSTRAINT "Active_userId_fkey";

-- AlterTable
ALTER TABLE "Flag" DROP CONSTRAINT "Flag_pkey",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Flag_pkey" PRIMARY KEY ("userId", "textId", "date");

-- DropTable
DROP TABLE "Active";
