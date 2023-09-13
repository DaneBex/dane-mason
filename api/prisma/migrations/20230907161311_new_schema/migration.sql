/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('WHITE', 'BLACK', 'HISPANIC', 'AMERICAN_INDIAN', 'ASIAN');

-- CreateEnum
CREATE TYPE "Income" AS ENUM ('ZERO', 'TWENTY', 'FIFTY', 'EIGHTY');

-- CreateEnum
CREATE TYPE "BusinessTags" AS ENUM ('ORGANIC', 'FAMILY_OWNED', 'PET_FRIENDLY', 'LIVE_MUSIC');

-- CreateEnum
CREATE TYPE "PaymentOptions" AS ENUM ('CREDIT_CARD', 'CASH', 'MOBILE_PAYMENT', 'ONLINE_TRANSFER');

-- CreateEnum
CREATE TYPE "AchievementTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('SHOPPING', 'EVENTS', 'PROMOTIONS', 'HOLIDAY');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "echoes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "income" "Income",
ADD COLUMN     "married" BOOLEAN,
ADD COLUMN     "profileImg" TEXT,
ADD COLUMN     "race" "Race",
ADD COLUMN     "sex" "Sex";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT,
    "gallery" TEXT[],
    "hoursOfOperation" JSONB[],
    "rating" DOUBLE PRECISION,
    "specialOffers" JSONB[],
    "facebook" TEXT,
    "instagram" TEXT,
    "x" TEXT,
    "tags" "BusinessTags"[],
    "events" TEXT[],
    "paymentOptions" "PaymentOptions"[],
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessOwners" (
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessOwners_pkey" PRIMARY KEY ("userId","businessId")
);

-- CreateTable
CREATE TABLE "UserAchievements" (
    "achievementId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievements_pkey" PRIMARY KEY ("achievementId","userId")
);

-- CreateTable
CREATE TABLE "FavoriteBusinesses" (
    "businessId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteBusinesses_pkey" PRIMARY KEY ("businessId","userId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "authorId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "photos" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,
    "reports" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "criteria" JSONB NOT NULL,
    "icon" TEXT NOT NULL,
    "echoes" INTEGER NOT NULL,
    "tier" "AchievementTier" NOT NULL,
    "unlockMessage" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "expireDate" TIMESTAMP(3),
    "businessId" TEXT,
    "type" "AchievementType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementRelation" (
    "id" TEXT NOT NULL,
    "fromAchievementId" TEXT NOT NULL,
    "toAchievementId" TEXT NOT NULL,

    CONSTRAINT "AchievementRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessOwners" ADD CONSTRAINT "BusinessOwners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessOwners" ADD CONSTRAINT "BusinessOwners_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievements" ADD CONSTRAINT "UserAchievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteBusinesses" ADD CONSTRAINT "FavoriteBusinesses_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteBusinesses" ADD CONSTRAINT "FavoriteBusinesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementRelation" ADD CONSTRAINT "AchievementRelation_fromAchievementId_fkey" FOREIGN KEY ("fromAchievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementRelation" ADD CONSTRAINT "AchievementRelation_toAchievementId_fkey" FOREIGN KEY ("toAchievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
