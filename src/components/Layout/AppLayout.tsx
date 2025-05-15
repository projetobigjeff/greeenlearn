
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Leaf, Sun, BookOpen, Award, Users, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'visitor'>('student');
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigationItems = [
    { name: "Início", icon: Home, path: "/" },
    { name: "Desafios", icon: Leaf, path: "/challenges" },
    { name: "Loja", icon: ShoppingBag, path: "/store" },
    { name: "Ranking", icon: Award, path: "/ranking" },
    { name: "Aprendizado", icon: BookOpen, path: "/learning" },
    ...(userRole === 'teacher' ? [{ name: "Painel", icon: Users, path: "/teacher" }] : []),
    { name: "Perfil", icon: Users, path: "/profile" },
  ];

  // Handle back button for a more native app feel
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [isOpen]);

  // Show a "welcome" toast on first load to simulate app launch
  useEffect(() => {
    if (location.pathname === '/') {
      const hasShownWelcome = sessionStorage.getItem('welcomeShown');
      if (!hasShownWelcome) {
        setTimeout(() => {
          toast("Bem-vindo ao GreenLearn", {
            description: "Aprenda sobre meio ambiente e ganhe pontos!",
            position: "bottom-center"
          });
          sessionStorage.setItem('welcomeShown', 'true');
        }, 1000);
      }
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top App Bar */}
      <header className="mobile-header h-16 flex items-center px-4 justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground mr-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Sun className="h-6 w-6 animate-leaf-sway" />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">GreenLearn</h1>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
        <div className="flex flex-col w-3/4 max-w-sm h-full bg-card shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-lg font-bold">GreenLearn</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <span className="sr-only">Close</span>
              ×
            </Button>
          </div>
          <nav className="flex flex-col p-4 space-y-2 overflow-y-auto">
            {navigationItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path}
                className={cn(
                  "p-3 rounded-md flex items-center space-x-3 tap-animation",
                  isActive(item.path) 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent/50"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area with extra padding for the bottom tab bar */}
      <main className="mobile-content pt-16">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <div className="mobile-tabbar h-16">
        <nav className="flex justify-around h-full">
          {navigationItems.slice(0, 5).map(item => (
            <Link 
              key={item.name} 
              to={item.path}
              className={cn(
                "h-full flex flex-col items-center justify-center w-full tap-animation",
                isActive(item.path) 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
