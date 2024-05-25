/*
  Warnings:

  - You are about to drop the column `notes` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstName,lastName,email,phoneNumber,teacherId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_studentId_date_key";

-- DropIndex
DROP INDEX "Student_firstName_lastName_email_phoneNumber_key";

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "notes",
ADD COLUMN     "paymentNotes" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_firstName_lastName_email_phoneNumber_teacherId_key" ON "Student"("firstName", "lastName", "email", "phoneNumber", "teacherId");
