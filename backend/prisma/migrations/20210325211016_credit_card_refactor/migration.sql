/*
  Warnings:

  - You are about to alter the column `lastFourDigits` on the `credit_cards` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    "isPreferredAddress" BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY ("userShippingAddressId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_addresses" ("id", "street", "apartmentOrUnit", "city", "state", "country", "zipcode", "userShippingAddressId") SELECT "id", "street", "apartmentOrUnit", "city", "state", "country", "zipcode", "userShippingAddressId" FROM "addresses";
DROP TABLE "addresses";
ALTER TABLE "new_addresses" RENAME TO "addresses";
CREATE TABLE "new_credit_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nickName" TEXT,
    "encryptedCreditCardNumber" TEXT NOT NULL,
    "encryptedCCV" TEXT NOT NULL,
    "lastFourDigits" INTEGER NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "isPreferredCreditCard" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_credit_cards" ("id", "userId", "encryptedCreditCardNumber", "encryptedCCV", "lastFourDigits", "expirationDate", "createdAt", "updatedAt") SELECT "id", "userId", "encryptedCreditCardNumber", "encryptedCCV", "lastFourDigits", "expirationDate", "createdAt", "updatedAt" FROM "credit_cards";
DROP TABLE "credit_cards";
ALTER TABLE "new_credit_cards" RENAME TO "credit_cards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
