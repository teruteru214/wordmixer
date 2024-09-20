/*
  Warnings:

  - The primary key for the `Memo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `answer` to the `Memo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Memo" DROP CONSTRAINT "Memo_pkey",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Memo_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "TranslationType";
