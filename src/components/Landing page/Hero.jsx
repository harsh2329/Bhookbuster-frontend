// 

// // Import the CSS file
// import '../../assets/css/Hero.css';

// const Hero = () => {
//   return (
//     <section className="hero-box padding-y">
//       <div className="hero-text-wrapper">
//         <article className="hero-internal-text-wrapper">
//           <h1 className="hero-heading-text">You've Got Questions.</h1>
//           <h1 className="hero-heading-text">We've Got Offers.</h1>
//           <p className="hero-subtitle-text">
//             Explore your taste with special food offers<br /> in a your place. 
//           </p>
//           <div className="hero-button-section">
//           <Link to="/offers" className="hero-text-link">View Offers</Link>
//           </div>
//         </article>
//         {/* <article className="hero-stats-wrapper"> */}
            
//           {/* <div className="border bg-neutralLineWhite" style={{width: '4.25rem', height: '0', marginTop: '2.5rem', transform: 'rotate(90deg)'}} /> */}
//           {/* <div className="text-center"> */}
//             {/* <h2 className="hero-card-stat-text">120+</h2>
//             <p className="hero-card-title-text">Stores in the world.</p> */}
//           {/* </div> */}
//         {/* </article> */}
//       </div>
      
//       {/* Quarter Circle with Images */}
//       <div className="quarter-circle-container">
//         {/* Quarter Circle Background */}
        
//         <div id="quarter-circle-background"></div>
//         {/* <img
//         src="/assets/items/hand.png"
//         alt="Hand Placement"
//         className="hands-image"
//       /> */}
        
//         {/* Udon SVG - animated with rotation */}
//         <img
//           src="../src/assets/items/pizza2.png"
//           alt="udon"
//           loading="eager"
//           className="udon-image"
//         />
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { Link } from 'react-router-dom';
import '../../assets/css/Hero.css'; 
import pizzaImage from '../../assets/images/pizza2.png';

const Hero = () => {
  return (
    <section className="hero-box padding-y">
      <div className="hero-text-wrapper">
        <article className="hero-internal-text-wrapper">
          <h1 className="hero-heading-text">You've Got Questions.</h1>
          <h1 className="hero-heading-text">We've Got Offers.</h1>
          <p className="hero-subtitle-text">
            Explore your taste with special food offers<br /> in a your place.
          </p>
          <div className="hero-button-section">
            <Link to="/offers" className="hero-text-link">View Offers</Link>
          </div>
        </article>
        <article className="hero-stats-wrapper">
          <div className="text-center">
            {/* Stats content if needed */}
          </div>
        </article>
      </div>
      
      {/* Quarter Circle with Images */}
      <div className="quarter-circle-container">
        {/* Quarter Circle Background */}
        <div id="quarter-circle-background"></div>
        
{/*         Pizza Image - centered and rotating } */}
         <img
          src={pizzaImage}
          alt="Pizza"
          loading="eager"
          className="udon-image"/>
      </div>
    </section>
  );
};

export default Hero;
