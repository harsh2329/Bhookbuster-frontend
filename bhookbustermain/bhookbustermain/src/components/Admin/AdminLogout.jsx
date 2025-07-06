import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/ADashboard/AdminLogout.css';

const AdminLogout = () => {
  const [status, setStatus] = useState('Logging out...');
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          // Clear any local storage items
          localStorage.removeItem('adminLoggedIn');
          setStatus('Logout successful!');
          
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            navigate('/admin/login');
          }, 2000);
        } else {
          setStatus('Logout failed. Please try again.');
        }
      } catch (error) {
        console.error('Logout error:', error);
        setStatus('Server error. Please try again.');
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <div className="logout-icon">👋</div>
        <h2>Admin Logout</h2>
        <p className="status-message">{status}</p>
        {status !== 'Logging out...' && (
          <button 
            className="return-button"
            onClick={() => navigate('/admin/login')}
          >
            Return to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminLogout;