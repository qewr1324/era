export function generate(params: any): string {
	return `spring:
  application:
    name: my-service
  cloud:
    config:
      uri: http://localhost:8888
      fail-fast: true
      retry:
        max-attempts: 6
        initial-interval: 1000
    consul:
      host: localhost
      port: 8500
      discovery:
        instanceId: \${spring.application.name}:\${random.value}
        healthCheckPath: /actuator/health
    vault:
      host: localhost
      port: 8200
      scheme: http
      authentication: TOKEN
      token: \${VAULT_TOKEN}
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/products/**

eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
  instance:
    preferIpAddress: true`;
}
