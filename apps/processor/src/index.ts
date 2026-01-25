import { prisma } from "@repo/db";
import { Kafka } from "kafkajs";

const KAFKA_TOPIC = "zap-events";

const kafka = new Kafka({
  clientId: "processor",
  brokers: ["localhost:9092"],
});

interface ZapRunOutbox {
  id: string;
  zapRunId: string;
}

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    try {
      const pendingExecution = await prisma.zapRunOutbox.findMany({
        where: {},
        take: 10,
      });

      // pendingExecution.forEach(element => {
      //     producer.send({
      //         topic: KAFKA_TOPIC,
      //         messages: [{
      //             value: JSON.stringify(element),

      //         }],
      //     })
      // });

      producer.send({
        topic: KAFKA_TOPIC,
        messages: [
          pendingExecution.map((r: ZapRunOutbox) => ({
            value: JSON.stringify(r.zapRunId),
          })),
        ],
      });

      await prisma.zapRunOutbox.deleteMany({
        where: {
          id: {
            in: pendingExecution.map((r: ZapRunOutbox) => r.id),
          },
        },
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

main();
