# Create IAM role for EC2 instance
resource "aws_iam_role" "ec2_role" {
  name = "ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "ec2-role"
  }
}

# Create IAM policy for EC2 to access RDS
resource "aws_iam_policy" "rds_access_policy" {
  name        = "rds-access-policy"
  description = "Policy for EC2 to access RDS"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "rds:DescribeDBInstances",
          "rds:DescribeDBClusters"
        ]
        Resource = "*"
      }
    ]
  })
}

# Attach policy to role
resource "aws_iam_role_policy_attachment" "ec2_rds_policy" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = aws_iam_policy.rds_access_policy.arn
}

# Create instance profile
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2-profile"
  role = aws_iam_role.ec2_role.name
} 