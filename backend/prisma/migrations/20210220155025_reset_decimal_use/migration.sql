/*
  Warnings:

  - You are about to alter the column `price` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "transactionId" TEXT,
    "savedShoppingCartId" TEXT,
    "publisherId" TEXT NOT NULL,
    FOREIGN KEY ("publisherId") REFERENCES "publishers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("transactionId") REFERENCES "transactions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("savedShoppingCartId") REFERENCES "saved_shopping_carts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("id", "title", "publishYear", "isbn", "description", "price", "coverUrl", "coverDataUri", "createdAt", "updatedAt", "transactionId", "savedShoppingCartId", "publisherId") SELECT "id", "title", "publishYear", "isbn", "description", "price", "coverUrl", "coverDataUri", "createdAt", "updatedAt", "transactionId", "savedShoppingCartId", "publisherId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books.title_unique" ON "books"("title");
CREATE UNIQUE INDEX "books.isbn_unique" ON "books"("isbn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
