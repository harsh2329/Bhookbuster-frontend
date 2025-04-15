import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

  const filterHandler = (category, categoryId) => {
    setSelectedCategory(category);
    setActiveCategory(categoryId);
  };

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        const response = await axios.get("/location/locations");
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

    fetchRestaurantsData();
    fetchCategories();
  }, []);

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

              return (
                <FlipCard
                  key={restaurant._id}
                  frontContent={
                    <div className="flex flex-col items-center p-4 h-full">
                      <img
                        src={image}
                        alt={restaurantName}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <strong className="text-lg text-center">{restaurantName}</strong>
                      <div className="text-sm text-gray-600 text-center">{address}</div>
                      <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {foodType}
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="flex flex-col items-center justify-center p-4 h-full">
                      <h4 className="text-lg font-bold mb-2">{restaurantName}</h4>
                      <p className="text-gray-700 text-center mb-4 text-sm">
                        {restaurant.description || "Enjoy delicious food at this amazing restaurant!"}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Timings:</strong> {restaurant.timmings}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Contact:</strong> {restaurant.contactNumber}
                      </p>
                      <Link 
                        to={`/restaurant/${restaurant._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </Link>
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

export default RestaurantCollection;