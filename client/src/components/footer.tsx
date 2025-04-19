import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
              <span className="text-xl font-bold text-white">CampusAI</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your 24/7 college assistant powered by advanced AI to make your academic journey smoother.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-white cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-white cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/faqs">
                  <span className="text-gray-300 hover:text-white cursor-pointer">FAQs</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-white cursor-pointer">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/auth">
                  <span className="text-gray-300 hover:text-white cursor-pointer">Student Login</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-file-pdf text-primary"></i>
                  <a href="#" className="text-gray-300 hover:text-white">College Brochure</a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-calendar-alt text-primary"></i>
                  <a href="#" className="text-gray-300 hover:text-white">Academic Calendar</a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-graduation-cap text-primary"></i>
                  <a href="#" className="text-gray-300 hover:text-white">Course Catalog</a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map text-primary"></i>
                  <a href="#" className="text-gray-300 hover:text-white">Campus Map</a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-book text-primary"></i>
                  <a href="#" className="text-gray-300 hover:text-white">Library Resources</a>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                <span>123 University Avenue, Academic City, ST 12345</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-phone-alt mt-1 text-primary"></i>
                <a href="tel:+11234567890" className="text-gray-300 hover:text-white">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-envelope mt-1 text-primary"></i>
                <a href="mailto:info@campusai.edu" className="text-gray-300 hover:text-white">info@campusai.edu</a>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-clock mt-1 text-primary"></i>
                <span>Mon-Fri: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} CampusAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
