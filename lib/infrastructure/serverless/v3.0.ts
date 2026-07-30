export function generate(params: any): string {
	return `service: my-api

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: \${opt:stage, 'dev'}
  environment:
    STAGE: \${self:provider.stage}
    DB_HOST: \${env:DB_HOST}
    DB_NAME: \${env:DB_NAME}
    DB_USER: \${env:DB_USER}
    DB_PASSWORD: \${env:DB_PASSWORD}
  
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:Query
            - dynamodb:Scan
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
          Resource: "arn:aws:dynamodb:\${aws:region}:*:table/*"

functions:
  api:
    handler: src/index.handler
    events:
      - http:
          path: /{proxy+}
          method: any
          cors: true

  getUsers:
    handler: src/handlers/users.getUsers
    events:
      - http:
          path: /api/users
          method: get
          cors: true

  createUser:
    handler: src/handlers/users.createUser
    events:
      - http:
          path: /api/users
          method: post
          cors: true

plugins:
  - serverless-offline
  - serverless-dotenv-plugin

custom:
  serverless-offline:
    httpPort: 3000`;
}
