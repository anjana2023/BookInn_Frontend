
import React, { ChangeEvent, FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import aboutimg from '../../assets/images/about1.png';
import Footer from '../../components/user/Footer/Footer';
import Navbar from '../../components/user/NavBar/Navbar';

interface FormData {
  name: string;
  mobilenumber: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobilenumber?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobilenumber: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [msg, setMsg] = useState<string>(''); // State to hold success or error messages
  const [msgType, setMsgType] = useState<'success' | 'error' | ''>(''); // State to hold message type
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to handle loading indicator

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = (): boolean => {
    const { name, mobilenumber, email, subject, message } = formData;
    let formErrors: FormErrors = {};
    let isValid = true;

    if (!name.trim()) {
      isValid = false;
      formErrors.name = 'Name must be filled out';
    } else if (!/^[a-zA-Z.\s]+$/.test(name)) {
      isValid = false;
      formErrors.name = 'Name must contain only alphabets and dot';
    }

    if (!mobilenumber.trim()) {
      isValid = false;
      formErrors.mobilenumber = 'Mobile Number must be filled out';
    } else if (isNaN(Number(mobilenumber))) {
      isValid = false;
      formErrors.mobilenumber = 'Mobile Number must be Digits';
    } else if (mobilenumber.length !== 10) {
      isValid = false;
      formErrors.mobilenumber = 'Mobile Number must have exactly 10 digits';
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      isValid = false;
      formErrors.email = 'Email must be a valid email address';
    }

    if (!subject.trim()) {
      isValid = false;
      formErrors.subject = 'Subject must be filled out';
    }

    if (!message.trim()) {
      isValid = false;
      formErrors.message = 'Message must be filled out';
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Show loading indicator
      // Your EmailJS service ID, template ID, and Public Key
      const serviceId = 'service_01i75zk'; // YOUR_SERVICE_ID
      const templateId = 'template_6b4et5d'; // YOUR_TEMPLATE_ID
      const publicKey = '1hQGu4XO57uQgBttm'; // YOUR_PUBLIC_KEY

      // Destructure formData for EmailJS templateParams
      const { name, email, mobilenumber, subject, message } = formData;

      // Create a new object that contains dynamic template params
      const templateParams = {
        name: name,
        email: email,
        mobilenumber: mobilenumber,
        subject: subject,
        message: message,
      };

      // Send the email using EmailJS
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully!', response);
          setMsgType('success');
          setMsg('Message sent successfully!');
          
          setFormData({
            name: '',
            mobilenumber: '',
            email: '',
            subject: '',
            message: '',
          });
          setErrors({});
          setTimeout(() => {
            setMsg('');
            setMsgType('');
            
          }, 3000); // Clear the message after 3 seconds
          setIsLoading(false); // Hide loading indicator
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          setMsgType('error');
          setMsg('Failed to send message. Please try again.');
          setTimeout(() => {
            setMsg('');
            setMsgType('');
            
          }, 3000); // Clear the message after 3 seconds
          setIsLoading(false); // Hide loading indicator
        });
    }
  };

  return (
    <section id="contact" className="contact py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-800">Contact Us</h2>
<p></p>
          <h2 className=' mt-4 font-semibold text-gray-800'>Email:bookinn@gmail.com</h2>

          <p className="text-gray-600 mt-4">We'd love to hear from you! Whether you have a question, feedback, or need support, feel free to get in touch.</p>
        </div>
        <div className="flex flex-wrap justify-center" data-aos="fade-in">
         
          <div className="w-full lg:w-7/12 flex justify-center items-center">
            <form id="form" method="post" role="form" className="php-email-form w-full p-8 bg-gray-100 rounded-lg shadow-md" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    className={`form-control w-full p-3 border border-gray-300 rounded-md ${errors.name && 'border-red-500'}`}
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="mobilenumber"
                    className={`form-control w-full p-3 border border-gray-300 rounded-md ${errors.mobilenumber && 'border-red-500'}`}
                    placeholder="Mobile Number"
                    value={formData.mobilenumber}
                    onChange={handleInputChange}
                  />
                  {errors.mobilenumber && <span className="text-red-500 text-sm">{errors.mobilenumber}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    className={`form-control w-full p-3 border border-gray-300 rounded-md ${errors.email && 'border-red-500'}`}
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    className={`form-control w-full p-3 border border-gray-300 rounded-md ${errors.subject && 'border-red-500'}`}
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                  {errors.subject && <span className="text-red-500 text-sm">{errors.subject}</span>}
                </div>
                <div className="form-group">
                  <textarea
                    id="message"
                    className={`form-control w-full p-3 border border-gray-300 rounded-md ${errors.message && 'border-red-500'}`}
                    rows={6}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
                </div>
                <div className="text-center">
                  <button type="submit" className={`btn btn-primary  p-2 rounded-md text-white font-semibold bg-orange-500 hover:bg-blue-500 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
              {msg && (
                <div className={`mt-4 text-center p-2 rounded-md ${msgType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
};

export default ContactPage;
