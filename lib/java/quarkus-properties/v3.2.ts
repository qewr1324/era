export function generate(params: any): string {
	return `# Quarkus Configuration
quarkus.application.name=my-application
quarkus.http.port=8080
quarkus.http.cors=true
quarkus.http.cors.origins=*
quarkus.http.cors.methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
quarkus.http.cors.headers=accept,authorization,content-type,x-requested-with

# Database Configuration
quarkus.datasource.db-kind=mysql
quarkus.datasource.username=root
quarkus.datasource.password=root
quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
quarkus.datasource.jdbc.max-size=20
quarkus.datasource.jdbc.min-size=5
quarkus.datasource.jdbc.idle-removal-interval=5M

# Hibernate Configuration
quarkus.hibernate-orm.database.generation=update
quarkus.hibernate-orm.log.sql=false
quarkus.hibernate-orm.log.format-sql=true
quarkus.hibernate-orm.sql-load-script=import.sql
quarkus.hibernate-orm.dialect=org.hibernate.dialect.MySQL8Dialect
quarkus.hibernate-orm.jdbc.statement-batch-size=25
quarkus.hibernate-orm.jdbc.timezone=UTC

# Cache
quarkus.cache.caffeine.initial-capacity=50
quarkus.cache.caffeine.maximum-size=500
quarkus.cache.caffeine.expire-after-write=60M

# Logging
quarkus.log.level=INFO
quarkus.log.console.format=%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n
quarkus.log.file.enable=true
quarkus.log.file.path=logs/quarkus.log
quarkus.log.file.format=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p [%c{3.}] (%t) %s%e%n
quarkus.log.file.rotation.max-file-size=10M
quarkus.log.file.rotation.max-backup-index=10

# Health
quarkus.health.extensions.enabled=true

# Metrics
quarkus.micrometer.export.prometheus.enabled=true
quarkus.micrometer.export.prometheus.path=/metrics

# OpenAPI
quarkus.swagger-ui.always-include=true
quarkus.swagger-ui.path=/swagger-ui
quarkus.smallrye-openapi.path=/openapi

# Security
quarkus.http.auth.permission.authenticated.paths=/*
quarkus.http.auth.permission.authenticated.policy=authenticated`;
}
