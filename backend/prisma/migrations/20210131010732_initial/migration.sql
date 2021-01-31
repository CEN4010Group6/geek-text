-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "book_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "cover_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "publisherPublisher_id" TEXT NOT NULL,
    FOREIGN KEY ("publisherPublisher_id") REFERENCES "Publisher" ("publisher_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "author_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "bookBook_id" TEXT,
    FOREIGN KEY ("bookBook_id") REFERENCES "Book" ("book_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Publisher" (
    "publisher_id" TEXT NOT NULL PRIMARY KEY,
    "publisher_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "genre_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genre_name" TEXT NOT NULL,
    "bookBook_id" TEXT,
    FOREIGN KEY ("bookBook_id") REFERENCES "Book" ("book_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Book.title_unique" ON "Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Author.name_unique" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher.publisher_name_unique" ON "Publisher"("publisher_name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre.genre_name_unique" ON "Genre"("genre_name");
