/*
  Warnings:

  - Made the column `slug` on table `Portfolio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "resumeUrl" SET DEFAULT '',
ALTER COLUMN "slug" SET NOT NULL;
