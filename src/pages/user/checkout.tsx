import React from 'react'
import Navbar from '../../components/user/NavBar/Navbar'
import CheckoutPage from '../../components/user/CheckoutPage'
import Footer from '../../components/user/Footer/Footer'

const CheckOut:React.FC= () => {
  return (
    <div>
      <Navbar/>
      <CheckoutPage/>
      <Footer/>
    </div>
  )
}

export default CheckOut
