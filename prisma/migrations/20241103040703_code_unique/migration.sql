/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `MagicLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MagicLink_code_key" ON "MagicLink"("code");
