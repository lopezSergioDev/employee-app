## Employee Full Stack App

A complete full-stack employee management application built for assessment purposes using:

- **Java Spring Boot** – Backend (REST API + JWT Security)
- **React (Vite)** – Frontend UI
- **PostgreSQL** – Primary relational database (via AWS RDS)
- **MongoDB** – For activity logging (local or MongoDB Atlas)
- **Terraform** – Infrastructure provisioning on AWS
- **JWT** – Authentication and authorization

 ## Folder Structure
  employee-app/
├── employeeapp/               # Backend Java Spring Boot app (employeeapp)
├── employee-frontend/              # React + Vite frontend
├── terraform-aws-infra/   # AWS infrastructure as code (EC2, RDS)
└── README.md


## Getting Started 

## Backend (Java 17 - Spring Boot)
cd employeeapp
./mvnw spring-boot:run

application.properties uses:
	•	PostgreSQL for relational data
	•	MongoDB for audit logs

## Frontend  (React + Vite)
cd frontend
npm install
npm run dev
-	Login form authenticates and stores token
-	Token is sent with each API request
-	App has 5 pages: Home, List, Add, Manage, Logs

## Infrastructure (Terraform)
Located in: terraform-aws-infra/
What it provisions:
	•	EC2 instance for app hosting
	•	RDS PostgreSQL instance
	•	VPC, public subnet, Internet Gateway
	•	Security groups for EC2 + RDS
	•	Outputs: EC2 IP, RDS endpoint

## Part 3: Theoretical Questions & Answers

## Java Spring Framework

What is Dependency Injection?
- Dependency Injection (DI) is a design pattern where objects receive their dependencies from an external source rather than creating them internally. This promotes loose coupling, testability, and maintainability of code.
In Spring Boot, DI is built into the framework and works through the Inversion of Control (IoC) container, which automatically manages object creation and wiring.

What’s the difference between Spring MVC and Spring Boot?
- Spring MVC is a module within the larger Spring Framework that provides the foundation for building web applications using the Model-View-Controller pattern. With Spring MVC, developers need to set up the configuration manually — such as defining the dispatcher servlet, view resolvers, data source beans, and component scanning. It’s powerful and flexible, but often involves a lot of boilerplate and setup before your app can run.
Spring Boot, on the other hand, is an opinionated framework built on top of Spring that dramatically simplifies the process of creating Spring-based applications. It eliminates most of the manual configuration by using sensible defaults and auto-configuration. One of the key features of Spring Boot is that it has Spring MVC embedded by default — meaning the moment you add the spring-boot-starter-web dependency, you get a fully functional web stack (including an embedded Tomcat server, JSON support, and RESTful controller handling) out of the box.
In short, Spring Boot uses Spring MVC under the hood, but packages it with everything needed to get a modern web application running quickly, with minimal configuration and maximum productivity.

## Databases
Compare MongoDB vs. PostgreSQL: data model, queries, scalability.
- MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It allows dynamic schemas, making it ideal for evolving or unstructured data like logs or user activity. Its query language is JSON-based and handles nested data well. MongoDB is built for horizontal scaling across distributed systems using sharding.
PostgreSQL is a relational database with strict schemas, strong data integrity, and support for complex transactions. It uses SQL for querying and is ideal for structured data where consistency is critical — such as financial or enterprise systems. PostgreSQL typically scales vertically, but also supports read replicas for scaling reads.
In short: MongoDB is great for flexible, high-scale use cases; PostgreSQL is best for structured, consistent, and relational data models.

## When would you choose one over the other?
- You’d choose MongoDB when:
	•	Your data is semi-structured or rapidly evolving
	•	You need a flexible schema (e.g., for logs, activity streams, user-generated content)
	•	You prioritize horizontal scalability and fast development over strict data relationships

You’d choose PostgreSQL when:
	•	Your data is highly structured and relational
	•	You require strong consistency, complex joins, or transactions (e.g., in finance, HR)
	•	Data integrity, constraints, and long-term schema stability are critical

In short: use MongoDB for flexibility and scale, PostgreSQL for structure and reliability.

## Define microservices and their benefits.
-Microservices are an architectural style where an application is broken down into a collection of small, independent services. Each service is responsible for a specific business capability and communicates with others via APIs, usually over HTTP or messaging systems.
This approach offers several benefits:
	•	Scalability – services can be scaled independently based on demand
	•	Flexibility – each service can use different technologies or databases
	•	Faster development – teams can work on services in parallel and deploy independently
	•	Resilience – failure in one service doesn’t bring down the whole system
	•	Improved maintainability – smaller codebases are easier to understand and test
Microservices are ideal for large, evolving applications where agility, deployment speed, and resilience are key.

## Explain how Kubernetes supports microservices architectures.
-Kubernetes supports microservices by providing the infrastructure needed to deploy, manage, and scale containerized services independently.

It enables:
	•	Independent deployment of each microservice in its own container
	•	Service discovery and load balancing so services can find and communicate with each other
	•	Auto-scaling based on traffic and resource usage
	•	Self-healing through automatic restarts and rescheduling
	•	Rolling updates and rollbacks for safe and controlled deployments
	•	Secure configuration management using secrets and config maps

In essence, Kubernetes gives teams the tools to run distributed, resilient, and scalable microservice-based applications efficiently.

