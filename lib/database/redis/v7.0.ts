export function generate(params: any): string {
	return `bind 127.0.0.1
port 6379
daemonize no

save 900 1
save 300 10
save 60 10000

dbfilename dump.rdb
dir ./

requirepass your-redis-password
maxmemory 256mb
maxmemory-policy allkeys-lru`;
}
