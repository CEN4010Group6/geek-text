/*
  Warnings:

  - The migration will change the primary key for the `credit_cards` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cardId` on the `credit_cards` table. All the data in the column will be lost.
  - Added the required column `id` to the `credit_cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "apartmentOrUnit" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "userShippingAddressId" TEXT NOT NULL,
    FOREIGN KEY ("userShippingAddressId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_addresses" ("id", "street", "apartmentOrUnit", "city", "state", "country", "zipcode", "userShippingAddressId") SELECT "id", "street", "apartmentOrUnit", "city", "state", "country", "zipcode", "userShippingAddressId" FROM "addresses";
DROP TABLE "addresses";
ALTER TABLE "new_addresses" RENAME TO "addresses";
CREATE TABLE "new_credit_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "encryptedCreditCardNumber" TEXT NOT NULL,
    "encryptedCCV" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_credit_cards" ("userId", "encryptedCreditCardNumber", "encryptedCCV", "createdAt", "updatedAt") SELECT "userId", "encryptedCreditCardNumber", "encryptedCCV", "createdAt", "updatedAt" FROM "credit_cards";
DROP TABLE "credit_cards";
ALTER TABLE "new_credit_cards" RENAME TO "credit_cards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
