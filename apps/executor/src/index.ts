import { Kafka } from "kafkajs";

const KAFKA_CLIENT_ID = "executor";
const KAFKA_BROKERS = ["localhost:9092"];
const KAFKA_TOPIC = "events";

const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS,
  connectionTimeout: 30_000,
  requestTimeout: 30_000,
});

async function runExecutor() {
  console.log("Executor is running");
  const consumer = kafka.consumer({ groupId: "executor-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log({
          partition,
          offset: message.offset,
          value: message?.value?.toString(),
        });

        await new Promise((res) => setTimeout(res, 5000));

        console.log(
          `Processed message: ${topic}[${partition}] offset ${message.offset}`,
        );

        await consumer.commitOffsets([
          {
            topic: topic,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString(),
          },
        ]);
      } catch (error) {
        console.error(
          `Error processing message at offset ${message.offset}:`,
          error,
        );
        // You can implement DLQ (Dead Letter Queue) logic here
        throw error;
      }
    },
  });

  const shutdown = async () => {
    console.log("Shutting down executor...");
    await consumer.disconnect();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

runExecutor().catch(console.error);
