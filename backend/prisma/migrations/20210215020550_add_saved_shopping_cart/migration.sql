/*
  Warnings:

  - Added the required column `lastFourDigits` to the `credit_cards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "saved_shopping_carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isbn" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "coverUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "transactionId" TEXT,
    "savedShoppingCartId" TEXT,
    "publisherId" TEXT NOT NULL,
    FOREIGN KEY ("publisherId") REFERENCES "publishers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("savedShoppingCartId") REFERENCES "saved_shopping_carts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("id", "title", "isbn", "description", "price", "coverUrl", "createdAt", "updatedAt", "transactionId", "publisherId") SELECT "id", "title", "isbn", "description", "price", "coverUrl", "createdAt", "updatedAt", "transactionId", "publisherId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books.title_unique" ON "books"("title");
CREATE UNIQUE INDEX "books.isbn_unique" ON "books"("isbn");
CREATE TABLE "new_credit_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "encryptedCreditCardNumber" TEXT NOT NULL,
    "encryptedCCV" TEXT NOT NULL,
    "lastFourDigits" TEXT NOT NULL CHECK (length("lastFourDigits") = 4),
    "expirationDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_credit_cards" ("id", "userId", "encryptedCreditCardNumber", "encryptedCCV", "expirationDate", "createdAt", "updatedAt") SELECT "id", "userId", "encryptedCreditCardNumber", "encryptedCCV", "expirationDate", "createdAt", "updatedAt" FROM "credit_cards";
DROP TABLE "credit_cards";
ALTER TABLE "new_credit_cards" RENAME TO "credit_cards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
