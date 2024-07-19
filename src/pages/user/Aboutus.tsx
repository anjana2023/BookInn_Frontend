import React from 'react';
import Navbar from "../../components/user/NavBar/Navbar";
import Footer from "../../components/user/Footer/Footer";
import teamImage1 from '../../assets/images/about1.png'; // Replace with your actual image paths
import teamImage2 from '../../assets/images/about2.jpg'; 


const AboutUs: React.FC = () => {
  return (
    <div>
    <Navbar />
    <div className="bg-white min-h-screen py-12 px-4 md:px-8 lg:px-12">
       
      {/* Introduction Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We are committed to providing exceptional service and the best accommodations to our clients. Our team is dedicated to ensuring that your experience with us is seamless and enjoyable. Discover more about who we are and what drives us.
        </p>
      </section>
      
      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Team Member 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/3">
            <img src={teamImage1} alt="Team Member 1" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Anjana P</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <p className="mt-2">John is the visionary behind our company. With over 20 years of experience in the industry, he leads our team with passion and dedication.</p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/3">
            <img src={teamImage2} alt="Team Member 2" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-gray-600">Chief Operating Officer</p>
              <p className="mt-2">Jane ensures that our operations run smoothly. Her expertise in management helps us deliver top-notch services to our clients.</p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/3">
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Emily Johnson</h3>
              <p className="text-gray-600">Head of Customer Relations</p>
              <p className="mt-2">Emily is dedicated to ensuring customer satisfaction. She leads our support team and is always ready to assist our clients.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default AboutUs;
