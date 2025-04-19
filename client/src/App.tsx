import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import FAQs from "@/pages/faqs";
import Contact from "@/pages/contact";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatButton from "@/components/chat/chat-button";
import MobileMenu from "@/components/mobile-menu";
import { useState } from "react";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/faqs" component={FAQs} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth" component={AuthPage} />
      {/* Protected routes */}
      <ProtectedRoute path="/dashboard" component={() => <div className="p-16 text-center">Student Dashboard Coming Soon</div>} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header toggleMobileMenu={toggleMobileMenu} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
            <ChatButton />
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
