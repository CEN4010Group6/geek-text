/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[firstName,middleName,lastName]` on the table `authors`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "authors.firstName_middleName_lastName_unique" ON "authors"("firstName", "middleName", "lastName");
