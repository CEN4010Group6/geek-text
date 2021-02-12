/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[firstName,lastName]` on the table `authors`. If there are existing duplicate values, the migration will fail.
*/
-- CreateIndex
CREATE UNIQUE INDEX "authors.firstName_lastName_unique" ON "authors"("firstName", "lastName");
