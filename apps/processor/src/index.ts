import { prisma } from "@repo/db";
import { Kafka } from "kafkajs";

const KAFKA_CLIENT_ID = "outbox-processor";
const KAFKA_BROKERS = ["localhost:9092"];
const KADKA_TOPIC = "events";

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

async function processZaps() {
  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    const pendingZaps = await prisma.zapRunOutbox.findMany({
      // where: {processed: false},
      take: 10,
    });
    // pendingZaps.array.forEach((element) => {
    //   element;
    // producer.sendBatch
    await producer.send({
      topic: KADKA_TOPIC,
      messages: pendingZaps?.map((row: ZapRunOutbox) => {
        return {
          //   key: row.id,
          value: row.zapRunId,
        };
      }),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingZaps.map((r: ZapRunOutbox) => r.id),
        },
      },
    });
  }
}

processZaps();
