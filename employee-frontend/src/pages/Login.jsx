import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();

  // Get the intended destination from location state, or default to /employees
  const from = location.state?.from?.pathname || '/employees';

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store the token and update authentication state
      if (data.token) {
        login(data.token);
        // Redirect to the intended destination or default to employees
        navigate(from, { replace: true });
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      marginTop: '4rem'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#333', 
        fontSize: '2.5rem', 
        fontWeight: '600' 
      }}>
        Login
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="username" style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '500',
            color: '#333'
          }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Enter your username"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '500',
            color: '#333'
          }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '0.75rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '6px',
            fontSize: '0.9rem',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isLoading ? '#cccccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            marginTop: '0.5rem'
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login; 