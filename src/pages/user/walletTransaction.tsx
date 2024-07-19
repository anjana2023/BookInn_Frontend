import React from "react"
import Transaction from "../../components/user/transactionHistory"
import Navbar from "../../components/user/NavBar/Navbar";
import Footer from "../../components/user/Footer/Footer";


const walletHistroy :React.FC =() => (
    <>
    <Navbar />
    <Transaction/>
    <Footer />
    </>
);

export default walletHistroy
