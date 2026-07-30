export function generate(params: any): string {
	return `spring:
  application:
    name: my-service
  cloud:
    config:
      uri: http://localhost:8888
    discovery:
      enabled: true

eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/`;
}
