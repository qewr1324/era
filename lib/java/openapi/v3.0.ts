export function generate(params: any): string {
	return `openapi: 3.0.3
info:
  title: My Application API
  description: REST API for My Application
  version: 1.0.0
  contact:
    name: Developer
    email: dev@example.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: http://localhost:8080/api
    description: Development Server
  - url: https://api.example.com/v1
    description: Production Server

tags:
  - name: users
    description: User management endpoints
  - name: products
    description: Product management endpoints

paths:
  /users:
    get:
      tags:
        - users
      summary: Get all users
      operationId: getUsers
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      tags:
        - users
      summary: Create a new user
      operationId: createUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserInput'
      responses:
        '201':
          description: User created successfully
        '400':
          description: Invalid input
          
  /users/{id}:
    get:
      tags:
        - users
      summary: Get user by ID
      operationId: getUserById
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
    put:
      tags:
        - users
      summary: Update user
      operationId: updateUser
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserInput'
      responses:
        '200':
          description: User updated successfully
        '404':
          description: User not found
    delete:
      tags:
        - users
      summary: Delete user
      operationId: deleteUser
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: User deleted successfully
        '404':
          description: User not found

  /products:
    get:
      tags:
        - products
      summary: Get all products
      operationId: getProducts
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'
    post:
      tags:
        - products
      summary: Create a new product
      operationId: createProduct
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductInput'
      responses:
        '201':
          description: Product created successfully
        '400':
          description: Invalid input

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
        username:
          type: string
        email:
          type: string
          format: email
        firstName:
          type: string
        lastName:
          type: string
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - username
        - email
        
    UserInput:
      type: object
      properties:
        username:
          type: string
          minLength: 3
          maxLength: 50
        email:
          type: string
          format: email
        firstName:
          type: string
        lastName:
          type: string
        password:
          type: string
          format: password
          minLength: 8
      required:
        - username
        - email
        - password
        
    Product:
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        description:
          type: string
        price:
          type: number
          format: double
        category:
          type: string
        inStock:
          type: boolean
      required:
        - id
        - name
        - price
        
    ProductInput:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        price:
          type: number
          format: double
          minimum: 0
        category:
          type: string
        inStock:
          type: boolean
      required:
        - name
        - price

    Error:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        timestamp:
          type: string
          format: date-time

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

security:
  - bearerAuth: []`;
}
