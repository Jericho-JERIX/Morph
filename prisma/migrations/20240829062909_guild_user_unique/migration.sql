/*
  Warnings:

  - A unique constraint covering the columns `[guildId,userId]` on the table `MemberRole` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MemberRole_guildId_userId_key" ON "MemberRole"("guildId", "userId");
