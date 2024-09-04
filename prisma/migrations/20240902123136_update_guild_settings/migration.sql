/*
  Warnings:

  - You are about to drop the column `enabledAutoRole` on the `GuildSettings` table. All the data in the column will be lost.
  - You are about to drop the column `enabledUserBinding` on the `GuildSettings` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdatedAutoRoleUserId` on the `GuildSettings` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdatedUserBindingUserId` on the `GuildSettings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuildSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "allowedCollectData" BOOLEAN NOT NULL DEFAULT false,
    "lastDataCollectedDate" DATETIME,
    "enabledRolesRecovery" BOOLEAN NOT NULL DEFAULT false,
    "enabledUserBindingGroup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GuildSettings" ("createdAt", "guildId", "id", "updatedAt") SELECT "createdAt", "guildId", "id", "updatedAt" FROM "GuildSettings";
DROP TABLE "GuildSettings";
ALTER TABLE "new_GuildSettings" RENAME TO "GuildSettings";
CREATE UNIQUE INDEX "GuildSettings_guildId_key" ON "GuildSettings"("guildId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
