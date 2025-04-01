// import React from 'react'
// import ItemsDisplay from '../user/ItemsDisplays' 
// import UserNavbar from '../user/UserNavbar'
// import Hero from '../Landing page/Hero'
// // import item from '../Landing page/Item'
// const LandingPage = () => {
//   return (
//     <div>
//       <UserNavbar></UserNavbar>
//       <Hero />
     
//        {/* < ItemsDisplay /> */}
//     </div>
//   )
// }

// export default LandingPage
import React from "react";
import ItemsDisplay from "../user/ItemsDisplays";
import UserNavbar from "../user/UserNavbar";
import Hero from "../Landing page/Hero";
import background from "../../assets/images/background.png"; 
import Item from "../../components/Landing page/Item";// Import the background image

const LandingPage = () => {
  return (
    <>
    <div><div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "200px",
        width: "100%",
      }}
    >
      <UserNavbar />
      < Hero />


        </div>
        <div>
     
        <Item />
        </div>
      </div>
      </>
      );
    };
    
    export default LandingPage;
