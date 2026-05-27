/*
  Warnings:

  - The `published` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "published",
ADD COLUMN     "published" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
