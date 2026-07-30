export function generate(params: any): string {
	return `ServerRoot "/usr/local/apache2"
Listen 80

LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so

User www
Group www

ServerAdmin admin@example.com
ServerName localhost:80

DocumentRoot "/var/www/html"

<Directory "/var/www/html">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

<VirtualHost *:80>
    ServerName api.example.com
    
    ProxyPass /api http://localhost:8080/api
    ProxyPassReverse /api http://localhost:8080/api
</VirtualHost>

ErrorLog "/var/log/httpd/error_log"
CustomLog "/var/log/httpd/access_log" common`;
}
