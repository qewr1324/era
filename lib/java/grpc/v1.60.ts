export function generate(params: any): string {
	return `syntax = "proto3";

package com.example.api;

option java_multiple_files = true;
option java_package = "com.example.api.grpc";
option java_outer_classname = "MyServiceProto";

service UserService {
    rpc GetUser (GetUserRequest) returns (UserResponse) {}
    rpc ListUsers (ListUsersRequest) returns (stream UserResponse) {}
    rpc CreateUser (CreateUserRequest) returns (UserResponse) {}
    rpc UpdateUser (UpdateUserRequest) returns (UserResponse) {}
    rpc DeleteUser (DeleteUserRequest) returns (DeleteUserResponse) {}
}

service ProductService {
    rpc GetProduct (GetProductRequest) returns (ProductResponse) {}
    rpc ListProducts (ListProductsRequest) returns (stream ProductResponse) {}
    rpc CreateProduct (CreateProductRequest) returns (ProductResponse) {}
}

message User {
    int64 id = 1;
    string username = 2;
    string email = 3;
    string first_name = 4;
    string last_name = 5;
    Role role = 6;
    bool is_active = 7;
    int64 created_at = 8;
    int64 updated_at = 9;
}

enum Role {
    USER = 0;
    ADMIN = 1;
    MODERATOR = 2;
}

message GetUserRequest {
    int64 id = 1;
}

message ListUsersRequest {
    int32 page = 1;
    int32 limit = 2;
}

message CreateUserRequest {
    string username = 1;
    string email = 2;
    string password = 3;
    string first_name = 4;
    string last_name = 5;
    Role role = 6;
}

message UpdateUserRequest {
    int64 id = 1;
    string username = 2;
    string email = 3;
    string first_name = 4;
    string last_name = 5;
    Role role = 6;
}

message DeleteUserRequest {
    int64 id = 1;
}

message DeleteUserResponse {
    bool success = 1;
}

message UserResponse {
    User user = 1;
}

message Product {
    int64 id = 1;
    string name = 2;
    string description = 3;
    double price = 4;
    int32 quantity = 5;
    bool in_stock = 6;
    int64 created_at = 7;
    int64 updated_at = 8;
}

message GetProductRequest {
    int64 id = 1;
}

message ListProductsRequest {
    int32 page = 1;
    int32 limit = 2;
    string category = 3;
}

message CreateProductRequest {
    string name = 1;
    string description = 2;
    double price = 3;
    int32 quantity = 4;
}

message ProductResponse {
    Product product = 1;
}`;
}
