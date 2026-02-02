-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT');

-- AlterTable
ALTER TABLE "zap_run_outbox" ADD COLUMN     "status" "OutboxStatus" NOT NULL DEFAULT 'PENDING';
