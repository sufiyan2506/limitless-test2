
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigationTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Match the shutter animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isTransitioning };
};
