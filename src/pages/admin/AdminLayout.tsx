import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import ContactManagement from './ContactManagement';
import HiringManagement from './HiringManagement';
import ContentManagement from './ContentManagement';
import PortfolioManagement from './PortfolioManagement';
import CommunityManagement from './CommunityManagement';
import Analytics from './Analytics';
import Settings from './Settings';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/dashboard') return 'Dashboard';
    if (path === '/admin/contacts') return 'Contact & Lead Management';
    if (path === '/admin/hiring') return 'Hiring & Careers';
    if (path === '/admin/content') return 'Content Management';
    if (path === '/admin/portfolio') return 'Portfolio Management';
    if (path === '/admin/community') return 'Community Management';
    if (path === '/admin/analytics') return 'Analytics & Reports';
    if (path === '/admin/settings') return 'Settings';
    return 'Admin Dashboard';
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/dashboard') return 'System overview and key metrics';
    if (path === '/admin/contacts') return 'Manage leads and inquiries';
    if (path === '/admin/hiring') return 'Track applications and recruitment';
    if (path === '/admin/content') return 'Create and manage content';
    if (path === '/admin/portfolio') return 'Showcase your work';
    if (path === '/admin/community') return 'Engage with your audience';
    if (path === '/admin/analytics') return 'Monitor performance and growth';
    if (path === '/admin/settings') return 'Configure system preferences';
    return 'Administrative control panel';
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-40 h-14 sm:h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 sm:px-6">
            <SidebarTrigger className="mr-3 sm:mr-4" />
            <div className="flex-1 flex items-center justify-between min-w-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  {isMobile ? getPageTitle().split(' ')[0] : getPageTitle()}
                </h1>
                {!isMobile && (
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {getPageDescription()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="hidden sm:flex status-online">
                  <div className="status-dot"></div>
                  <span className="text-xs sm:text-sm">Online</span>
                </div>
                <div className="sm:hidden w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contacts" element={<ContactManagement />} />
              <Route path="/hiring" element={<HiringManagement />} />
              <Route path="/content" element={<ContentManagement />} />
              <Route path="/portfolio" element={<PortfolioManagement />} />
              <Route path="/community" element={<CommunityManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;