/*
  Warnings:

  - You are about to drop the column `bio` on the `Portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "bio",
ADD COLUMN     "resumeUrl" TEXT DEFAULT 'My resume link',
ALTER COLUMN "title" SET DEFAULT 'Portfolio Title',
ALTER COLUMN "theme" SET DEFAULT '',
ALTER COLUMN "tagline" SET DEFAULT 'Portfolio Tagline',
ALTER COLUMN "greeting" SET DEFAULT 'Hello',
ALTER COLUMN "bioShort" SET DEFAULT 'Short bio',
ALTER COLUMN "bioLong" SET DEFAULT 'Long bio',
ALTER COLUMN "whatsapp" SET DEFAULT 'Whatsapp number: eg. +2348012345678',
ALTER COLUMN "email" SET DEFAULT 'My email address: eg. johndoe@portfoliopal.com',
ALTER COLUMN "avatarUrl" SET DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb';
