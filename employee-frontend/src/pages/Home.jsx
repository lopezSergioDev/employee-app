import React from 'react';

function Home() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      lineHeight: '1.6'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#333',
        fontSize: '2.5rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #007bff, #0056b3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Welcome to the Employee Management App
      </h1>
      
      <p style={{
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        This application was built as part of a technical assessment to demonstrate modern web development practices and full-stack capabilities.
      </p>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          color: '#333',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          Technical Stack
        </h2>
        
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li style={{
            padding: '0.75rem 0',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              marginRight: '1rem',
              flexShrink: 0
            }}></span>
            <strong>Java Spring Boot backend</strong>&nbsp;with RESTful APIs
          </li>
          
          <li style={{
            padding: '0.75rem 0',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              marginRight: '1rem',
              flexShrink: 0
            }}></span>
            <strong>React frontend</strong>&nbsp;built using Vite
          </li>
          
          <li style={{
            padding: '0.75rem 0',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#ffc107',
              color: 'white',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              marginRight: '1rem',
              flexShrink: 0
            }}></span>
            <strong>PostgreSQL</strong>&nbsp;for relational data (e.g., employees)
          </li>
          
          <li style={{
            padding: '0.75rem 0',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              marginRight: '1rem',
              flexShrink: 0
            }}></span>
            <strong>MongoDB</strong>&nbsp;for activity logging and auditing
          </li>
          
          <li style={{
            padding: '0.75rem 0',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#6f42c1',
              color: 'white',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              marginRight: '1rem',
              flexShrink: 0
            }}></span>
            <strong>JWT-based authentication</strong>&nbsp;and protected routes
          </li>
          
          <li style={{
            padding: '0.75rem 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              backgroundColor: '#fd7e14',
              color: 'white',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              marginRight: '1rem',
              flexShrink: 0
            }}></span>
            <strong>Terraform-based infrastructure</strong>&nbsp;for EC2 and RDS on AWS
          </li>
        </ul>
      </div>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          color: '#333',
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Backend Assessment Requirements & Implementation
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <h4 style={{
              color: '#007bff',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              1. Java Spring Boot application with full CRUD
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              The backend is built using Spring Boot framework providing complete Create, Read, Update, and Delete operations for employee management. The application follows Spring Boot best practices with proper dependency injection, service layer architecture, and comprehensive error handling.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#28a745',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              2. Use of PostgreSQL and MongoDB
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              PostgreSQL is used as the primary relational database for storing employee records with proper data relationships and constraints. MongoDB serves as a document database for audit logging and activity tracking, providing flexible schema for storing detailed operation logs.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#ffc107',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              3. Expose RESTful APIs
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              RESTful APIs are implemented using Spring Web framework, providing standard HTTP methods (GET, POST, PUT, DELETE) for employee operations. The APIs follow REST conventions with proper status codes, JSON responses, and comprehensive endpoint documentation.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#6f42c1',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              4. Authentication using JWT
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              JWT (JSON Web Tokens) are used for secure authentication and authorization. After successful login, users receive a JWT token that is validated on each request to protect sensitive endpoints. The implementation includes token validation, expiration handling, and secure token storage.
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          color: '#333',
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Frontend Assessment Requirements & Implementation
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <h4 style={{
              color: '#007bff',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              1. Responsive React Application with Header, Footer, and Navigation
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              The application features a sticky header with navigation bar containing 5 links (Home, View All, Create, Manage, Logs), a footer with copyright information, and responsive design using flexbox with proper breakpoints for different screen sizes.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#28a745',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              2. Multiple Pages Using React Router
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Implemented 5 pages using React Router: Home, EmployeeList, CreateEmployee, ManageEmployee, and Logs. Each page is protected by authentication and uses proper routing with BrowserRouter, Routes, and Route components.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#ffc107',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              3. Component that Fetches Data from Backend API
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              EmployeeList component uses useEffect and fetch to retrieve employee data from /api/employees endpoint. Logs component fetches audit logs from the backend API with proper error handling and loading states.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#6f42c1',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              4. Form Component to Submit New Data
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              CreateEmployee component provides a complete form with validation for adding new employees. ManageEmployee component includes forms for updating and deleting employee records, all with proper form validation and error handling.
            </p>
          </div>
          

          
          <div>
            <h4 style={{
              color: '#20c997',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              5. React Hooks for State Management
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Extensively uses React Hooks: useState for local component state, useEffect for API calls and side effects, useNavigate for programmatic navigation, useAuth custom hook for authentication context, and useLocation for route protection.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#e83e8c',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              6. CSS Animations for Navigation Hover Effects
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Navigation links feature complex hover animations including scale transforms, color transitions, and dynamic underline effects with gradient backgrounds. Animations use CSS transitions and JavaScript for dynamic element creation/removal.
            </p>
          </div>
          
          <div>
            <h4 style={{
              color: '#6c757d',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              7. Custom Design Theme Using CSS
            </h4>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Implements a modern, consistent design theme with blue primary colors, proper typography hierarchy, box shadows, border radius, gradients, and responsive layouts. All styling uses inline styles for component-specific theming.
            </p>
          </div>
        </div>
      </div>
      
      <p style={{
        fontSize: '1.1rem',
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
        backgroundColor: '#e7f3ff',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        Feel free to explore the application using the navigation menu above. You can view all employees, create new ones, manage existing records, and view system logs.
      </p>
    </div>
  );
}

export default Home; 