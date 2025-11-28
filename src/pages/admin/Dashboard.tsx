import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  BriefcaseBusiness, 
  FileText, 
  TrendingUp,
  Activity,
  Eye,
  Calendar,
} from 'lucide-react';
import CountUp from '@/components/CountUp';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Contacts',
      value: 1247,
      change: '+12%',
      trend: 'up',
      icon: Users,
      description: 'Active leads & inquiries',
    },
    {
      title: 'Job Applications',
      value: 89,
      change: '+23%',
      trend: 'up', 
      icon: BriefcaseBusiness,
      description: 'Pending applications',
    },
    {
      title: 'Blog Posts',
      value: 34,
      change: '+5%',
      trend: 'up',
      icon: FileText,
      description: 'Published articles',
    },
    {
      title: 'Monthly Views',
      value: 15420,
      change: '+18%',
      trend: 'up',
      icon: Eye,
      description: 'Page impressions',
    },
  ];

  const recentActivities = [
    {
      type: 'contact',
      message: 'New contact form submission from Sarah Johnson',
      time: '2 minutes ago',
      priority: 'high',
    },
    {
      type: 'application',
      message: 'Job application received for Senior Developer role',
      time: '15 minutes ago',
      priority: 'medium',
    },
    {
      type: 'content',
      message: 'Blog post "AI Trends 2024" published successfully',
      time: '1 hour ago',
      priority: 'low',
    },
    {
      type: 'portfolio',
      message: 'Project "E-commerce Platform" updated',
      time: '3 hours ago',
      priority: 'medium',
    },
  ];

  const quickActions = [
    { label: 'Add Blog Post', path: '/admin/content', icon: FileText },
    { label: 'View Contacts', path: '/admin/contacts', icon: Users },
    { label: 'Check Applications', path: '/admin/hiring', icon: BriefcaseBusiness },
    { label: 'Site Analytics', path: '/admin/analytics', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  <CountUp end={stat.value} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and notifications from your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg glass-strong">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === 'high' ? 'bg-red-500' :
                    activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant="ghost"
                    className="w-full justify-start glass-strong hover:bg-primary/10"
                    onClick={() => window.location.href = action.path}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;