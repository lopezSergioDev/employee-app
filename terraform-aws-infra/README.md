# AWS Infrastructure with Terraform

This Terraform configuration creates a complete AWS infrastructure with the following components:

## Infrastructure Components

- **VPC**: Custom VPC with CIDR block `10.0.0.0/16`
- **Public Subnet**: Subnet with CIDR block `10.0.1.0/24` in us-east-1a
- **Internet Gateway**: Attached to the VPC for internet access
- **Route Table**: Routes all traffic (0.0.0.0/0) to the Internet Gateway
- **DB Subnet Group**: For RDS instance placement
- **Security Groups**: 
  - EC2: Allows SSH (port 22), HTTP (port 80), and Spring Boot (port 8080) access
  - RDS: Allows PostgreSQL (port 5432) access from EC2 security group only
- **IAM Roles**: EC2 instance profile with RDS access permissions
- **EC2 Instance**: Amazon Linux 2 instance with Java 17 and Spring Boot environment
- **RDS PostgreSQL Instance**: PostgreSQL 15 database with 20GB storage
- **MongoDB Atlas**: Configuration for managed MongoDB cluster
- **Key Pair**: Generated for SSH access to the EC2 instance

## Prerequisites

1. **AWS CLI**: Install and configure AWS CLI with appropriate credentials
2. **Terraform**: Install Terraform (version 1.0 or later)
3. **AWS Permissions**: Ensure your AWS credentials have permissions to create:
   - VPC and related networking resources
   - EC2 instances and security groups
   - Key pairs

## Usage

### 1. Initialize Terraform
```bash
terraform init
```

### 2. Review the Plan
```bash
terraform plan
```

### 3. Apply the Configuration
```bash
terraform apply
```

### 4. Access the EC2 Instance

After successful deployment, you can:

**SSH into the instance:**
```bash
# Get the private key from Terraform output
terraform output -raw private_key > private_key.pem
chmod 400 private_key.pem

# SSH into the instance
ssh -i private_key.pem ec2-user@$(terraform output -raw public_ip)
```

**Access the web server:**
- Open your browser and navigate to: `http://$(terraform output -raw public_ip)`
- You should see "Hello from Terraform!" message

### 5. Clean Up
```bash
terraform destroy
```

## Configuration

You can customize the infrastructure by modifying the `terraform.tfvars` file:

- `aws_region`: AWS region (default: us-east-1)
- `vpc_cidr`: VPC CIDR block (default: 10.0.0.0/16)
- `subnet_cidr`: Subnet CIDR block (default: 10.0.1.0/24)
- `instance_type`: EC2 instance type (default: t2.micro)
- `key_name`: Key pair name (default: main-key)

## Security Notes

- The security group allows SSH and HTTP access from anywhere (0.0.0.0/0)
- For production use, consider restricting SSH access to specific IP ranges
- The EC2 instance runs Apache web server with a simple "Hello World" page
- The private key is generated automatically and marked as sensitive

## Outputs

- `public_ip`: Public IP address of the EC2 instance
- `private_key`: Private key for SSH access (sensitive)
- `rds_endpoint`: RDS PostgreSQL endpoint
- `rds_port`: RDS PostgreSQL port
- `mongodb_connection_string`: MongoDB Atlas connection string (sensitive)
- `mongodb_cluster_info`: MongoDB Atlas cluster information

## File Structure

```
.
├── main.tf          # Main Terraform configuration (VPC, EC2, networking)
├── rds.tf           # RDS PostgreSQL configuration
├── iam.tf           # IAM roles and policies
├── mongodb.tf       # MongoDB Atlas configuration
├── variables.tf     # Variable definitions
├── terraform.tfvars # Variable values
├── .gitignore       # Git ignore file
└── README.md        # This file
``` 