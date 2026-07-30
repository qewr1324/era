export function generate(params: any): string {
	return `asyncapi: '2.6.0'
info:
  title: My App Events
  version: '1.0.0'
  description: Event-driven architecture for My App

servers:
  production:
    url: kafka.example.com:9092
    protocol: kafka
    description: Production Kafka broker

channels:
  user/created:
    description: Event triggered when a new user is created
    publish:
      summary: Inform about new user registration
      message:
        payload:
          type: object
          properties:
            id:
              type: integer
            username:
              type: string
            email:
              type: string
            createdAt:
              type: string
              format: date-time

  order/placed:
    description: Event triggered when an order is placed
    publish:
      summary: Inform about new order
      message:
        payload:
          type: object
          properties:
            orderId:
              type: string
            userId:
              type: integer
            total:
              type: number
            items:
              type: array
              items:
                type: object
                properties:
                  productId:
                    type: integer
                  quantity:
                    type: integer
                  price:
                    type: number`;
}
