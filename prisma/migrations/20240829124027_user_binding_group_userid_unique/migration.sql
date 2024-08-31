/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserBindingGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBindingGroup_userId_parentUserId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserBindingGroup_userId_key" ON "UserBindingGroup"("userId");
