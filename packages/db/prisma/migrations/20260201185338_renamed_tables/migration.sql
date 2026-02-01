/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvailableAction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvailableTrigger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trigger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZapRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZapRunOutbox` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_userId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRun" DROP CONSTRAINT "ZapRun_zapId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_zapRunId_fkey";

-- DropTable
DROP TABLE "Action";

-- DropTable
DROP TABLE "AvailableAction";

-- DropTable
DROP TABLE "AvailableTrigger";

-- DropTable
DROP TABLE "Trigger";

-- DropTable
DROP TABLE "Zap";

-- DropTable
DROP TABLE "ZapRun";

-- DropTable
DROP TABLE "ZapRunOutbox";

-- CreateTable
CREATE TABLE "available_trigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "available_trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_action" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "available_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zap" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "zap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trigger" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zap_run" (
    "id" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "zap_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zap_run_outbox" (
    "id" TEXT NOT NULL,
    "zapRunId" TEXT NOT NULL,

    CONSTRAINT "zap_run_outbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trigger_zapId_key" ON "trigger"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "zap_run_outbox_zapRunId_key" ON "zap_run_outbox"("zapRunId");

-- AddForeignKey
ALTER TABLE "zap" ADD CONSTRAINT "zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger" ADD CONSTRAINT "trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trigger" ADD CONSTRAINT "trigger_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "available_trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "available_action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zap_run" ADD CONSTRAINT "zap_run_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zap_run_outbox" ADD CONSTRAINT "zap_run_outbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "zap_run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
