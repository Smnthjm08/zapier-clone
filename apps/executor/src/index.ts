import { Kafka } from "kafkajs";

const KAFKA_CLIENT_ID = "outbox-processor";
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

  while (true) {
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log({
          partition,
          offset: message.offset,
          value: message?.value?.toString(),
        });

        await new Promise((res) => setTimeout(res, 5000));

        console.log(
          `Processed message: ${prefix} - ${message.value?.toString()}`,
        );

        await consumer.commitOffsets([
          {
            topic: KAFKA_TOPIC,
            partition: 0,
            offset: message.offset,
          },
        ]);
      },
    });
  }
}

runExecutor().catch(console.error);
