/*
  Warnings:

  - You are about to drop the column `emailToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isValid` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emailToken" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,
    "expiration" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmpassword" TEXT NOT NULL
);
INSERT INTO "new_User" ("confirmpassword", "createdAt", "email", "id", "name", "password", "surname", "updatedAt") SELECT "confirmpassword", "createdAt", "email", "id", "name", "password", "surname", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Token_emailToken_key" ON "Token"("emailToken");
