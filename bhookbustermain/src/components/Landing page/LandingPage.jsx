import React from 'react'
import ItemsDisplay from '../user/ItemsDisplays' 
import UserNavbar from '../user/UserNavbar'
import Hero from '../Landing page/Hero'
const LandingPage = () => {
  return (
    <div>
      <UserNavbar></UserNavbar>
      <Hero />
       < ItemsDisplay />
    </div>
  )
}

export default LandingPage
