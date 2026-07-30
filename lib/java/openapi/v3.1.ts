export function generate(params: any): string {
	return `openapi: 3.1.0
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
  summary: A sample API using OpenAPI 3.1

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
      description: Returns a list of all users
      operationId: getUsers
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 10
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
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
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Invalid input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

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
            format: int64
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
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
            format: int64
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserInput'
      responses:
        '200':
          description: User updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
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
            format: int64
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
      parameters:
        - name: category
          in: query
          schema:
            type: string
        - name: inStock
          in: query
          schema:
            type: boolean
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
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Product'
        '400':
          description: Invalid input

  /products/{id}:
    get:
      tags:
        - products
      summary: Get product by ID
      operationId: getProductById
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Product'
        '404':
          description: Product not found
    put:
      tags:
        - products
      summary: Update product
      operationId: updateProduct
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductInput'
      responses:
        '200':
          description: Product updated successfully
        '404':
          description: Product not found
    delete:
      tags:
        - products
      summary: Delete product
      operationId: deleteProduct
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '204':
          description: Product deleted successfully
        '404':
          description: Product not found

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
          minLength: 3
          maxLength: 50
        email:
          type: string
          format: email
        firstName:
          type: string
        lastName:
          type: string
        role:
          type: string
          enum: [user, admin, moderator]
        isActive:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
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
        role:
          type: string
          enum: [user, admin, moderator]
          default: user
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
          minimum: 0
        category:
          type: string
        inStock:
          type: boolean
        quantity:
          type: integer
          minimum: 0
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
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
          default: true
        quantity:
          type: integer
          minimum: 0
          default: 0
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
        details:
          type: string
        timestamp:
          type: string
          format: date-time
        path:
          type: string
      required:
        - code
        - message

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Enter JWT token
      
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: API Key for authentication
      
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://api.example.com/oauth/authorize
          tokenUrl: https://api.example.com/oauth/token
          scopes:
            read:users: Read users
            write:users: Modify users
            read:products: Read products
            write:products: Modify products

security:
  - bearerAuth: []
  - apiKeyAuth: []`;
}
