// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FaEye, FaEdit, FaTrash, FaPhoneAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
// import "../../assets/css/FirmCollections.css";

// const FlipCard = ({ frontContent, backContent }) => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   return (
//     <div
//       className={`flip-card ${isFlipped ? "flipped" : ""}`}
//       onClick={() => setIsFlipped((prev) => !prev)}
//     >
//       <div className="flip-card-inner">
//         <div className="flip-card-front">
//           {frontContent}
//         </div>
//         <div className="flip-card-back">
//           {backContent}
//         </div>
//       </div>
//     </div>
//   );
// };

// const RestaurantCollection = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [restaurants, setRestaurants] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false); // Set to true if user is admin

//   const filterHandler = (category, categoryId) => {
//     setSelectedCategory(category);
//     setActiveCategory(categoryId);
//   };

//   useEffect(() => {
//     const fetchRestaurantsData = async () => {
//       try {
//         const response = await axios.get("https://bhookbuster.netlify.app/location/all");
//         setRestaurants(response.data.data || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching restaurant data:", error);
//         setLoading(false);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/category/categories");
//         setCategories(response.data.data || []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     // Check user role - this is a placeholder, implement your auth logic
//     const checkUserRole = () => {
//       const userRole = localStorage.getItem("userRole");
//       setIsAdmin(userRole === "admin");
//     };

//     fetchRestaurantsData();
//     fetchCategories();
//     checkUserRole();
//   }, []);

//   const handleView = (id) => {
//     console.log("View restaurant with ID:", id);
//     // Implementation for viewing a restaurant's details
//   };

//   const handleEdit = (id) => {
//     console.log("Edit restaurant with ID:", id);
//     // Implementation for editing a restaurant
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this restaurant?")) {
//       try {
//         // Implement your API call for deletion
//         await axios.delete(`/api/locations/delete/${id}`);
//         // Refresh the list
//         const response = await axios.get("/location/locations");
//         setRestaurants(response.data.data || []);
//       } catch (error) {
//         console.error("Error deleting location:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="hero-box-main-container">
//         <h3 className="text-main">
//           Discover the Best Restaurants Near You
//         </h3>
//       </div>

//       <div className="filterButtons">
//         <button
//           key="all"
//           onClick={() => filterHandler("All", "all")}
//           className={`border ${
//             activeCategory === "all"
//               ? "bg-blue-600 text-white"
//               : "bg-white text-blue-600 border-blue-600"
//           } transition duration-300 px-4 py-2 rounded-md mx-1`}
//         >
//           All
//         </button>
        
//         {categories.map((category) => (
//           <button
//             key={category._id}
//             onClick={() => filterHandler(category.name, category._id)}
//             className={`border ${
//               activeCategory === category._id
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-blue-600 border-blue-600"
//             } transition duration-300 px-4 py-2 rounded-md mx-1`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>

//       <section className="restaurantSection grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//         {loading ? (
//           <p>Loading restaurants...</p>
//         ) : (
//           restaurants
//             .filter(
//               (restaurant) =>
//                 selectedCategory === "All" ||
//                 restaurant.category === activeCategory
//             )
//             .map((restaurant) => {
//               const restaurantName = restaurant.title;
//               const image = restaurant.imagePath || "/assets/images/default-restaurant.png";
//               const foodType = restaurant.foodtype;
//               const address = restaurant.address;
//               const discount = restaurant.discount || "10%"; // Default discount or from data

//               return (
//                 <FlipCard
//                   key={restaurant._id}
//                   frontContent={
//                     <div className="restaurant-card-front">
//                       <div className="card-image-container">
//                         <img
//                           src={image}
//                           alt={restaurantName}
//                           className="restaurant-image"
//                         />
//                         {discount && (
//                           <div className="discount-badge">
//                             {discount} OFF
//                           </div>
//                         )}
//                       </div>
//                       <div className="card-content">
//                         <h3 className="restaurant-name">{restaurantName}</h3>
//                         <div className="restaurant-type">{foodType}</div>
//                         <div className="restaurant-location">
//                           <FaMapMarkerAlt className="icon" />
//                           <span>{address}</span>
//                         </div>
//                         <div className="flip-prompt">
//                           Click to view details
//                         </div>
//                       </div>
//                     </div>
//                   }
//                   backContent={
//                     <div className="restaurant-card-back">
//                       <h4 className="back-title">{restaurantName}</h4>
                      
//                       <div className="description">
//                         {restaurant.description || "Enjoy delicious food at this amazing restaurant with authentic cuisine and wonderful ambiance!"}
//                       </div>
                      
//                       <div className="detail-item">
//                         <FaClock className="detail-icon" />
//                         <span>{restaurant.timmings || "9:00 AM - 10:00 PM"}</span>
//                       </div>
                      
//                       <div className="detail-item">
//                         <FaPhoneAlt className="detail-icon" />
//                         <span>{restaurant.contactNumber || "Not Available"}</span>
//                       </div>
                      
//                       <div className="detail-item">
//                         <FaMapMarkerAlt className="detail-icon" />
//                         <span>
//                           {address}, 
//                           {restaurant.areaId && restaurant.areaId.name}, 
//                           {restaurant.cityId && restaurant.cityId.name}
//                         </span>
//                       </div>
                      
//                       <div className="status-container">
//                         <span className={`status ${restaurant.active ? 'active' : 'inactive'}`}>
//                           {restaurant.active ? 'Open Now' : 'Closed'}
//                         </span>
//                       </div>

//                       <div className="action-buttons">
//                         <Link 
//                           to={`/restaurant/${restaurant._id}`}
//                           className="view-details-btn"
//                         >
//                           View Details
//                         </Link>
                        
//                         {isAdmin && (
//                           <div className="admin-actions">
//                             <button onClick={() => handleEdit(restaurant._id)} className="admin-btn edit-btn">
//                               <FaEdit />
//                             </button>
//                             <button onClick={() => handleDelete(restaurant._id)} className="admin-btn delete-btn">
//                               <FaTrash />
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   }
//                 />
//               );
//             })
//         )}
//       </section>
//     </>
//   );
// };

// export default RestaurantCollection;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaPhoneAlt, FaClock, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Items per page - display in groups of 5
  const itemsPerPage = 15; // 5 cards per row, 3 rows
  const cardsPerRow = 5;

  const filterHandler = (category, categoryId) => {
    setSelectedCategory(category);
    setActiveCategory(categoryId);
    setCurrentPage(0); // Reset to first page when changing category
  };

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        const response = await axios.get("https://bhookbuster.netlify.app/location/all");
        setRestaurants(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/category/getallcategories");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const checkUserRole = () => {
      const userRole = localStorage.getItem("userRole");
      setIsAdmin(userRole === "admin");
    };

    fetchRestaurantsData();
    fetchCategories();
    checkUserRole();
  }, []);

  useEffect(() => {
    // Update total items when filtered restaurants change
    if (restaurants.length > 0) {
      const filtered = restaurants.filter(
        (restaurant) =>
          selectedCategory === "All" ||
          restaurant.category === activeCategory
      );
      setTotalItems(filtered.length);
    }
  }, [restaurants, selectedCategory, activeCategory]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await axios.delete(`/api/locations/delete/${id}`);
        const response = await axios.get("/location/locations");
        setRestaurants(response.data.data || []);
      } catch (error) {
        console.error("Error deleting location:", error);
      }
    }
  };

  const handleEdit = (id) => {
    // Redirect to edit page or open modal
    console.log("Edit restaurant with ID:", id);
  };

  // Filter restaurants by selected category
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      selectedCategory === "All" ||
      restaurant.category === activeCategory
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  // Navigate carousel
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Shift by one row (5 cards)
  const shiftRight = () => {
    const nextGroupIndex = Math.min(currentPage * itemsPerPage + cardsPerRow, filteredRestaurants.length - itemsPerPage);
    if (nextGroupIndex >= 0) {
      const newPage = Math.floor(nextGroupIndex / itemsPerPage);
      setCurrentPage(newPage);
    }
  };

  const shiftLeft = () => {
    const prevGroupIndex = Math.max(currentPage * itemsPerPage - cardsPerRow, 0);
    const newPage = Math.floor(prevGroupIndex / itemsPerPage);
    setCurrentPage(newPage);
  };

  // Get current items to display
  const currentItems = filteredRestaurants.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Check if we should show carousel arrows
  const showCarouselArrows = filteredRestaurants.length > itemsPerPage;

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
          className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => filterHandler(category.name, category._id)}
            className={`filter-btn ${activeCategory === category._id ? "active" : ""}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="carousel-container">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading restaurants...</p>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="no-results">
            <p>No restaurants found in this category.</p>
          </div>
        ) : (
          <>
            {/* Left Arrow */}
            {showCarouselArrows && (
              <button 
                className="carousel-arrow prev" 
                onClick={shiftLeft}
                disabled={currentPage === 0}
                aria-label="Previous set of restaurants"
              >
                <FaArrowLeft />
              </button>
            )}
            
            <div className="grid-container">
              {currentItems.map((restaurant) => (
                <FlipCard
                  key={restaurant._id}
                  frontContent={
                    <div className="restaurant-front">
                      <div className="restaurant-image-container">
                        <img
                          src={restaurant.imagePath || restaurant.image || "/assets/images/default-restaurant.png"}
                          alt={restaurant.title}
                          className="restaurant-image"
                        />
                        {restaurant.discount && (
                          <div className="discount-badge">
                            {restaurant.discount} OFF
                          </div>
                        )}
                      </div>
                      <div className="restaurant-name-container">
                        <h3>{restaurant.title}</h3>
                        <p className="restaurant-type">{restaurant.foodtype}</p>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="restaurant-back">
                      <h4>{restaurant.title}</h4>
                      
                      <div className="restaurant-description">
                        {restaurant.description || "Enjoy delicious food at this amazing restaurant with authentic cuisine and wonderful ambiance!"}
                      </div>
                      
                      <div className="restaurant-details">
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
                            {restaurant.address}
                          </span>
                        </div>
                      </div>
                      
                      <div className="status-tag">
                        <span className={restaurant.active ? "active" : "inactive"}>
                          {restaurant.active ? "Open Now" : "Closed"}
                        </span>
                      </div>

                      <div className="action-buttons">
                        <Link 
                          to={`/restaurant/${restaurant._id}`}
                          className="view-btn"
                        >
                          View Details
                        </Link>
                        
                        {isAdmin && (
                          <div className="admin-buttons">
                            <button onClick={(e) => {
                              e.stopPropagation(); // Stop card flip
                              handleEdit(restaurant._id);
                            }} className="edit-btn">
                              <FaEdit />
                            </button>
                            <button onClick={(e) => {
                              e.stopPropagation(); // Stop card flip
                              handleDelete(restaurant._id);
                            }} className="delete-btn">
                              <FaTrash />
                            </button>
                            
                          </div>
                          
                        )}
                      </div>
                    </div>
                  }
                />
              ))}
            </div>

            {/* Right Arrow */}
            {showCarouselArrows && (
              <button 
                className="carousel-arrow next" 
                onClick={shiftRight}
                disabled={currentPage >= totalPages - 1}
                aria-label="Next set of restaurants"
              >
                <FaArrowRight />
              </button>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 0}
                  className="pagination-btn prev"
                >
                  <FaChevronLeft /> Prev
                </button>
                
                <div className="page-indicator">
                  {currentPage + 1} / {totalPages}
                </div>
                
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className="pagination-btn next"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
     
    </>
  );
};

export default RestaurantCollection;