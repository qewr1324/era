export function generate(params: any): string {
	return `# Micronaut Configuration
micronaut.application.name=my-app
micronaut.server.port=8080

# Database Configuration
datasources.default.db-type=mysql
datasources.default.dialect=MYSQL
datasources.default.driver-class-name=com.mysql.cj.jdbc.Driver
datasources.default.url=jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC
datasources.default.username=root
datasources.default.password=root
datasources.default.pool.minimum-idle=5
datasources.default.pool.maximum-size=20

# Hibernate
jpa.default.properties.hibernate.hbm2ddl.auto=update
jpa.default.properties.hibernate.show-sql=false
jpa.default.properties.hibernate.format-sql=true
jpa.default.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Logging
logger.levels.root=INFO
logger.levels.com.example=DEBUG

# Endpoints
endpoints.health.enabled=true
endpoints.metrics.enabled=true
endpoints.prometheus.enabled=true

# Security
micronaut.security.enabled=true
micronaut.security.authentication=bearer

# HTTP Client
micronaut.http.client.read-timeout=30s
micronaut.http.client.connect-timeout=10s

# CORS
micronaut.server.cors.enabled=true
micronaut.server.cors.configurations.web.allowed-origins=*
micronaut.server.cors.configurations.web.allowed-methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
micronaut.server.cors.configurations.web.allowed-headers=accept,authorization,content-type

# Cache
micronaut.caches.my-cache.maximum-size=100
micronaut.caches.my-cache.expire-after-write=60m

# Tracing
tracing.jaeger.enabled=true
tracing.jaeger.sampler-probability=1.0
`;
}
