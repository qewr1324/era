export function generate(params: any): string {
	return `micronaut:
  application:
    name: my-application
  server:
    port: 8080
    cors:
      enabled: true
  router:
    static-resources:
      swagger:
        paths: classpath:META-INF/swagger
        mapping: /swagger/**
      swagger-ui:
        paths: classpath:META-INF/swagger/views/swagger-ui
        mapping: /swagger-ui/**

datasources:
  default:
    url: jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC
    username: root
    password: root
    driverClassName: com.mysql.cj.jdbc.Driver
    dialect: MYSQL
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5

jpa:
  default:
    properties:
      hibernate:
        hbm2ddl:
          auto: update
        show_sql: true
        format_sql: true

netty:
  default:
    allocator:
      max-order: 3

jackson:
  serialization:
    writeDatesAsTimestamps: false
  dateFormat: yyyy-MM-dd HH:mm:ss

logger:
  levels:
    root: INFO
    com.example: DEBUG

endpoints:
  health:
    enabled: true
    sensitive: false
    details-visible: ANONYMOUS
  metrics:
    enabled: true
    sensitive: false`;
}
