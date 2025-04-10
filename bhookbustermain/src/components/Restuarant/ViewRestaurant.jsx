// RestaurantView.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaList, FaThLarge, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../../assets/css/RDasboard/ViewRes.css';
// import AdminSidebar from '../Admin/AdminSidebar';/

const RestaurantView = () => {
  const [locations, setLocations] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/location/all');
      setLocations(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLoading(false);
    }
  };

  const handleView = (id) => {
    console.log("View restaurant with ID:", id);
    // Implementation for viewing a restaurant's details
  };

  const handleEdit = (id) => {
    console.log("Edit restaurant with ID:", id);
    // Implementation for editing a restaurant
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        // Implement your API call for deletion
        await axios.delete(`/api/locations/delete/${id}`);
        fetchLocations(); // Refresh the list
      } catch (error) {
        console.error("Error deleting location:", error);
      }
    }
  };

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'list' ? 'grid' : 'list');
  };

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <>
    {/* <AdminSidebar /> */}
    <div className="restaurant-view">
      <div className="header">
        <h1>Restaurant Listings</h1>
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
                <th>Category</th>
                <th>Location</th>
                <th>Timings</th>
                <th>Contact</th>
                <th>Food Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0 ? (
                locations.map(location => (
                  <tr key={location._id}>
                    <td>{location.title}</td>
                    <td>{location.category}</td>
                    <td>
                      {location.address}, 
                      {location.areaId && location.areaId.name}, 
                      {location.cityId && location.cityId.name}, 
                      {location.stateId && location.stateId.name}
                    </td>
                    <td>{location.timmings}</td>
                    <td>{location.contactNumber}</td>
                    <td>{location.foodtype}</td>
                    <td>
                      <span className={`status ${location.active ? 'active' : 'inactive'}`}>
                        {location.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        className="btn btn-view"
                        onClick={() => handleView(location._id)}
                        aria-label="View"
                      >
                        <FaEye />
                      </button>
                      <div className="divider"></div>
                      <button 
                        className="btn btn-edit"
                        onClick={() => handleEdit(location._id)}
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                      <div className="divider"></div>
                      <button 
                        className="btn btn-delete"
                        onClick={() => handleDelete(location._id)}
                        aria-label="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">No restaurants found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid-container">
          {locations.length > 0 ? (
            locations.map(location => (
              <div key={location._id} className="grid-item">
                <div className="card">
                  <div className="card-header">
                    <h3>{location.title}</h3>
                    <span className={`status ${location.active ? 'active' : 'inactive'}`}>
                      {location.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>Category:</strong> {location.category}</p>
                    <p><strong>Food Type:</strong> {location.foodtype}</p>
                    <p><strong>Timings:</strong> {location.timmings}</p>
                    <p><strong>Contact:</strong> {location.contactNumber}</p>
                    <p className="address"><strong>Address:</strong> {location.address}, 
                      {location.areaId && location.areaId.name}, 
                      {location.cityId && location.cityId.name}, 
                      {location.stateId && location.stateId.name}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button 
                      className="btn btn-view"
                      onClick={() => handleView(location._id)}
                      aria-label="View"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEdit(location._id)}
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(location._id)}
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No restaurants found</div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default RestaurantView;