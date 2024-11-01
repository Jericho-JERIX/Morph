/*
  Warnings:

  - Added the required column `guildId` to the `MagicLink` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MagicLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "invitationLink" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MagicLink" ("code", "createdAt", "id", "invitationLink", "roleId", "updatedAt", "userId") SELECT "code", "createdAt", "id", "invitationLink", "roleId", "updatedAt", "userId" FROM "MagicLink";
DROP TABLE "MagicLink";
ALTER TABLE "new_MagicLink" RENAME TO "MagicLink";
CREATE UNIQUE INDEX "MagicLink_invitationLink_key" ON "MagicLink"("invitationLink");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
