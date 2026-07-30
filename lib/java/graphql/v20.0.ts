export function generate(params: any): string {
	return `type Query {
    users: [User!]!
    user(id: ID!): User
    products(category: String, limit: Int = 10): [Product!]!
    product(id: ID!): Product
}

type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
}

type User {
    id: ID!
    username: String!
    email: String!
    firstName: String
    lastName: String
    role: Role!
    isActive: Boolean!
    posts: [Post!]
    createdAt: String!
    updatedAt: String!
}

type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    author: User!
    tags: [Tag!]
    createdAt: String!
    updatedAt: String!
}

type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    quantity: Int!
    category: Category
    inStock: Boolean!
    createdAt: String!
    updatedAt: String!
}

type Category {
    id: ID!
    name: String!
    products: [Product!]
}

type Tag {
    id: ID!
    name: String!
}

enum Role {
    USER
    ADMIN
    MODERATOR
}

input CreateUserInput {
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    role: Role = USER
}

input UpdateUserInput {
    username: String
    email: String
    firstName: String
    lastName: String
    role: Role
}

input CreateProductInput {
    name: String!
    description: String
    price: Float!
    quantity: Int = 0
    categoryId: ID
}

input UpdateProductInput {
    name: String
    description: String
    price: Float
    quantity: Int
    categoryId: ID
}

schema {
    query: Query
    mutation: Mutation
}`;
}
