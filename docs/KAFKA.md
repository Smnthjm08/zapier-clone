# Kafka Setup

docker run -p 9092:9092 --name zapier-clone apache/kafka:latest

docker exec -it zapier-clone /bin/bash

cd /opt/kafka/bin/

./kafka-topics.sh --create --topic events --bootstrap-server localhost:9092

./kafka-console-consumer.sh --topic events --from-beginning --bootstrap-server localhost:9092

./kafka-console-producer.sh --topic events --bootstrap-server localhost:9092
