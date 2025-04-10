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
// import Hero from './Hero'
import Services from '../../components/Landing page/Services'
// import Item from '../../components/Landing page/Item'
import FirmCollections from '../../components/Landing page/FirmCollections'
import WhyChooseUs from '../../components/Landing page/WhyChooseUs'
import { Footer } from '../../components/Landing page/Footer'

const LandingPage = () => {
  return (
    <>
    <div><div
      // style={{
      //   backgroundImage: `url(${background})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   minHeight: "200px",
      //   width: "100%",
      // }}
    >
      <UserNavbar />
      <Hero />
      {/* <Services />   */}
     
      {/* <WhyChooseUs /> */}
      {/* <FirmCollections /> */}
      {/* <Footer /> */}

        </div>
        <div>
        <Item />
        {/* <Item /> */}
        </div>
      </div>
      </>
      );
    };
    
    export default LandingPage;
