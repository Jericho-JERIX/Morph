/*
  Warnings:

  - Added the required column `enabledUserBindingUserId` to the `GuildSettings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuildSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "enabledAutoRole" BOOLEAN NOT NULL DEFAULT false,
    "enabledAutoRoleUserId" TEXT NOT NULL,
    "enabledUserBinding" BOOLEAN NOT NULL DEFAULT false,
    "enabledUserBindingUserId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GuildSettings" ("createdAt", "enabledAutoRole", "enabledAutoRoleUserId", "guildId", "id", "updatedAt") SELECT "createdAt", "enabledAutoRole", "enabledAutoRoleUserId", "guildId", "id", "updatedAt" FROM "GuildSettings";
DROP TABLE "GuildSettings";
ALTER TABLE "new_GuildSettings" RENAME TO "GuildSettings";
CREATE UNIQUE INDEX "GuildSettings_guildId_key" ON "GuildSettings"("guildId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
