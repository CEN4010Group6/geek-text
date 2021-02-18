/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[nickName]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - Added the required column `publishYear` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `publishers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `publishers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "nickName" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "publishYear" INTEGER NOT NULL,
    "isbn" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
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
INSERT INTO "new_books" ("id", "title", "isbn", "description", "price", "coverUrl", "createdAt", "updatedAt", "transactionId", "savedShoppingCartId", "publisherId") SELECT "id", "title", "isbn", "description", "price", "coverUrl", "createdAt", "updatedAt", "transactionId", "savedShoppingCartId", "publisherId" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books.title_unique" ON "books"("title");
CREATE UNIQUE INDEX "books.isbn_unique" ON "books"("isbn");
CREATE TABLE "new_publishers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "website" TEXT
);
INSERT INTO "new_publishers" ("id", "name") SELECT "id", "name" FROM "publishers";
DROP TABLE "publishers";
ALTER TABLE "new_publishers" RENAME TO "publishers";
CREATE UNIQUE INDEX "publishers.name_unique" ON "publishers"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "users.nickName_unique" ON "users"("nickName");
