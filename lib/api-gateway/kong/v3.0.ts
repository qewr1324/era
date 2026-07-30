export function generate(params: any): string {
	return `_format_version: "3.0"

services:
  - name: user-service
    url: http://user-service:8080
    routes:
      - name: user-route
        paths:
          - /api/users
        strip_path: false

  - name: product-service
    url: http://product-service:8080
    routes:
      - name: product-route
        paths:
          - /api/products
        strip_path: false

plugins:
  - name: rate-limiting
    service: user-service
    config:
      minute: 100
      hour: 1000

  - name: cors
    config:
      origins:
        - "*"
      methods:
        - GET
        - POST
        - PUT
        - DELETE
      headers:
        - Accept
        - Authorization
        - Content-Type`;
}
