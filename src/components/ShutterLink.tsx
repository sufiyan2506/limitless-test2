
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShutterLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties & { [key: string]: string };
}

const ShutterLink = ({ to, children, className, onClick, style }: ShutterLinkProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }

    // Small delay to allow for any UI state changes (like closing mobile menu)
    setTimeout(() => {
      navigate(to);
    }, 50);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
};

export default ShutterLink;
