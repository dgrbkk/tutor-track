/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName,email,phoneNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- DropIndex
DROP INDEX "Student_phoneNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Student_firstName_lastName_email_phoneNumber_key" ON "Student"("firstName", "lastName", "email", "phoneNumber");
