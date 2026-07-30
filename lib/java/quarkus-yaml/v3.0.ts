// lib/java/quarkus-yaml/v3.0.ts
export function generate(params: any): string {
	return `quarkus:
  application:
    name: my-application
  http:
    port: 8080
    cors:
      ~: true
      origins: "*"
      methods: GET,POST,PUT,DELETE,OPTIONS,PATCH
      headers: accept,authorization,content-type,x-requested-with
      exposed-headers: location,link
  datasource:
    db-kind: mysql
    username: root
    password: root
    jdbc:
      url: jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC
      max-size: 20
      min-size: 5
  hibernate-orm:
    database:
      generation: validate
    log:
      sql: false
      format-sql: true
    statistics: true
    dialect: org.hibernate.dialect.MySQL8Dialect
  log:
    level: INFO
    console:
      format: "%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n"
    file:
      enable: true
      path: logs/quarkus.log
      rotation:
        max-file-size: 10M
        max-backup-index: 10
  swagger-ui:
    always-include: true
    path: /swagger-ui
  smallrye-openapi:
    path: /openapi
  health:
    extensions:
      enabled: true
  micrometer:
    export:
      prometheus:
        enabled: true
        path: /metrics
  redis:
    hosts: redis://localhost:6379
    timeout: 10s
    max-pool-size: 10
  cache:
    caffeine:
      initial-capacity: 50
      maximum-size: 1000
      expire-after-write: 60M
  grpc:
    server:
      port: 9000
  scheduler:
    start-mode: forced
`;
}
