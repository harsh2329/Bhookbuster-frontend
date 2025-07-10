import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaList, FaThLarge, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../../assets/css/ADashboard/ViewUser.css';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/usr/users');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleView = (id) => {
    console.log('View user with ID:', id);
    // Implementation for viewing a user's details
  };

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
    // Implementation for editing a user
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/usr/user/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'grid' : 'list'));
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-view">
      <div className="header">
        <h1>User Listings</h1>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={toggleViewMode}
            aria-label="List View"
          >
            <FaList />
          </button>
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={toggleViewMode}
            aria-label="Grid View"
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`status ${user.active ? 'active' : 'inactive'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions">
                      <button className="btn btn-view" onClick={() => handleView(user._id)} aria-label="View">
                        <FaEye />
                      </button>
                      <div className="divider"></div>
                      <button className="btn btn-edit" onClick={() => handleEdit(user._id)} aria-label="Edit">
                        <FaEdit />
                      </button>
                      <div className="divider"></div>
                      <button className="btn btn-delete" onClick={() => handleDelete(user._id)} aria-label="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="grid-item">
                <div className="card">
                  <div className="card-header">
                    <h3>{user.name}</h3>
                    <span className={`status ${user.active ? 'active' : 'inactive'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-view" onClick={() => handleView(user._id)} aria-label="View">
                      <FaEye />
                    </button>
                    <button className="btn btn-edit" onClick={() => handleEdit(user._id)} aria-label="Edit">
                      <FaEdit />
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(user._id)} aria-label="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewUser;
