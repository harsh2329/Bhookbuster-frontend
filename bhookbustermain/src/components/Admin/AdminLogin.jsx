// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../assets/css/ADashboard/AdminLogin.css'; // Adjust the path as needed

// const AdminLoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const post = async (url, data) => {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       return response.json();
//       };

//       const response = await post('/admin/alogin', {
//       username,
//       password,
//       });

//       if (response.status === 200) {
//       // Store auth token or admin info in localStorage if needed
//       localStorage.setItem('adminLoggedIn', 'true');
//       navigate('/admin/dashboard'); // Redirect to dashboard
//       } else {
//       setError(response.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Server error. Please try again later.');
//       console.error('Login error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="light-effect"></div>
      
//       <div className="login-header">
//         <h1>Admin Panel</h1>
//         <p>Enter your credentials to access the dashboard</p>
//       </div>
      
//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit} className="admin-login-form">
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username"
//             required
//           />
//           <span className="input-icon">👤</span>
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//           <span className="input-icon">🔒</span>
//         </div>
        
//         <div className="remember-me">
//           <label className="fancy-checkbox">
//             Remember me
//             <input type="checkbox" />
//             <span className="checkmark"></span>
//           </label>
//         </div>
        
//         <button 
//           type="submit" 
//           className="login-button"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLoginForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/ADashboard/AdminLogin.css'; // Adjust the path as needed

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Changed from /admin/alogin to /admin/login to match your backend route
      const response = await axios.post('/admin/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Store auth token or admin info in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminId', response.data.admin?.id || '');
        localStorage.setItem('role', 'ADMIN');

        // Navigate to admin page
        navigate('/admin');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Improved error handling
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data?.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up request. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="light-effect"></div>
      
      <div className="login-header">
        <h1>Admin Panel</h1>
        <p>Enter your credentials to access the dashboard</p>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <span className="input-icon">👤</span>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <span className="input-icon">🔒</span>
        </div>
        
        <div className="remember-me">
          <label className="fancy-checkbox">
            Remember me
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        
        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;