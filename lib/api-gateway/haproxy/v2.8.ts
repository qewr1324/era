export function generate(params: any): string {
	return `global
    log /dev/log local0
    maxconn 4096
    user haproxy
    group haproxy
    daemon

defaults
    log global
    mode http
    option httplog
    option dontlognull
    retries 3
    timeout connect 5000
    timeout client 50000
    timeout server 50000

frontend http-in
    bind *:80
    default_backend app-servers
    
    acl is_api path_beg /api
    use_backend api-servers if is_api

backend app-servers
    balance roundrobin
    server app1 app1.example.com:3000 check
    server app2 app2.example.com:3000 check

backend api-servers
    balance leastconn
    server api1 api1.example.com:8080 check
    server api2 api2.example.com:8080 check`;
}
