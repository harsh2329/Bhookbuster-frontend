import { Link } from 'react-router-dom';
// Import the CSS file
import '../../assets/css/Hero.css';

const Hero = () => {
  return (
    <section className="hero-box padding-y">
      <div className="hero-text-wrapper">
        <article className="hero-internal-text-wrapper">
          <h1 className="hero-heading-text">You've Got Questions.</h1>
          <h1 className="hero-heading-text">We've Got Offers.</h1>
          <p className="hero-subtitle-text">
            Explore your taste with special food offers in a your place. 
          </p>
          <div className="hero-button-section">
            <Link to="/menu" className="hero-text-link">View Offers</Link>
          </div>
        </article>
        <article className="hero-stats-wrapper">
          
          {/* <div className="border bg-neutralLineWhite" style={{width: '4.25rem', height: '0', marginTop: '2.5rem', transform: 'rotate(90deg)'}} /> */}
          <div className="text-center">
            {/* <h2 className="hero-card-stat-text">120+</h2>
            <p className="hero-card-title-text">Stores in the world.</p> */}
          </div>
        </article>
      </div>
      
      {/* Quarter Circle with Images */}
      <div className="quarter-circle-container">
        {/* Quarter Circle Background */}
        <div id="quarter-circle-background"></div>
        
        {/* Udon SVG - animated with rotation */}
        <img
          src="../src/assets/items/pizza2.png"
          alt="udon"
          loading="eager"
          className="udon-image"
        />
        
        {/* Sugar SVG - positioned at top of quarter circle */}
        {/* <img
          src="../src/assets/items/burger2.png"
          alt="sugar"
          className="sugar-image"
        /> */}
        
        {/* Chopstick SVG - positioned at left of quarter circle */}
        {/* <img
          src="../src/assets/items/freshf2.png"
          alt="chopstick"
          className="chopstick-image"
        /> */}
      </div>
    </section>
  );
};

export default Hero;