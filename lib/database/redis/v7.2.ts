export function generate(params: any): string {
	return `# Redis configuration
bind 127.0.0.1
port 6379
daemonize no
pidfile /var/run/redis_6379.pid
loglevel notice
logfile ""

databases 16

# RDB persistence
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir ./

# AOF persistence
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

# Security
requirepass your-redis-password

# Limits
maxmemory 256mb
maxmemory-policy allkeys-lru
maxclients 10000

# Slow log
slowlog-log-slower-than 10000
slowlog-max-len 128

# Latency monitor
latency-monitor-threshold 0`;
}
