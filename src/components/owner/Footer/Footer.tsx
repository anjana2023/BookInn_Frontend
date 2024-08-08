
const Footer = () => {
  return (
    <div>
      <footer className="relative bg-gray-800 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold text-white">
                Let's keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-white">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              {/* Social media buttons */}
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  className="bg-white  text-white  shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button
                  className="bg-white  text-white  shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-dribbble"></i>
                </button>
              
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              {/* Useful links */}
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase  text-white  text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className=" text-white  hover: text-white  font-semibold block pb-2 text-sm"
                        href="/owner/AboutUs"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className=" text-white  hover: text-white font-semibold block pb-2 text-sm"
                        href="/owner/contact"
                      >
                        Contact Us
                      </a>
                    </li>
                
                    <li>
                      <a
                        className=" text-white  hover: text-white  font-semibold block pb-2 text-sm"
                        href="/"
                      >
                        
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase  text-white  text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                   
                    <li>
                      <a
                        className=" text-white  hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/terms?ref=njs-profile"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className=" text-white  hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/privacy?ref=njs-profile"
                      >
                        Privacy Policy
                      </a>
                    </li>
                 
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-white font-semibold py-1">
                {/* Copyright section */}
                Copyright © <span id="get-current-year">2021</span>
               
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
