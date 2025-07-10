import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaPhoneAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import "../../assets/css/FirmCollections.css";

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {frontContent}
        </div>
        <div className="flip-card-back">
          {backContent}
        </div>
      </div>
    </div>
  );
};

const RestaurantCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Set to true if user is admin

  const filterHandler = (category, categoryId) => {
    setSelectedCategory(category);
    setActiveCategory(categoryId);
  };

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        const response = await axios.get("https://bhookbuster-backend-3.onrender.com/location/all");
        setRestaurants(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/category/categories");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Check user role - this is a placeholder, implement your auth logic
    const checkUserRole = () => {
      const userRole = localStorage.getItem("userRole");
      setIsAdmin(userRole === "admin");
    };

    fetchRestaurantsData();
    fetchCategories();
    checkUserRole();
  }, []);

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
        // Refresh the list
        const response = await axios.get("/location/locations");
        setRestaurants(response.data.data || []);
      } catch (error) {
        console.error("Error deleting location:", error);
      }
    }
  };

  return (
    <>
      <div className="hero-box-main-container">
        <h3 className="text-main">
          Discover the Best Restaurants Near You
        </h3>
      </div>

      <div className="filterButtons">
        <button
          key="all"
          onClick={() => filterHandler("All", "all")}
          className={`border ${
            activeCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-600"
          } transition duration-300 px-4 py-2 rounded-md mx-1`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => filterHandler(category.name, category._id)}
            className={`border ${
              activeCategory === category._id
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-600"
            } transition duration-300 px-4 py-2 rounded-md mx-1`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <section className="restaurantSection grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {loading ? (
          <p>Loading restaurants...</p>
        ) : (
          restaurants
            .filter(
              (restaurant) =>
                selectedCategory === "All" ||
                restaurant.category === activeCategory
            )
            .map((restaurant) => {
              const restaurantName = restaurant.title;
              const image = restaurant.imagePath || "/assets/images/default-restaurant.png";
              const foodType = restaurant.foodtype;
              const address = restaurant.address;
              const discount = restaurant.discount || "10%"; // Default discount or from data

              return (
                <FlipCard
                  key={restaurant._id}
                  frontContent={
                    <div className="restaurant-card-front">
                      <div className="card-image-container">
                        <img
                          src={image}
                          alt={restaurantName}
                          className="restaurant-image"
                        />
                        {discount && (
                          <div className="discount-badge">
                            {discount} OFF
                          </div>
                        )}
                      </div>
                      <div className="card-content">
                        <h3 className="restaurant-name">{restaurantName}</h3>
                        <div className="restaurant-type">{foodType}</div>
                        <div className="restaurant-location">
                          <FaMapMarkerAlt className="icon" />
                          <span>{address}</span>
                        </div>
                        <div className="flip-prompt">
                          Click to view details
                        </div>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="restaurant-card-back">
                      <h4 className="back-title">{restaurantName}</h4>
                      
                      <div className="description">
                        {restaurant.description || "Enjoy delicious food at this amazing restaurant with authentic cuisine and wonderful ambiance!"}
                      </div>
                      
                      <div className="detail-item">
                        <FaClock className="detail-icon" />
                        <span>{restaurant.timmings || "9:00 AM - 10:00 PM"}</span>
                      </div>
                      
                      <div className="detail-item">
                        <FaPhoneAlt className="detail-icon" />
                        <span>{restaurant.contactNumber || "Not Available"}</span>
                      </div>
                      
                      <div className="detail-item">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>
                          {address}, 
                          {restaurant.areaId && restaurant.areaId.name}, 
                          {restaurant.cityId && restaurant.cityId.name}
                        </span>
                      </div>
                      
                      <div className="status-container">
                        <span className={`status ${restaurant.active ? 'active' : 'inactive'}`}>
                          {restaurant.active ? 'Open Now' : 'Closed'}
                        </span>
                      </div>

                      <div className="action-buttons">
                        <Link 
                          to={`/restaurant/${restaurant._id}`}
                          className="view-details-btn"
                        >
                          View Details
                        </Link>
                        
                        {isAdmin && (
                          <div className="admin-actions">
                            <button onClick={() => handleEdit(restaurant._id)} className="admin-btn edit-btn">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(restaurant._id)} className="admin-btn delete-btn">
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                />
              );
            })
        )}
      </section>
    </>
  );
};

export default FirmCollections;
// Test different API endpoints to find the correct one

