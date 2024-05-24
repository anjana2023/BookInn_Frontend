import React from 'react'
import Navbar from '../../components/user/NavBar/Navbar'
import HotelDetail from '../../components/user/HotelDetail'
import Footer from '../../components/user/Footer/Footer'

const HotelDetails:React.FC= () => {
  return (
    <div>
      <Navbar/>
      <HotelDetail/>
      <Footer/>
    </div>
  )
}

export default HotelDetails
