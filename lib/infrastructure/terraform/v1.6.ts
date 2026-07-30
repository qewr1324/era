export function generate(params: any): string {
	return `terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name        = "main-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "\${var.aws_region}a"
  
  tags = {
    Name = "public-subnet"
  }
}

resource "aws_ecs_cluster" "main" {
  name = "my-app-cluster"
}

resource "aws_ecs_service" "app" {
  name            = "my-app-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 3
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets         = [aws_subnet.public.id]
    security_groups = [aws_security_group.app.id]
  }
}

resource "aws_db_instance" "main" {
  allocated_storage    = 20
  engine              = "postgres"
  engine_version      = "16.1"
  instance_class      = "db.t3.micro"
  db_name             = "mydb"
  username            = var.db_username
  password            = var.db_password
  skip_final_snapshot = true
}`;
}
