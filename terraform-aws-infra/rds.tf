# Create DB subnet group using the public subnet from main.tf
resource "aws_db_subnet_group" "main" {
  name       = "main-db-subnet-group"
  subnet_ids = [aws_subnet.public.id]

  tags = {
    Name = "main-db-subnet-group"
  }
}

# Create security group for RDS that allows PostgreSQL access from EC2 security group
resource "aws_security_group" "rds" {
  name        = "rds-sg"
  description = "Security group for RDS PostgreSQL instance"
  vpc_id      = aws_vpc.main.id

  # PostgreSQL access from EC2 security group
  ingress {
    description     = "PostgreSQL from EC2"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.main.id]
  }

  # All outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg"
  }
}

# Create RDS PostgreSQL instance
resource "aws_db_instance" "main" {
  identifier = "main-postgres-db"

  engine         = "postgres"
  engine_version = "15"
  instance_class = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = false

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  publicly_accessible = true

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  skip_final_snapshot = true

  tags = {
    Name = "main-postgres-db"
  }
}

# Output RDS endpoint
output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.main.endpoint
}

# Output RDS port
output "rds_port" {
  description = "RDS PostgreSQL port"
  value       = aws_db_instance.main.port
} 