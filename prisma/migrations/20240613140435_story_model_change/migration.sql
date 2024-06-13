/*
  Warnings:

  - You are about to drop the column `view` on the `Story` table. All the data in the column will be lost.
  - Added the required column `area` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Made the column `contents` on table `Story` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Story" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "photo" TEXT,
    "species" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Story" ("contents", "createdAt", "id", "photo", "title", "updatedAt", "userId") SELECT "contents", "createdAt", "id", "photo", "title", "updatedAt", "userId" FROM "Story";
DROP TABLE "Story";
ALTER TABLE "new_Story" RENAME TO "Story";
PRAGMA foreign_key_check("Story");
PRAGMA foreign_keys=ON;
