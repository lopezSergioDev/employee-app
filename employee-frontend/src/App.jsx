import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import ManageEmployee from './pages/ManageEmployee';
import Login from './pages/Login';
import Logs from './pages/Logs';
import Home from './pages/Home';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the attempted location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Navigation Component
function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <ul style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          flexWrap: 'wrap'
        }}>
          <li>
            <Link 
              to="/home" 
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: '500',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'inline-block',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#007bff';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#f8f9fa';
                // Create animated underline
                const underline = document.createElement('div');
                underline.style.cssText = `
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 0;
                  height: 2px;
                  background: linear-gradient(90deg, #007bff, #0056b3);
                  transition: width 0.3s ease;
                  border-radius: 1px;
                `;
                underline.id = 'underline-home';
                e.target.appendChild(underline);
                setTimeout(() => {
                  underline.style.width = '100%';
                }, 10);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#333';
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = 'transparent';
                // Remove underline
                const underline = e.target.querySelector('#underline-home');
                if (underline) {
                  underline.style.width = '0';
                  setTimeout(() => {
                    if (underline.parentNode) {
                      underline.parentNode.removeChild(underline);
                    }
                  }, 300);
                }
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/employees" 
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: '500',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'inline-block',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#007bff';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#f8f9fa';
                // Create animated underline
                const underline = document.createElement('div');
                underline.style.cssText = `
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 0;
                  height: 2px;
                  background: linear-gradient(90deg, #007bff, #0056b3);
                  transition: width 0.3s ease;
                  border-radius: 1px;
                `;
                underline.id = 'underline-employees';
                e.target.appendChild(underline);
                setTimeout(() => {
                  underline.style.width = '100%';
                }, 10);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#333';
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = 'transparent';
                // Remove underline
                const underline = e.target.querySelector('#underline-employees');
                if (underline) {
                  underline.style.width = '0';
                  setTimeout(() => {
                    if (underline.parentNode) {
                      underline.parentNode.removeChild(underline);
                    }
                  }, 300);
                }
              }}
            >
              View All
            </Link>
          </li>
          <li>
            <Link 
              to="/create" 
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: '500',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'inline-block',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#007bff';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#f8f9fa';
                // Create animated underline
                const underline = document.createElement('div');
                underline.style.cssText = `
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 0;
                  height: 2px;
                  background: linear-gradient(90deg, #007bff, #0056b3);
                  transition: width 0.3s ease;
                  border-radius: 1px;
                `;
                underline.id = 'underline-create';
                e.target.appendChild(underline);
                setTimeout(() => {
                  underline.style.width = '100%';
                }, 10);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#333';
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = 'transparent';
                // Remove underline
                const underline = e.target.querySelector('#underline-create');
                if (underline) {
                  underline.style.width = '0';
                  setTimeout(() => {
                    if (underline.parentNode) {
                      underline.parentNode.removeChild(underline);
                    }
                  }, 300);
                }
              }}
            >
              Create
            </Link>
          </li>
          <li>
            <Link 
              to="/manage" 
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: '500',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'inline-block',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#007bff';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#f8f9fa';
                // Create animated underline
                const underline = document.createElement('div');
                underline.style.cssText = `
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 0;
                  height: 2px;
                  background: linear-gradient(90deg, #007bff, #0056b3);
                  transition: width 0.3s ease;
                  border-radius: 1px;
                `;
                underline.id = 'underline-manage';
                e.target.appendChild(underline);
                setTimeout(() => {
                  underline.style.width = '100%';
                }, 10);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#333';
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = 'transparent';
                // Remove underline
                const underline = e.target.querySelector('#underline-manage');
                if (underline) {
                  underline.style.width = '0';
                  setTimeout(() => {
                    if (underline.parentNode) {
                      underline.parentNode.removeChild(underline);
                    }
                  }, 300);
                }
              }}
            >
              Manage
            </Link>
          </li>
          <li>
            <Link 
              to="/logs" 
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: '500',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                position: 'relative',
                display: 'inline-block',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#007bff';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#f8f9fa';
                // Create animated underline
                const underline = document.createElement('div');
                underline.style.cssText = `
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 0;
                  height: 2px;
                  background: linear-gradient(90deg, #007bff, #0056b3);
                  transition: width 0.3s ease;
                  border-radius: 1px;
                `;
                underline.id = 'underline-logs';
                e.target.appendChild(underline);
                setTimeout(() => {
                  underline.style.width = '100%';
                }, 10);
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#333';
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = 'transparent';
                // Remove underline
                const underline = e.target.querySelector('#underline-logs');
                if (underline) {
                  underline.style.width = '0';
                  setTimeout(() => {
                    if (underline.parentNode) {
                      underline.parentNode.removeChild(underline);
                    }
                  }, 300);
                }
              }}
            >
              Logs
            </Link>
          </li>
          <li>
            <button 
              onClick={handleLogout}
              style={{
                textDecoration: 'none',
                color: '#dc3545',
                fontWeight: '500',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                border: '1px solid #dc3545',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dc3545';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#dc3545';
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function AppContent() {
  return (
    <Router>
      <Navigation />
      
      <main style={{ 
        padding: "2rem", 
        maxWidth: '1200px', 
        margin: '0 auto',
        minHeight: 'calc(100vh - 200px)'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateEmployee />
            </ProtectedRoute>
          } />
          <Route path="/manage" element={
            <ProtectedRoute>
              <ManageEmployee />
            </ProtectedRoute>
          } />
          <Route path="/logs" element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <footer style={{ 
        marginTop: "2rem", 
        textAlign: "center",
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef'
      }}>
        <p style={{ margin: 0, color: '#6c757d' }}>© 2025 Finconecta Assessment</p>
      </footer>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;