-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SkillCategory" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;
