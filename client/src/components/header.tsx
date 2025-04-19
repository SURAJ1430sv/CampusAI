import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  const { user, logoutMutation } = useAuth();
  const [_, navigate] = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">CampusAI</h1>
                <p className="text-xs text-gray-500">Your College Assistant</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="text-gray-700 hover:text-primary font-medium transition-colors cursor-pointer">Home</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-primary font-medium transition-colors cursor-pointer">About</span>
            </Link>
            <Link href="/faqs">
              <span className="text-gray-700 hover:text-primary font-medium transition-colors cursor-pointer">FAQs</span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-700 hover:text-primary font-medium transition-colors cursor-pointer">Contact</span>
            </Link>
            {user && (
              <Link href="/dashboard">
                <span className="text-gray-700 hover:text-primary font-medium transition-colors cursor-pointer">Dashboard</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden md:flex items-center space-x-2">
                    <User size={16} className="mr-2" />
                    <span>{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                className="hidden md:flex bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all"
                onClick={() => navigate("/auth")}
              >
                Student Login
              </Button>
            )}
            
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
