/*
  Warnings:

  - You are about to drop the column `userBillingAddressId` on the `addresses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "addresses_userBillingAddressId_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "apartmentOrUnit" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "userShippingAddressId" TEXT NOT NULL,
    FOREIGN KEY ("userShippingAddressId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_addresses" ("id", "street", "apartmentOrUnit", "city", "state", "country", "zipcode", "userShippingAddressId") SELECT "id", "street", "apartmentOrUnit", "city", "state", "country", "zipcode", "userShippingAddressId" FROM "addresses";
DROP TABLE "addresses";
ALTER TABLE "new_addresses" RENAME TO "addresses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
