import React, { useState, useEffect } from 'react';
import UserNavbar from '../../user/UserNavbar';
import '../../../assets/css/Aboutus.css';

const AboutPage = () => {
  // Carousel logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "src/assets/images/spaghetti.jpg",
    "src/assets/images/Biriyani.png",
    "src/assets/images/pizza.jpg"  // Add more images as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Sarah founded Bhookh Buster with a vision to bridge the gap between restaurants and food enthusiasts.",
      imageUrl: "src/assets/images/Biriyani.png"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      bio: "Michael oversees all technical aspects of Bhookh Buster, ensuring a seamless user experience.",
      imageUrl: "src/assets/images/Biriyani.png"
    },
    {
      id: 3,
      name: "Emily Patel",
      role: "Head of Marketing",
      bio: "Emily leads our marketing initiatives to connect more users with amazing restaurant offers.",
      imageUrl: "src/assets/images/Biriyani.png"
    }
  ];

  return (
    <div className="about-page">
      <UserNavbar />
      
      {/* Carousel Section */}
      <div className="carousel-container">
        <div 
          className="carousel-slide" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-item">
              <img 
                src={image} 
                alt={`Slide ${index + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "src/assets/images/spaghetti.jpg";
                }}
              />
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={prevSlide}>&#10094;</button>
          <button className="carousel-btn" onClick={nextSlide}>&#10095;</button>
        </div>
      </div>

      {/* Rest of the existing About Page content remains the same */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Bhookh Buster</h1>
          <p>Connecting Food Lovers with Amazing Offers Since 2023</p>
        </div>
      </div>

      {/* ... (rest of the existing code remains unchanged) ... */}
    </div>
  );
};

export default AboutPage;