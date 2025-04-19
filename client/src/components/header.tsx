import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-primary-foreground"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CampusAI</h1>
                <p className="text-xs text-gray-500">Your College Assistant</p>
              </div>
            </a>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className="text-gray-700 hover:text-primary font-medium">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-gray-700 hover:text-primary font-medium">About</a>
            </Link>
            <Link href="/faqs">
              <a className="text-gray-700 hover:text-primary font-medium">FAQs</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-700 hover:text-primary font-medium">Contact</a>
            </Link>
          </nav>

          <div className="flex items-center">
            <Button variant="default" className="hidden md:block">
              Student Login
            </Button>
            <button 
              className="md:hidden text-gray-700 hover:text-primary"
              onClick={toggleMobileMenu}
              aria-label="Open mobile menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
