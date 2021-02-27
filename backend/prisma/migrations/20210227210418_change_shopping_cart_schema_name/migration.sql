/*
  Warnings:

  - You are about to drop the column `savedShoppingCartId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the `saved_shopping_carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "shopping_carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "publishYear" INTEGER NOT NULL,
    "isbn" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "coverUrl" TEXT,
    "coverDataUri" TEXT,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "transactionId" TEXT,
    "shoppingCartId" TEXT,
    "publisherId" TEXT NOT NULL,
    FOREIGN KEY ("publisherId") REFERENCES "publishers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("shoppingCartId") REFERENCES "shopping_carts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("id", "title", "publishYear", "isbn", "description", "price", "coverUrl", "coverDataUri", "createdAt", "updatedAt", "sold", "transactionId", "publisherId") SELECT "id", "title", "publishYear", "isbn", "description", "price", "coverUrl", "coverDataUri", "createdAt", "updatedAt", "sold", "transactionId", "publisherId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books.title_unique" ON "books"("title");
CREATE UNIQUE INDEX "books.isbn_unique" ON "books"("isbn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "saved_shopping_carts";
PRAGMA foreign_keys=on;
