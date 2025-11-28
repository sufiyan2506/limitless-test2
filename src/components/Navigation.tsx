import { useState } from 'react';
import ShutterLink from './ShutterLink';
import { Menu, X, Home, User, Briefcase, FolderOpen, Lightbulb, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import { PopupButton } from "react-calendly";

interface NavigationItem {
  /** Display name for the navigation item */
  name: string;
  /** Route path for navigation */
  href: string;
  /** Lucide React icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Gradient start color (CSS color value) */
  gradientFrom: string;
  /** Gradient end color (CSS color value) */
  gradientTo: string;
}

/**
 * Navigation - Main site navigation component with responsive design
 * 
 * Features:
 * - Fixed header with backdrop blur effect
 * - Desktop navigation with gradient hover animations
 * - Mobile/tablet collapsible menu overlay
 * - Animated gradient backgrounds for each nav item
 * - Consultation CTA button
 * - Status indicator for availability
 * 
 * @returns JSX element containing the complete navigation system
 * 
 * @example
 * ```tsx
 * <Navigation />
 * ```
 */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  /** Navigation items configuration with icons and gradient colors */
  const navItems: NavigationItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      gradientFrom: '#a955ff',
      gradientTo: '#ea51ff'
    },
    {
      name: 'About',
      href: '/about',
      icon: User,
      gradientFrom: '#56CCF2',
      gradientTo: '#2F80ED'
    },
    {
      name: 'Services',
      href: '/services',
      icon: Briefcase,
      gradientFrom: '#FF9966',
      gradientTo: '#FF5E62'
    },
    {
      name: 'Work',
      href: '/work',
      icon: FolderOpen,
      gradientFrom: '#80FF72',
      gradientTo: '#7EE8FA'
    },
    {
      name: 'Insights',
      href: '/insights',
      icon: Lightbulb,
      gradientFrom: '#ffa9c6',
      gradientTo: '#f434e2'
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: Mail,
      gradientFrom: '#FFD700',
      gradientTo: '#FF8C00'
    }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 bg-black/30 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <ShutterLink to="/" className="glass rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3 hover:glass-strong transition-all">
            <img src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png" alt="Limitless Logo" className="w-6 h-6 md:w-8 md:h-8" />
            <GradientText
              colors={["#ffffff", "#a1a1aa", "#71717a", "#ffffff"]}
              animationSpeed={4}
              className="text-lg md:text-xl font-black drop-shadow-sm"
            >
              LIMITLESS
            </GradientText>
          </ShutterLink>

          {/* Desktop Navigation with Gradient Menu Animation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <ShutterLink
                    key={item.name}
                    to={item.href}
                    style={{
                      '--gradient-from': item.gradientFrom,
                      '--gradient-to': item.gradientTo
                    } as React.CSSProperties & { [key: string]: string }}
                    className="relative w-[50px] h-[50px] glass rounded-full flex items-center justify-center transition-all duration-500 hover:w-[140px] hover:shadow-none group cursor-pointer"
                  >
                    {/* Gradient background on hover */}
                    <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
                    {/* Blur glow */}
                    <span className="absolute top-[5px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

                    {/* Icon */}
                    <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
                      <IconComponent className="w-5 h-5 text-white/80" />
                    </span>

                    {/* Title */}
                    <span className="absolute text-white uppercase tracking-wide text-xs transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
                      {item.name}
                    </span>
                  </ShutterLink>
                );
              })}
            </div>
          </div>

          {/* Desktop Consultation Button */}
          <div className="hidden lg:flex">
            <PopupButton
              url="https://calendly.com/hello-thinklimitless/30min"
              rootElement={document.getElementById("root") as HTMLElement}
              text={
                <Button 
                  variant="outline" 
                  className="glass rounded-full px-6 py-3 text-white border-white/20 hover:glass-strong hover:border-white/40 transition-all duration-300 group"
                >
                  <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Free Consultation</span>
                </Button>
              }
            />
          </div>

          {/* Mobile & Tablet Menu Button */}
          <button
            className="lg:hidden glass rounded-full p-3 hover:glass-strong transition-all border-2 border-white/20"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
          
          {/* Menu Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div className="flex items-center gap-3">
                <img src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png" alt="Limitless Logo" className="w-8 h-8" />
                <GradientText
                  colors={["#ffffff", "#a1a1aa", "#71717a", "#ffffff"]}
                  animationSpeed={4}
                  className="text-xl font-black drop-shadow-sm"
                >
                  LIMITLESS
                </GradientText>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="glass rounded-full p-3 hover:glass-strong transition-all border border-white/20"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 flex flex-col justify-center px-6">
              <div className="space-y-4">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <ShutterLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        '--gradient-from': item.gradientFrom,
                        '--gradient-to': item.gradientTo,
                        animationDelay: `${index * 100}ms`
                      } as React.CSSProperties & { [key: string]: string }}
                      className="relative w-full h-[60px] glass rounded-xl flex items-center px-6 transition-all duration-500 hover:shadow-none group cursor-pointer animate-fade-in"
                    >
                      {/* Gradient background on hover */}
                      <span className="absolute inset-0 rounded-xl bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
                      {/* Blur glow */}
                      <span className="absolute top-[3px] inset-x-0 h-full rounded-xl bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-30"></span>

                      {/* Icon and Text Container */}
                      <div className="relative z-10 flex items-center gap-4 w-full">
                        <IconComponent className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300" />
                        <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                          {item.name}
                        </span>
                      </div>
                    </ShutterLink>
                  );
                })}
                
                {/* Mobile Consultation Button */}
                <div
                  style={{
                    '--gradient-from': 'hsl(var(--limitless-primary))',
                    '--gradient-to': 'hsl(var(--limitless-accent))',
                    animationDelay: `${navItems.length * 100}ms`
                  } as React.CSSProperties & { [key: string]: string }}
                  className="relative w-full h-[60px] glass rounded-xl animate-fade-in"
                >
                  {/* Gradient background on hover */}
                  <span className="absolute inset-0 rounded-xl bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
                  {/* Blur glow */}
                  <span className="absolute top-[3px] inset-x-0 h-full rounded-xl bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-30"></span>

                  <div className="absolute inset-0 flex items-center px-6 pointer-events-none z-20">
                    <Calendar className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <PopupButton
                    url="https://calendly.com/hello-thinklimitless/30min"
                    rootElement={document.getElementById("root") as HTMLElement}
                    text="Free Consultation"
                    className="relative z-10 w-full h-full flex items-center transition-all duration-500 hover:shadow-none group cursor-pointer border-2 border-white/20 rounded-xl bg-transparent"
                    styles={{
                      border: 'none',
                      background: 'transparent',
                      color: 'white',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '4.0rem',
                      paddingRight: '1.5rem',
                      fontSize: '1.125rem',
                      fontWeight: '500'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Status indicator at bottom */}
            <div className="px-6 py-6 border-t border-white/20">
              <div className="status-online">
                <div className="status-dot"></div>
                <span>Available for New Projects</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;