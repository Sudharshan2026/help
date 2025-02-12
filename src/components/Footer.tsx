import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Logo Section */}
          <div className="md:col-span-4">
            <div className="space-y-4">
              <Link to="/">
                <img 
                  src="https://ai.sairam.edu.in/wp-content/themes/sairamdept/sd-assets/images/sairam-engineering-college.png"
                  alt="Sairam Engineering College"
                  className="h-16 object-contain"
                />
              </Link>
              <Link to="/">
                <img 
                  src="https://ai.sairam.edu.in/wp-content/themes/sairamdept/sd-assets/images/sairam_institutions-logo.png"
                  alt="Sairam Institutions"
                  className="h-16 object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-4">
            <div className="space-y-4">
              <h5 className="text-lg font-bold text-[#bd9607]">CONTACT US</h5>
              <h6 className="font-semibold">SRI SAI RAM ENGINEERING COLLEGE</h6>
              <p className="text-gray-600">
                Sai Leo Nagar, West Tambaram,<br />
                Chennai - 600044, Tamil Nadu, India.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex">
                  <span className="w-16">Phone:</span>
                  <span>
                    <a href="tel:+914422512111" className="hover:text-[#bd9607]">+91-44-22512111</a> /{' '}
                    <a href="tel:+914422512333" className="hover:text-[#bd9607]">2251 2333</a>
                    <br />
                    <a href="tel:+914422512444" className="hover:text-[#bd9607]">+91-44-22512444</a>
                  </span>
                </li>
                <li className="flex">
                  <span className="w-16">Fax:</span>
                  <a href="tel:+914422512323" className="hover:text-[#bd9607]">+91-44-22512323</a>
                </li>
                <li className="flex">
                  <span className="w-16">Mail:</span>
                  <span>
                    <a href="mailto:sairam@sairam.edu.in" className="hover:text-[#bd9607]">sairam@sairam.edu.in</a>,{' '}
                    <a href="mailto:career@sairam.edu.in" className="hover:text-[#bd9607]">career@sairam.edu.in</a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-4 space-y-8">
            {/* Explore Links */}
            <div>
              <h5 className="text-lg font-bold text-[#bd9607] mb-4">EXPLORE</h5>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-[#bd9607]">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-[#bd9607]">The Department</Link></li>
                <li><Link to="/internship" className="text-gray-600 hover:text-[#bd9607]">Internship</Link></li>
                <li><Link to="/student" className="text-gray-600 hover:text-[#bd9607]">Student</Link></li>
                <li><Link to="/faculty" className="text-gray-600 hover:text-[#bd9607]">Faculty</Link></li>
                <li><Link to="/media" className="text-gray-600 hover:text-[#bd9607]">Media</Link></li>
                <li><Link to="/course-material" className="text-gray-600 hover:text-[#bd9607]">Course Material</Link></li>
                <li><Link to="/bos-members" className="text-gray-600 hover:text-[#bd9607]">BOS Members</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-bold text-[#bd9607] mb-4">QUICK LINKS</h5>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://ai.sairam.edu.in/wp-content/uploads/sites/10/2024/06/AI-_-DS-SYLLABUS-BOOK-26-09-2022.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#bd9607]"
                  >
                    Curriculum & Syllabus
                  </a>
                </li>
                <li><Link to="/news-events" className="text-gray-600 hover:text-[#bd9607]">News & Events</Link></li>
                <li><Link to="/event-gallery" className="text-gray-600 hover:text-[#bd9607]">Event Gallery</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600 text-center">
              &copy; Sri Sairam Engineering College, 2025. <span>All rights reserved</span>
            </p>

            {/* Social Media Links */}
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com/sairamec" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#bd9607]">
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/sairam_EC" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#bd9607]">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/c/sairaminstitutions" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#bd9607]">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/sairamec/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#bd9607]">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/sairam-ec" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#bd9607]">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </li>
            </ul>

            {/* Powered By */}
            <p className="text-gray-600 text-sm flex items-center space-x-2">
              Powered by{' '}
              <a href="https://itechindia.co/" title="iTech India Pvt Ltd" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://ai.sairam.edu.in/wp-content/themes/sairamdept/sd-assets/images/itech-logo.png" 
                  alt="iTech" 
                  className="h-8 object-contain"
                />
              </a>
            </p>

            {/* Mobile Footer Logo */}
            <div className="md:hidden">
              <Link to="/">
                <img 
                  src="https://ai.sairam.edu.in/wp-content/themes/sairamdept/sd-assets/images/sairam_institutions-logo.png"
                  alt="Sairam Institutions"
                  className="h-12 object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};