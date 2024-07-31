-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FREE', 'STANDARD', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "subscription" "UserRole" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Active" (
    "userId" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Active_pkey" PRIMARY KEY ("userId","attempts","date")
);

-- CreateTable
CREATE TABLE "Good" (
    "userId" INTEGER NOT NULL,
    "textId" INTEGER NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("userId","textId")
);

-- CreateTable
CREATE TABLE "SolveLater" (
    "userId" INTEGER NOT NULL,
    "textId" INTEGER NOT NULL,

    CONSTRAINT "SolveLater_pkey" PRIMARY KEY ("userId","textId")
);

-- CreateTable
CREATE TABLE "Memo" (
    "userId" INTEGER NOT NULL,
    "textId" INTEGER NOT NULL,
    "memo" TEXT NOT NULL,

    CONSTRAINT "Memo_pkey" PRIMARY KEY ("userId","textId")
);

-- CreateTable
CREATE TABLE "Flag" (
    "userId" INTEGER NOT NULL,
    "textId" INTEGER NOT NULL,

    CONSTRAINT "Flag_pkey" PRIMARY KEY ("userId","textId")
);

-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "en" TEXT NOT NULL,
    "ja" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextWord" (
    "textId" INTEGER NOT NULL,
    "wordId" INTEGER NOT NULL,

    CONSTRAINT "TextWord_pkey" PRIMARY KEY ("textId","wordId")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextLevel" (
    "textId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "TextLevel_pkey" PRIMARY KEY ("textId","levelId")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextTheme" (
    "textId" INTEGER NOT NULL,
    "themeId" INTEGER NOT NULL,

    CONSTRAINT "TextTheme_pkey" PRIMARY KEY ("textId","themeId")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");

-- CreateIndex
CREATE UNIQUE INDEX "Level_level_key" ON "Level"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_theme_key" ON "Theme"("theme");

-- AddForeignKey
ALTER TABLE "Active" ADD CONSTRAINT "Active_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolveLater" ADD CONSTRAINT "SolveLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolveLater" ADD CONSTRAINT "SolveLater_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD CONSTRAINT "Flag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD CONSTRAINT "Flag_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextWord" ADD CONSTRAINT "TextWord_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextWord" ADD CONSTRAINT "TextWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextLevel" ADD CONSTRAINT "TextLevel_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextLevel" ADD CONSTRAINT "TextLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTheme" ADD CONSTRAINT "TextTheme_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTheme" ADD CONSTRAINT "TextTheme_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
