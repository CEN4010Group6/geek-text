/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Role.name_unique";

-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

INSERT INTO "roles" ("id", "name") SELECT "id", "name" FROM "Role";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__RoleToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__RoleToUser" ("A", "B") SELECT "A", "B" FROM "_RoleToUser";
DROP TABLE "_RoleToUser";
ALTER TABLE "new__RoleToUser" RENAME TO "_RoleToUser";
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "roles.name_unique" ON "roles"("name");
