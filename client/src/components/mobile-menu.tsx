import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, User } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logoutMutation } = useAuth();
  const [_, navigate] = useLocation();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="bg-white fixed inset-0 z-40 p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
            <i className="fas fa-robot text-white"></i>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">CampusAI</h1>
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
        
        {user && (
          <Link href="/dashboard">
            <a className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded hover:bg-gray-100" onClick={onClose}>
              Dashboard
            </a>
          </Link>
        )}
        
        <div className="pt-4 border-t border-gray-200 mt-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 px-4 py-2">
                <User size={18} className="text-primary" />
                <span className="font-medium">{user.username}</span>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => {
                  logoutMutation.mutate();
                  onClose();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              onClick={() => handleNavigation("/auth")}
            >
              Student Login
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
