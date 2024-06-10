-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "area" TEXT NOT NULL,
    "missingPlace" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "detail" TEXT,
    "gender" TEXT NOT NULL,
    "characteristics" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("age", "area", "characteristics", "color", "createdAt", "description", "detail", "gender", "id", "isActive", "missingPlace", "name", "photo", "species", "updatedAt", "userId", "weight") SELECT "age", "area", "characteristics", "color", "createdAt", "description", "detail", "gender", "id", "isActive", "missingPlace", "name", "photo", "species", "updatedAt", "userId", "weight" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_key_check("Report");
PRAGMA foreign_keys=ON;
