import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const fetchEmployee = async () => {
    if (!employeeId.trim()) {
      setMessage('Please enter an employee ID');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/employees/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setMessage('Authentication failed. Please login again.');
        } else if (response.status === 404) {
          setMessage('Employee not found');
        } else {
          setMessage('Failed to fetch employee');
        }
        setEmployee(null);
        return;
      }

      const data = await response.json();
      setEmployee(data);
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || ''
      });
      setMessage('Employee fetched successfully');
    } catch (error) {
      console.error('Error fetching employee:', error);
      setMessage('Failed to fetch employee');
      setEmployee(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmployee = async () => {
    if (!employee) {
      setMessage('No employee loaded');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsUpdating(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        }
        throw new Error('Failed to update employee');
      }

      setMessage('Employee updated successfully!');
      setEmployee({ ...employee, ...formData });
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage('Failed to update employee');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteEmployee = async () => {
    if (!employee) {
      setMessage('No employee loaded');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    setIsDeleting(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        }
        throw new Error('Failed to delete employee');
      }

      setMessage('Employee deleted successfully!');
      setEmployee(null);
      setFormData({ firstName: '', lastName: '', email: '' });
      setEmployeeId('');
      
      // Redirect to employees list after a short delay
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } catch (error) {
      console.error('Error deleting employee:', error);
      setMessage('Failed to delete employee');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333', fontSize: '2.5rem', fontWeight: '600' }}>Update/Delete Employee</h2>
      
      {/* Employee ID Input */}
      <div style={{ marginBottom: '30px' }}>
        <label htmlFor="employeeId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Employee ID
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter employee ID"
          />
          <button
            onClick={fetchEmployee}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: isLoading ? '#cccccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Fetching...' : 'Fetch'}
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
          color: message.includes('successfully') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message}
        </div>
      )}

      {/* Employee Form */}
      {employee && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px' }}>
          <h3 style={{ marginBottom: '20px' }}>Employee Details</h3>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.firstName ? '2px solid #ff0000' : '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <div style={{ color: '#ff0000', fontSize: '14px', marginTop: '5px' }}>
                  {errors.firstName}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.lastName ? '2px solid #ff0000' : '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <div style={{ color: '#ff0000', fontSize: '14px', marginTop: '5px' }}>
                  {errors.lastName}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.email ? '2px solid #ff0000' : '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
                placeholder="Enter email address"
              />
              {errors.email && (
                <div style={{ color: '#ff0000', fontSize: '14px', marginTop: '5px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={updateEmployee}
                disabled={isUpdating}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  backgroundColor: isUpdating ? '#cccccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: isUpdating ? 'not-allowed' : 'pointer'
                }}
              >
                {isUpdating ? 'Updating...' : 'Update Employee'}
              </button>
              
              <button
                type="button"
                onClick={deleteEmployee}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  backgroundColor: isDeleting ? '#cccccc' : '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: isDeleting ? 'not-allowed' : 'pointer'
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete Employee'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageEmployee; 