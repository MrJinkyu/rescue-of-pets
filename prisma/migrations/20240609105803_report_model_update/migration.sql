/*
  Warnings:

  - You are about to drop the column `area` on the `Report` table. All the data in the column will be lost.
  - Added the required column `age` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "missingPlace" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "detail" TEXT,
    "gender" TEXT NOT NULL,
    "characteristics" TEXT,
    "description" TEXT,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("characteristics", "createdAt", "description", "detail", "gender", "id", "isActive", "missingPlace", "photo", "species", "updatedAt", "userId") SELECT "characteristics", "createdAt", "description", "detail", "gender", "id", "isActive", "missingPlace", "photo", "species", "updatedAt", "userId" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_key_check("Report");
PRAGMA foreign_keys=ON;
