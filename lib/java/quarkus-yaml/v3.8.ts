// lib/java/quarkus-yaml/v3.8.ts
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
    auth:
      permission:
        authenticated:
          paths: /*
          policy: authenticated
  datasource:
    db-kind: mysql
    username: root
    password: root
    jdbc:
      url: jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
      max-size: 20
      min-size: 5
      idle-removal-interval: 5M
      transaction-isolation: read-committed
  hibernate-orm:
    database:
      generation: validate
    log:
      sql: false
      format-sql: true
    statistics: true
    dialect: org.hibernate.dialect.MySQL8Dialect
    jdbc:
      statement-batch-size: 50
      timezone: UTC
  log:
    level: INFO
    console:
      format: "%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n"
    file:
      enable: true
      path: logs/quarkus.log
      format: "%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p [%c{3.}] (%t) %s%e%n"
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
  rest-client:
    scope: javax.inject.Singleton
    connect-timeout: 5000
    read-timeout: 30000
    multipart-post-max-chunk-size: 8192
  devservices:
    enabled: true
  native:
    additional-build-args: --enable-url-protocols=http,https
    resources:
      includes: messages_*
  kubernetes-config:
    enabled: true
    secrets: my-secret
  websocket:
    max-frame-size: 1048576
`;
}
