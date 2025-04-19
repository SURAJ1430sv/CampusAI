import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-primary-foreground"></i>
              </div>
              <span className="text-xl font-bold text-white">CampusAI</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your 24/7 college assistant powered by advanced AI to make your academic journey smoother.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/features">
                  <a className="text-gray-400 hover:text-white">Features</a>
                </Link>
              </li>
              <li>
                <Link href="/faqs">
                  <a className="text-gray-400 hover:text-white">FAQs</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">College Brochure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Academic Calendar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Career Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Campus Map</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Library</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                <span>123 University Avenue, Academic City, ST 12345</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-phone-alt mt-1 text-primary"></i>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-envelope mt-1 text-primary"></i>
                <span>info@campusai.edu</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CampusAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
