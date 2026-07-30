export function generate(params: any): string {
	return `listeners.tcp.default = 5672
management.tcp.port = 15672

default_user = admin
default_pass = admin

default_vhost = /
default_permissions.configure = .*
default_permissions.read = .*
default_permissions.write = .*

queue_master_locator = min-masters

disk_free_limit.absolute = 2GB

vm_memory_high_watermark.relative = 0.7

channel_max = 2000

heartbeat = 60

log.file.level = info`;
}
