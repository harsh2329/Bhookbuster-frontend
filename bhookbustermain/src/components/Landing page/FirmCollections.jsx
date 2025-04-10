// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const FirmCollections = () => {
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [activeCategory, setActiveCategory] = useState("all");

//   const firmData = [
//     {
//       firm: [
//         {
//           _id: "1",
//           firmName: "Spice Delight",
//           image: "src/assets/images/Shake.png",
//           offer: "20% Off",
//           region: ["south-indian"],
//           area: "Banjara Hills",
//         },
//         {
//           _id: "2",
//           firmName: "Tandoori Flames",
//           image: "src/assets/images/Biriyani.png",
//           offer: "15% Off",
//           region: ["north-indian"],
//           area: "Kukatpally",
//         },
//         {
//           _id: "3",
//           firmName: "Chinese Wok",
//           image: "src/assets/images/Burger.png",
//           offer: "10% Off",
//           region: ["chinese"],
//           area: "Madhapur",
//         },
//         {
//           _id: "4",
//           firmName: "Chinese Wok",
//           image: "src/assets/images/pizza.png",
//           offer: "10% Off",
//           region: ["chinese"],
//           area: "Madhapur",
//         },
//         {
//           _id: "5",
//           firmName: "Tandoori Flames",
//           image: "/assets/tandoori-flames.jpg",
//           offer: "15% Off",
//           region: ["north-indian"],
//           area: "Banjara Hills",
//         },
//       ],
//     },
//   ];

//   const filterHandler = (region, category) => {
//     setSelectedRegion(region);
//     setActiveCategory(category);
//   };

//   return (
//     <>
//     <div className="hero-box-padding-y">
//       <h3>Why Pay More? Get the Best Food Offers Now!</h3>
//     </div>
//       <div className="filterButtons">
//         {[
//           { label: "All", region: "All", category: "all" },
//           { label: "South-Indian", region: "South-Indian", category: "south-indian" },
//           { label: "North-Indian", region: "North-Indian", category: "north-indian" },
//           { label: "Chinese", region: "Chinese", category: "chinese" },
//           { label: "Bakery", region: "Bakery", category: "bakery" },
//         ].map(({ label, region, category }) => (
//           <button
//             key={category}
//             onClick={() => filterHandler(region, category)}
//             className={activeCategory === category ? "activeButton" : ""}
//           >
//             {label}
//           </button>
//         ))}
//       </div>
//       <section className="firmSection">
//         {firmData.map((vendor) =>
//           vendor.firm.map((item) =>
//             selectedRegion === "All" || item.region.includes(selectedRegion.toLowerCase()) ? (
//               <Link to={`/products/${item._id}/${item.firmName}`} className="link" key={item._id}>
//                 <div className="zoomEffect">
//                   <div className="firmGroupBox">
//                     <div className="firmGroup">
//                       <img src={item.image} alt={item.firmName} />
//                       <div className="firmOffer">{item.offer}</div>
//                     </div>
//                     <div className="firmDetails">
//                       <strong>{item.firmName}</strong>
//                       <br />
//                       <div className="firmArea">{item.region.join(", ")}</div>
//                       <div className="firmArea">{item.area}</div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ) : null
//           )
//         )}
//       </section>
//     </>
//   );
// };

// export default FirmCollections;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");
  const [firmData, setFirmData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category);
  };

  useEffect(() => {
    const fetchFirmData = async () => {
      try {
        const response = await fetch("http://localhost:8000/locations"); 
        const data = await response.json();
        setFirmData(data); // make sure your API returns an array of firm objects
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        setLoading(false);
      }
    };

    fetchFirmData();
  }, []);

  return (
    <>
      <div className="hero-box-padding-y">
        <h3>Why Pay More? Get the Best Food Offers Now!</h3>
      </div>

      <div className="filterButtons">
        {[
          { label: "All", region: "All", category: "all" },
          { label: "South-Indian", region: "South-Indian", category: "south-indian" },
          { label: "North-Indian", region: "North-Indian", category: "north-indian" },
          { label: "Chinese", region: "Chinese", category: "chinese" },
          { label: "Bakery", region: "Bakery", category: "bakery" },
        ].map(({ label, region, category }) => (
          <button
            key={category}
            onClick={() => filterHandler(region, category)}
            className={activeCategory === category ? "activeButton" : ""}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="firmSection">
        {loading ? (
          <p>Loading offers...</p>
        ) : (
          firmData
            .filter(
              (item) =>
                selectedRegion === "All" ||
                item.region.includes(selectedRegion.toLowerCase())
            )
            .map((item) => {
              const firmName = item.firmName || item.title; // Fallback if firmName not available
              const image = item.image; // Default image fallback
              const offer = item.offer || "10% Off"; // Default if not set
              const region = item.region || [item.category?.toLowerCase()] || ["others"];
              const area = item.area || item.address || "Unknown";
            
              return (
                <Link
                  to={`/products/${item._id}/${firmName}`}
                  className="link"
                  key={item._id}
                >
                  <div className="zoomEffect">
                    <div className="firmGroupBox">
                      <div className="firmGroup">
                        <img src={image} alt={firmName} />
                        <div className="firmOffer">{offer}</div>
                      </div>
                      <div className="firmDetails">
                        <strong>{firmName}</strong>
                        <br />
                        <div className="firmArea">{region.join(", ")}</div>
                        <div className="firmArea">{area}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
        )}
      </section>
    </>
  );
};

export default FirmCollections;