/*
  Warnings:

  - You are about to drop the column `order` on the `Action` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "order",
ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;
