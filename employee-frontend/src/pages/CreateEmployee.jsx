import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/employees', {
        method: 'POST',
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
        throw new Error('Failed to create employee');
      }

      // Reset form and redirect
      setFormData({ firstName: '', lastName: '', email: '' });
      navigate('/employees');
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333', fontSize: '2.5rem', fontWeight: '600' }}>Add New Employee</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '12px 24px',
            backgroundColor: isSubmitting ? '#cccccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '10px'
          }}
        >
          {isSubmitting ? 'Creating...' : 'Create Employee'}
        </button>
      </form>
    </div>
  );
}

export default CreateEmployee; 