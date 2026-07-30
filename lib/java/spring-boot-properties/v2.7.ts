// lib/java/spring-boot-properties/v2.7.ts
export function generate(params: any): string {
	return `# Server Configuration
server.port=8080
server.servlet.context-path=/api
server.compression.enabled=true

# Application
spring.application.name=my-application

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Logging
logging.level.root=INFO
logging.level.com.example=DEBUG
logging.file.name=logs/application.log

# Actuator
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always

# Cache
spring.cache.type=caffeine

# Security
spring.security.user.name=admin
spring.security.user.password=admin

# Thymeleaf (Spring Boot 2.x)
spring.thymeleaf.cache=false

# DevTools
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true
`;
}
