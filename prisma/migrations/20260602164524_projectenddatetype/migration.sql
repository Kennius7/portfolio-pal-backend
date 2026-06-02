-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectEndAt" DROP NOT NULL,
ALTER COLUMN "projectEndAt" SET DEFAULT 'ongoing',
ALTER COLUMN "projectEndAt" SET DATA TYPE TEXT;
