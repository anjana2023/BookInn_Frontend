import React from 'react'
import Navbar from '../../components/user/NavBar/Navbar'
import ViewBooking from '../../components/user/viewBooking'
import Footer from '../../components/user/Footer/Footer'

const BookingDetails:React.FC= () => {
  return (
    <div>
      <Navbar/>
      <ViewBooking/>
      <Footer/>
    </div>
  )
}

export default BookingDetails
