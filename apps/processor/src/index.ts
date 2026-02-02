import { prisma } from "@repo/db";
import { Kafka, Partitioners } from "kafkajs";

const KAFKA_CLIENT_ID = "outbox-processor";
const KAFKA_BROKERS = ["localhost:9092"];
const KAFKA_TOPIC = "events";

const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS,
  connectionTimeout: 30_000,
  requestTimeout: 30_000,
});

interface ZapRunOutbox {
  id: string;
  zapRunId: string;
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

let isShuttingDown = false;

async function processZaps() {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    retry: {
      retries: 10,
      initialRetryTime: 500,
      maxRetryTime: 5000,
    },
  });

  await producer.connect();
  console.log("Outbox processor connected");

  while (!isShuttingDown) {
    try {
      const pendingZaps = await prisma.zapRunOutbox.findMany({
        take: 10,
      });

      if (pendingZaps.length === 0) {
        await sleep(1000);
        continue;
      }

      await producer.send({
        topic: KAFKA_TOPIC,
        messages: pendingZaps.map((row: ZapRunOutbox) => ({
          key: row.id,
          value: JSON.stringify({ zapRunId: row.zapRunId }),
        })),
      });

      await prisma.zapRunOutbox.deleteMany({
        where: {
          id: {
            in: pendingZaps.map((r: ZapRunOutbox) => r.id),
          },
        },
      });

      console.log(`Processed ${pendingZaps.length} zaps`);
      await sleep(100);
    } catch (error) {
      console.error("Error processing batch:", error);
      await sleep(5000);
    }
  }

  await producer.disconnect();
  console.log("Outbox processor disconnected");
}

process.on("SIGINT", () => {
  console.log("Shutting down outbox processor...");
  isShuttingDown = true;
});

process.on("SIGTERM", () => {
  console.log("Shutting down outbox processor...");
  isShuttingDown = true;
});

processZaps().catch(console.error);
