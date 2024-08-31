/*
  Warnings:

  - You are about to drop the `Guild` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `MemberRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Guild_guildId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Guild";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GuildSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "enabledAutoRole" BOOLEAN NOT NULL DEFAULT false,
    "enabledAutoRoleUserId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserBindingGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "parentUserId" TEXT NOT NULL,
    "isParent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MemberRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleIds" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MemberRole" ("guildId", "id", "roleIds", "userId") SELECT "guildId", "id", "roleIds", "userId" FROM "MemberRole";
DROP TABLE "MemberRole";
ALTER TABLE "new_MemberRole" RENAME TO "MemberRole";
CREATE UNIQUE INDEX "MemberRole_guildId_userId_key" ON "MemberRole"("guildId", "userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GuildSettings_guildId_key" ON "GuildSettings"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBindingGroup_userId_parentUserId_key" ON "UserBindingGroup"("userId", "parentUserId");
