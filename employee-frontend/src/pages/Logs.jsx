import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Logs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!isAuthenticated) {
        setError('Authentication required');
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8080/api/logs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized - Please log in again');
          } else if (response.status === 403) {
            throw new Error('Forbidden - You do not have permission to view logs');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        setLogs(data);
        setError('');
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError(error.message || 'Failed to fetch logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [isAuthenticated]);

  const formatTimestamp = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch (error) {
      return timestamp; // Return original if parsing fails
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#666', margin: 0 }}>Loading logs...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        borderRadius: '8px',
        border: '1px solid #f5c6cb',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#721c24' }}>Error Loading Logs</h3>
        <p style={{ margin: 0, fontSize: '1rem' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#721c24',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #e9ecef',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{
            margin: 0,
            color: '#333',
            fontSize: '1.75rem',
            fontWeight: '600'
          }}>
            System Logs
          </h2>
          <p style={{
            margin: '0.5rem 0 0 0',
            color: '#6c757d',
            fontSize: '0.95rem'
          }}>
            {logs.length} log entries found
          </p>
        </div>

        {logs.length === 0 ? (
          <div style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            color: '#6c757d'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>No logs found</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
              There are no log entries to display at this time.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.95rem'
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#f8f9fa',
                  borderBottom: '2px solid #dee2e6'
                }}>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#495057',
                    borderBottom: '2px solid #dee2e6',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Action
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#495057',
                    borderBottom: '2px solid #dee2e6',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Actor
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#495057',
                    borderBottom: '2px solid #dee2e6',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #e9ecef',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.parentElement.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.target.parentElement.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{
                      padding: '1rem 1.5rem',
                      color: '#333',
                      fontWeight: '500',
                      fontSize: '0.95rem'
                    }}>
                      {log.action || 'N/A'}
                    </td>
                    <td style={{
                      padding: '1rem 1.5rem',
                      color: '#495057',
                      fontSize: '0.95rem'
                    }}>
                      {log.actor || 'N/A'}
                    </td>
                    <td style={{
                      padding: '1rem 1.5rem',
                      color: '#6c757d',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace'
                    }}>
                      {formatTimestamp(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logs; 