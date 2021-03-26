/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[encryptedCreditCardNumber]` on the table `credit_cards`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "credit_cards.encryptedCreditCardNumber_unique" ON "credit_cards"("encryptedCreditCardNumber");
