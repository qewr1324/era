export function generate(params: any): string {
	return `example.com {
    root * /var/www/html
    file_server
    
    encode gzip zstd
    
    header {
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
    }
    
    handle /api/* {
        reverse_proxy localhost:8080
    }
    
    handle {
        try_files {path} /index.html
    }
    
    log {
        output file /var/log/caddy/access.log
    }
}`;
}
