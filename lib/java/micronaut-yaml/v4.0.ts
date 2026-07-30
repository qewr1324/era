export function generate(params: any): string {
	return `micronaut:
  application:
    name: my-application
  server:
    port: 8080
    cors:
      enabled: true
    http-version: 2.0
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
    url: jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: root
    driverClassName: com.mysql.cj.jdbc.Driver
    dialect: MYSQL
    hikari:
      maximum-pool-size: 20
      minimum-idle: 10
      idle-timeout: 300000
      connection-timeout: 20000
      max-lifetime: 1200000

jpa:
  default:
    properties:
      hibernate:
        hbm2ddl:
          auto: update
        show_sql: false
        format_sql: true
        jdbc:
          batch_size: 25
          fetch_size: 25
    entity-scan:
      packages:
        - com.example.entity

netty:
  default:
    allocator:
      max-order: 3

jackson:
  serialization:
    writeDatesAsTimestamps: false
    serializationInclusion: NON_NULL
  dateFormat: yyyy-MM-dd HH:mm:ss

logger:
  levels:
    root: INFO
    com.example: DEBUG
    io.micronaut: DEBUG

endpoints:
  health:
    enabled: true
    sensitive: false
    details-visible: ANONYMOUS
  metrics:
    enabled: true
    sensitive: false
  beans:
    enabled: true
    sensitive: false
  env:
    enabled: true
    sensitive: false

micronaut:
  metrics:
    enabled: true
    export:
      prometheus:
        enabled: true
        step: PT1M
        descriptions: true`;
}
