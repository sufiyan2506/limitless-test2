
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from '@/components/Navigation';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-black mb-4 gradient-text">404</h1>
          <p className="text-2xl text-white/70 mb-8">Oops! Page not found</p>
          <a href="/" className="glass px-8 py-4 rounded-full text-white hover:glass-strong transition-all inline-block">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound
