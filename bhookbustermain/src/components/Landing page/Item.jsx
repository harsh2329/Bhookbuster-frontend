import React from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/Item.css';

const Item = () => {
  const navigate = useNavigate();
  
  const items = [
    { src: "src/assets/images/pizza.png", alt: "Pizza", category: "pizza" },
    { src: "src/assets/images/Burger.png", alt: "Burger", category: "burger" },
    { src: "src/assets/images/Biriyani.png", alt: "Biryani", category: "biryani" },
    { src: "src/assets/images/Shake.png", alt: "Shake", category: "shake" },
    { src: "src/assets/images/Samosa.png", alt: "Samosa", category: "samosa" },
    { src: "src/assets/images/chinese.png", alt: "Chinese", category: "chinese" },
    { src: "/assets/item/Poha.jpg", alt: "Rolls", category: "rolls" },
    { src: "src/assets/images/Cake.png", alt: "Cake", category: "cake" },
    { src: "/assets/item/cake.jpg", alt: "Dosa", category: "dosa" },
    { src: "src/assets/images/food.jpg", alt: "Momos", category: "momos" },
    { src: "/assets/item/coffe.jpg", alt: "Noodles", category: "noodles" },
    { src: "/assets/item/tea.jpg", alt: "Kachori", category: "kachori" },
    { src: "/assets/item/chaa.jpg", alt: "Chole Bhature", category: "chole-bhature" },
    { src: "/assets/item/panjabi.jpg", alt: "Pav Bhaji", category: "pav-bhaji" },
    { src: "/assets/item/dosa.jpg", alt: "Juice", category: "juice" },
    { src: "/assets/item/idli.jpg", alt: "Pakode", category: "pakode" },
    { src: "/assets/item/idli.jpg", alt: "Vada", category: "vada" },
    { src: "/assets/item/idli.jpg", alt: "Pasta", category: "pasta" },
    { src: "/assets/item/dal_bati.jpg", alt: "Dal Bati", category: "dal-bati" },
    { src: "/assets/item/gulab_jamun.jpg", alt: "Gulab Jamun", category: "gulab-jamun" },
    { src: "/assets/item/pani_puri.jpg", alt: "Pani Puri", category: "pani-puri" },
    { src: "/assets/item/rasgulla.jpg", alt: "Rasgulla", category: "rasgulla" },
    { src: "/assets/item/halwa.jpg", alt: "Halwa", category: "halwa" },
    { src: "/assets/item/kulfi.jpg", alt: "Kulfi", category: "kulfi" },
    { src: "/assets/item/malai_chaap.jpg", alt: "Malai Chaap", category: "malai-chaap" },
    { src: "/assets/item/paneer_tikka.jpg", alt: "Paneer Tikka", category: "paneer-tikka" },
    { src: "/assets/item/butter_chicken.jpg", alt: "Butter Chicken", category: "butter-chicken" },
    { src: "/assets/item/seekh_kebab.jpg", alt: "Seekh Kebab", category: "seekh-kebab" },
    { src: "/assets/item/rajma_chawal.jpg", alt: "Rajma Chawal", category: "rajma-chawal" },
    { src: "/assets/item/spring_rolls.jpg", alt: "Spring Rolls", category: "spring-rolls" },
    { src: "/assets/item/masala_dosa.jpg", alt: "Masala Dosa", category: "masala-dosa" },
    { src: "/assets/item/chicken_curry.jpg", alt: "Chicken Curry", category: "chicken-curry" },
    { src: "/assets/item/mutton_rogan.jpg", alt: "Mutton Rogan Josh", category: "mutton-rogan-josh" },
    { src: "/assets/item/palak_paneer.jpg", alt: "Palak Paneer", category: "palak-paneer" },
    { src: "/assets/item/maggi.jpg", alt: "Maggi", category: "maggi" },
    { src: "/assets/item/veg_thali.jpg", alt: "Veg Thali", category: "veg-thali" },
    { src: "/assets/item/non_veg_thali.jpg", alt: "Non-Veg Thali", category: "non-veg-thali" },
    { src: "/assets/item/sandwich.jpg", alt: "Sandwich", category: "sandwich" },
    { src: "/assets/item/springroll.jpg", alt: "Spring Roll", category: "spring-roll" },
    { src: "/assets/item/palakpaneer.jpg", alt: "Palak Paneer", category: "palak-paneer" },
    { src: "/assets/item/butterchicken.jpg", alt: "Butter Chicken", category: "butter-chicken" },
    { src: "/assets/item/rajma.jpg", alt: "Rajma Chawal", category: "rajma-chawal" },
    { src: "/assets/item/kulcha.jpg", alt: "Amritsari Kulcha", category: "amritsari-kulcha" },
    { src: "/assets/item/paneerbuttermasala.jpg", alt: "Paneer Butter Masala", category: "paneer-butter-masala" },
    { src: "/assets/item/golgappa.jpg", alt: "Golgappa", category: "golgappa" },
    { src: "/assets/item/pakora.jpg", alt: "Bhajiya", category: "bhajiya" },
    { src: "/assets/item/khichdi.jpg", alt: "Khichdi", category: "khichdi" },
    { src: "/assets/item/dhokla.jpg", alt: "Dhokla", category: "dhokla" },
    { src: "/assets/item/sweet.jpg", alt: "Gulab Jamun", category: "gulab-jamun" },
    { src: "/assets/item/rasmalai.jpg", alt: "Rasmalai", category: "rasmalai" },
    { src: "/assets/item/halwa.jpg", alt: "Gajar Ka Halwa", category: "gajar-ka-halwa" },
    { src: "/assets/item/kheer.jpg", alt: "Kheer", category: "kheer" },
    { src: "/assets/item/jalebi.jpg", alt: "Jalebi", category: "jalebi" },
    { src: "/assets/item/lassi.jpg", alt: "Lassi", category: "lassi" },
    { src: "/assets/item/malai.jpg", alt: "Rabri", category: "rabri" }
  ];

  // Function to handle item click and navigate to detail page
  const handleItemClick = (category) => {
    navigate(`/food/${category}`);
  };

  return (
    <section className="item-container">
    <div className="item-grid">
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div
            className="item-card"
            key={item.id || index}
            onClick={() => handleItemClick(item.category)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={item.src || item.image} 
              alt={item.alt || item.name} 
              className="item-image" 
            />
            <h3>{item.name || item.category || item.alt}</h3>
          </div>
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  </section>
  );
};

export default Item;