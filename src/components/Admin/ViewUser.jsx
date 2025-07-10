import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import '../../assets/css/ADashboard/ViewUser.css';

function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [viewingUserId, setViewingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setFormData({ ...user });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8000/user/${id}`);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete user.");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/user/${editingUserId}`, formData);
      alert("User updated successfully!");
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="user-container">
      <h2>All Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone || '-'}</td>
              <td className="action-buttons">
                <button className="view-btn" onClick={() => setViewingUserId(user._id)}><FaEye /></button>
                <button className="edit-btn" onClick={() => handleEditClick(user)}><FaEdit /></button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingUserId && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setEditingUserId(null)}>×</span>
            <h3>Edit User</h3>
            <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Name" />
            <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email" />
            <input type="text" name="role" value={formData.role || ''} onChange={handleInputChange} placeholder="Role" />
            <input type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="Phone" />
            <div className="modal-actions">
              <button onClick={() => setEditingUserId(null)}>Cancel</button>
              <button onClick={handleUpdate}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingUserId && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setViewingUserId(null)}>×</span>
            <h3>User Details</h3>
            {users.filter(user => user._id === viewingUserId).map((user, i) => (
              <div key={i}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Phone:</strong> {user.phone || '-'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAllUsers;
