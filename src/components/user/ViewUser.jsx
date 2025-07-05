import React, { useState, useEffect } from 'react';
import { BsList, BsGrid3X3Gap, BsPeopleFill } from 'react-icons/bs';
import axios from 'axios';
import '../../assets/css/ADashboard/ViewUser.css';

const UserViews = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('list'); // 'list' or 'grid'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // Make sure this endpoint matches your backend API route exactly
        const response = await axios.get('/usr/users');
        
        // Check the API response structure and handle accordingly
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else if (response.data && Array.isArray(response.data)) {
          // In case API returns array directly
          setUsers(response.data);
        } else {
          throw new Error('Unexpected API response format');
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        
        // More helpful error messages based on the type of error
        if (err.response) {
          // The server responded with an error status
          setError(`Server returned error: ${err.response.status}`);
        } else if (err.request) {
          // No response received from server
          setError('Server not responding. Check your connection or server status.');
        } else {
          // Something else went wrong
          setError(`Request failed: ${err.message}`);
        }
        
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // User count card at the top of the page
  const UserCountCard = () => (
    <div className='card'>
      <div className='card-inner'>
        <h3>CUSTOMERS</h3>
        <BsPeopleFill className='card_icon'/>
      </div>
      <h1>{users.length}</h1>
    </div>
  );

  if (isLoading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-views-container">
      {/* User Count Widget */}
      <div className="user-stats-widget">
        <UserCountCard />
      </div>

      <div className="view-header">
        <h1>User Management</h1>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewType === 'list' ? 'active' : ''}`}
            onClick={() => setViewType('list')}
          >
            <BsList /> List View
          </button>
          <button 
            className={`toggle-btn ${viewType === 'grid' ? 'active' : ''}`}
            onClick={() => setViewType('grid')}
          >
            <BsGrid3X3Gap /> Grid View
          </button>
        </div>
      </div>

      {viewType === 'list' ? (
        <div className="list-view">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    {user.profilePicPath ? (
                      <img 
                        src={user.profilePicPath} 
                        alt={`${user.firstname}'s profile`} 
                        className="profile-pic-small" 
                      />
                    ) : (
                      <div className="profile-placeholder">
                        {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.contact}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid-view">
          {users.map((user) => (
            <div className="user-card" key={user._id}>
              <div className="card-header">
                {user.profilePicPath ? (
                  <img 
                    src={user.profilePicPath} 
                    alt={`${user.firstname}'s profile`} 
                    className="profile-pic" 
                  />
                ) : (
                  <div className="profile-placeholder-large">
                    {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                  </div>
                )}
                <h3>{user.firstname} {user.lastname}</h3>
                <span className={`role-badge ${user.role}`}>
                  {user.role}
                </span>
              </div>
              <div className="card-body">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserViews;