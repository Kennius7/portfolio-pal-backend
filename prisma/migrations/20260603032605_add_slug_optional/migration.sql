/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_slug_key" ON "Portfolio"("slug");
