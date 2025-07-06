// RestaurantsList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import '../../assets/css/RDasboard/ViewResParti.css';

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/restaurants/owner/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setRestaurants(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError(err.response?.data?.message || 'Failed to fetch restaurants');
      setLoading(false);
      toast.error('Failed to load restaurants');
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/restaurants/${id}/toggle-status`, 
        { active: !currentStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Update local state
      setRestaurants(restaurants.map(restaurant => 
        restaurant._id === id ? {...restaurant, active: !restaurant.active} : restaurant
      ));
      
      toast.success(`Restaurant ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error('Error toggling restaurant status:', err);
      toast.error('Failed to update restaurant status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/restaurants/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Update local state
        setRestaurants(restaurants.filter(restaurant => restaurant._id !== id));
        toast.success('Restaurant deleted successfully');
      } catch (err) {
        console.error('Error deleting restaurant:', err);
        toast.error('Failed to delete restaurant');
      }
    }
  };

  if (loading) return <div className="loading">Loading restaurants...</div>;
  if (error) return <div className="error">{error}</div>;
  if (restaurants.length === 0) return <div className="no-restaurants">No restaurants found. Add your first restaurant!</div>;

  return (
    <div className="restaurants-container">
      <h2 className="section-title">Your Restaurants</h2>
      <div className="table-container">
        <table className="restaurants-table">
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Category</th>
              <th>Food Type</th>
              <th>Timings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant._id}>
                <td>{restaurant.title}</td>
                <td>{restaurant.category}</td>
                <td>{restaurant.foodtype}</td>
                <td>{restaurant.timmings}</td>
                <td className={`status ${restaurant.active ? 'active' : 'inactive'}`}>
                  {restaurant.active ? 'Active' : 'Inactive'}
                </td>
                <td className="actions">
                  <button className="icon-button view" title="View Details">
                    <FaEye />
                  </button>
                  <button className="icon-button edit" title="Edit Restaurant">
                    <FaEdit />
                  </button>
                  <button 
                    className="icon-button toggle" 
                    title={restaurant.active ? 'Deactivate' : 'Activate'}
                    onClick={() => handleToggleActive(restaurant._id, restaurant.active)}
                  >
                    {restaurant.active ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                  <button 
                    className="icon-button delete" 
                    title="Delete Restaurant"
                    onClick={() => handleDelete(restaurant._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantsList;