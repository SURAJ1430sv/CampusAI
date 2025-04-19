import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-white fixed inset-0 z-40 p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <i className="fas fa-robot text-primary-foreground"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-900">CampusAI</h1>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-700"
          aria-label="Close menu"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link href="/">
          <a className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={onClose}>
            Home
          </a>
        </Link>
        <Link href="/about">
          <a className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={onClose}>
            About
          </a>
        </Link>
        <Link href="/faqs">
          <a className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={onClose}>
            FAQs
          </a>
        </Link>
        <Link href="/contact">
          <a className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={onClose}>
            Contact
          </a>
        </Link>
        <Button className="mt-4" onClick={onClose}>
          Student Login
        </Button>
      </nav>
    </div>
  );
}
