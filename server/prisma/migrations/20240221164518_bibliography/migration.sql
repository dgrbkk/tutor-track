/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Bibliography` will be added. If there are existing duplicate values, this will fail.
  - Made the column `url` on table `Bibliography` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Bibliography_name_author_key";

-- AlterTable
ALTER TABLE "Bibliography" ALTER COLUMN "url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bibliography_url_key" ON "Bibliography"("url");
