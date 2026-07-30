export function generate(params: any): string {
	return `jobmanager.rpc.address: localhost
jobmanager.rpc.port: 6123
jobmanager.memory.process.size: 1600m

taskmanager.memory.process.size: 1728m
taskmanager.numberOfTaskSlots: 4

parallelism.default: 4

execution.checkpointing.interval: 60000
execution.checkpointing.mode: EXACTLY_ONCE
execution.checkpointing.timeout: 600000

state.backend: rocksdb
state.checkpoints.dir: file:///tmp/flink-checkpoints

rest.port: 8081
rest.address: 0.0.0.0`;
}
