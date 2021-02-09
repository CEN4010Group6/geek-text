/*
  Warnings:

  - Added the required column `expirationDate` to the `credit_cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_credit_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "encryptedCreditCardNumber" TEXT NOT NULL,
    "encryptedCCV" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_credit_cards" ("id", "userId", "encryptedCreditCardNumber", "encryptedCCV", "createdAt", "updatedAt") SELECT "id", "userId", "encryptedCreditCardNumber", "encryptedCCV", "createdAt", "updatedAt" FROM "credit_cards";
DROP TABLE "credit_cards";
ALTER TABLE "new_credit_cards" RENAME TO "credit_cards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
