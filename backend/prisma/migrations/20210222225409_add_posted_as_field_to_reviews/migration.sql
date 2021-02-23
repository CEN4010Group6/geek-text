-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "postedAs" TEXT NOT NULL DEFAULT 'Anonymous',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "reviews" ("id", "value", "description", "postedAs", "createdAt", "updatedAt", "userId", "bookId") SELECT "id", "value", "description", "postedAs", "createdAt", "updatedAt", "userId", "bookId" FROM "ratings";
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ratings";
PRAGMA foreign_keys=on;
