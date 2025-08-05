-- CreateTable
CREATE TABLE "IntresseAnmalan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT,
    "meddelande" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
