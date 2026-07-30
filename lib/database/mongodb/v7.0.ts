export function generate(params: any): string {
	return `// Connect to database
db = db.getSiblingDB('mydb');

// Create users collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'password_hash'],
      properties: {
        username: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'must be a valid email and is required'
        },
        role: {
          enum: ['user', 'admin', 'moderator'],
          description: 'can only be one of the enum values'
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

// Insert sample users
db.users.insertMany([
  {
    username: 'admin',
    email: 'admin@example.com',
    password_hash: '$2a$10$...',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'john_doe',
    email: 'john@example.com',
    password_hash: '$2a$10$...',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create products collection
db.createCollection('products');

db.products.createIndex({ name: 1 });
db.products.createIndex({ category: 1 });

db.products.insertMany([
  {
    name: 'Product 1',
    description: 'Description for product 1',
    price: 19.99,
    stock: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product 2',
    description: 'Description for product 2',
    price: 29.99,
    stock: 50,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialization completed successfully!');`;
}
