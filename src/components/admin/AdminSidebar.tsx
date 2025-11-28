import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  MessageCircle,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { GradientText } from '@/components/ui/gradient-text';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import limitlessLogo from '@/assets/limitless-logo.png';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Contacts & Leads',
    url: '/admin/contacts',
    icon: Users,
  },
  {
    title: 'Hiring & Careers',
    url: '/admin/hiring',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Content Management',
    url: '/admin/content',
    icon: FileText,
  },
  {
    title: 'Portfolio',
    url: '/admin/portfolio',
    icon: FolderOpen,
  },
  {
    title: 'Community',
    url: '/admin/community',
    icon: MessageCircle,
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { state, open, setOpen } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const getNavCls = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 w-full text-left min-h-[44px]";
    if (isActive(path)) {
      return `${baseClasses} bg-primary/10 text-primary border-r-2 border-primary shadow-sm`;
    }
    return `${baseClasses} hover:bg-accent/50 hover:text-accent-foreground active:scale-95`;
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  // Show text on mobile or when not collapsed
  const showText = isMobile || state !== "collapsed";

  return (
    <Sidebar 
      collapsible="icon"
      className={state === "collapsed" && !isMobile ? "w-16" : "w-64"}
    >
      <SidebarContent className="bg-background/95 backdrop-blur border-r border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-1">
            <div className="flex-shrink-0">
              <img 
                src={limitlessLogo} 
                alt="Limitless Logo" 
                className="w-7 h-7"
              />
            </div>
            {showText && (
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <GradientText
                  colors={["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"]}
                  className="text-lg font-bold leading-none"
                >
                  ADMIN
                </GradientText>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">Management Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={!showText ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg">
                    <NavLink 
                      to={item.url} 
                      className={getNavCls(item.url)}
                      onClick={handleNavClick}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {showText && (
                        <span className="font-medium truncate">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-4 border-t border-border">
          <Button
            variant="ghost"
            size={!showText ? "icon" : "default"}
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive min-h-[44px]"
            onClick={() => window.location.reload()}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {showText && <span className="font-medium ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}