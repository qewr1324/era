export function generate(params: any): string {
	return `broker.id=1

listeners=PLAINTEXT://localhost:9092

num.network.threads=3
num.io.threads=8

socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600

log.dirs=/tmp/kafka-logs

num.partitions=3

default.replication.factor=3

min.insync.replicas=2

log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000

zookeeper.connect=localhost:2181
zookeeper.connection.timeout.ms=18000

group.initial.rebalance.delay.ms=0

offsets.topic.replication.factor=3
transaction.state.log.replication.factor=3
transaction.state.log.min.isr=2`;
}
