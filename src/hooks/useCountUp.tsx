
import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  enableScrollSpy?: boolean;
}

export const useCountUp = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  separator = '',
  enableScrollSpy = true,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const formatNumber = (num: number) => {
    let formattedNum = num.toFixed(decimals);
    
    if (separator && num >= 1000) {
      formattedNum = num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    
    return `${prefix}${formattedNum}${suffix}`;
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentCount = start + (end - start) * easeOutQuart;

    setCount(currentCount);

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    }
  };

  const startAnimation = () => {
    if (!hasStarted) {
      setHasStarted(true);
      startTimeRef.current = undefined;
      frameRef.current = requestAnimationFrame(animate);
    }
  };

  // Setup IntersectionObserver once (or when enableScrollSpy changes), without cancelling RAF on state changes
  useEffect(() => {
    if (!enableScrollSpy) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [enableScrollSpy]);

  // Only cancel the animation on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    count: formatNumber(count),
    countRef,
    hasStarted,
  };
};
