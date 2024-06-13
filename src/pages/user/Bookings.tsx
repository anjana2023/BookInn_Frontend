import React from 'react'
import Navbar from '../../components/user/NavBar/Navbar'
import BookingsListPage from '../../components/user/Bookings'
import Footer from '../../components/user/Footer/Footer'

const BookingsList:React.FC= () => {
  return (
    <div>
      <Navbar/>
      <BookingsListPage/>
      <Footer/>
    </div>
  )
}

export default BookingsList
