# MongoDB Atlas Configuration
# Note: MongoDB Atlas is a managed service, so we'll create configuration
# for connecting to an existing Atlas cluster or provide setup instructions

# Variables for MongoDB Atlas
variable "mongodb_atlas_org_id" {
  description = "MongoDB Atlas Organization ID"
  type        = string
  default     = ""
}

variable "mongodb_atlas_project_id" {
  description = "MongoDB Atlas Project ID"
  type        = string
  default     = ""
}

variable "mongodb_atlas_cluster_name" {
  description = "MongoDB Atlas Cluster Name"
  type        = string
  default     = "springboot-cluster"
}

variable "mongodb_atlas_username" {
  description = "MongoDB Atlas Database Username"
  type        = string
  default     = "admin"
}

variable "mongodb_atlas_password" {
  description = "MongoDB Atlas Database Password"
  type        = string
  default     = ""
  sensitive   = true
}

# Output MongoDB connection string (for application configuration)
output "mongodb_connection_string" {
  description = "MongoDB Atlas Connection String"
  value       = "mongodb+srv://${var.mongodb_atlas_username}:${var.mongodb_atlas_password}@${var.mongodb_atlas_cluster_name}.mongodb.net/springboot?retryWrites=true&w=majority"
  sensitive   = true
}

# Output MongoDB cluster information
output "mongodb_cluster_info" {
  description = "MongoDB Atlas Cluster Information"
  value = {
    cluster_name = var.mongodb_atlas_cluster_name
    project_id   = var.mongodb_atlas_project_id
    org_id       = var.mongodb_atlas_org_id
  }
} 