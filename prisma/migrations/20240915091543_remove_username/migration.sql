-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserBindingGroupRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "userBindingGroupId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserBindingGroupRequest_userBindingGroupId_fkey" FOREIGN KEY ("userBindingGroupId") REFERENCES "UserBindingGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserBindingGroupRequest" ("createdAt", "id", "status", "targetUserId", "updatedAt", "userId") SELECT "createdAt", "id", "status", "targetUserId", "updatedAt", "userId" FROM "UserBindingGroupRequest";
DROP TABLE "UserBindingGroupRequest";
ALTER TABLE "new_UserBindingGroupRequest" RENAME TO "UserBindingGroupRequest";
CREATE UNIQUE INDEX "UserBindingGroupRequest_userBindingGroupId_key" ON "UserBindingGroupRequest"("userBindingGroupId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
