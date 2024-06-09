-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "area" TEXT NOT NULL,
    "missingPlace" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "detail" TEXT,
    "gender" TEXT NOT NULL,
    "characteristics" TEXT,
    "description" TEXT,
    "photo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
