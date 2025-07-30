import { useState, useEffect } from 'react';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/employees', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed. Please login again.');
          }
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading employees...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found.</div>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333', fontSize: '2.5rem', fontWeight: '600' }}>List of Employees</h2>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginTop: '1rem',
        border: '1px solid #ddd'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>First Name</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Last Name</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{employee.id}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{employee.firstName}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{employee.lastName}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList; 