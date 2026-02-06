/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User"
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();


-- Fix existing NULL avatars
UPDATE "User"
SET "avatar" = 'default.png'
WHERE "avatar" IS NULL;

-- Enforce NOT NULL on avatar
ALTER TABLE "User"
ALTER COLUMN "avatar" SET NOT NULL;
