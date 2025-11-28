import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
} from 'lucide-react';
import CountUp from '@/components/CountUp';

const Analytics = () => {
  // Mock analytics data - replace with your actual analytics API
  const analyticsData = {
    overview: {
      totalViews: 45720,
      uniqueVisitors: 12340,
      avgSessionDuration: '3:42',
      bounceRate: 34.2,
      conversionRate: 4.8,
    },
    traffic: {
      organic: 45.2,
      direct: 28.7,
      social: 15.6,
      referral: 8.1,
      email: 2.4,
    },
    devices: {
      desktop: 52.3,
      mobile: 38.9,
      tablet: 8.8,
    },
    topPages: [
      { page: '/', views: 15420, bounceRate: 32.1 },
      { page: '/services', views: 8750, bounceRate: 28.5 },
      { page: '/about', views: 6230, bounceRate: 41.2 },
      { page: '/contact', views: 4890, bounceRate: 15.8 },
      { page: '/work', views: 4680, bounceRate: 38.7 },
    ],
    goals: [
      { name: 'Contact Form Submissions', completions: 234, rate: 4.2 },
      { name: 'Newsletter Signups', completions: 567, rate: 8.1 },
      { name: 'Project Inquiries', completions: 89, rate: 1.6 },
      { name: 'Service Page Views', completions: 1245, rate: 22.3 },
    ],
    recentActivity: [
      { event: 'Contact form submission', location: 'New York, USA', time: '2 minutes ago' },
      { event: 'Newsletter signup', location: 'London, UK', time: '5 minutes ago' },
      { event: 'Portfolio project viewed', location: 'Toronto, Canada', time: '8 minutes ago' },
      { event: 'Blog post shared', location: 'Sydney, Australia', time: '12 minutes ago' },
      { event: 'Service inquiry', location: 'Berlin, Germany', time: '15 minutes ago' },
    ],
  };

  const getTrafficSourceColor = (source: string) => {
    switch (source) {
      case 'organic': return 'text-green-500';
      case 'direct': return 'text-blue-500';
      case 'social': return 'text-purple-500';
      case 'referral': return 'text-orange-500';
      case 'email': return 'text-pink-500';
      default: return 'text-gray-500';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return Monitor;
      case 'mobile': return Smartphone;
      case 'tablet': return Smartphone; // Using same icon for tablet
      default: return Monitor;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reporting</h1>
          <p className="text-muted-foreground">
            Monitor your website performance and user engagement
          </p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-48 glass border-white/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {[
          {
            title: 'Total Views',
            value: analyticsData.overview.totalViews,
            change: '+12.3%',
            trend: 'up',
            icon: Eye,
          },
          {
            title: 'Unique Visitors',
            value: analyticsData.overview.uniqueVisitors,
            change: '+8.7%',
            trend: 'up',
            icon: Users,
          },
          {
            title: 'Avg. Session',
            value: analyticsData.overview.avgSessionDuration,
            change: '+15.2%',
            trend: 'up',
            icon: Clock,
          },
          {
            title: 'Bounce Rate',
            value: `${analyticsData.overview.bounceRate}%`,
            change: '-5.1%',
            trend: 'up', // Lower bounce rate is better
            icon: TrendingUp,
          },
          {
            title: 'Conversion Rate',
            value: `${analyticsData.overview.conversionRate}%`,
            change: '+2.4%',
            trend: 'up',
            icon: BarChart3,
          },
        ].map((stat) => {
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
                  {typeof stat.value === 'number' ? <CountUp end={stat.value} /> : stat.value}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">vs last period</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Sources */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Traffic Sources
            </CardTitle>
            <CardDescription>
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analyticsData.traffic).map(([source, percentage]) => (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-current ${getTrafficSourceColor(source)}`} />
                    <span className="font-medium capitalize">{source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getTrafficSourceColor(source)} bg-current`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Device Breakdown
            </CardTitle>
            <CardDescription>
              Visitor device preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analyticsData.devices).map(([device, percentage]) => {
                const IconComponent = getDeviceIcon(device);
                return (
                  <div key={device} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <span className="font-medium capitalize">{device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Pages */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>
              Most visited pages on your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between p-3 rounded-lg glass-strong">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full glass flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{page.page === '/' ? 'Homepage' : page.page}</p>
                      <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={page.bounceRate < 30 ? 'text-green-500' : page.bounceRate > 40 ? 'text-red-500' : 'text-yellow-500'}>
                    {page.bounceRate}% bounce
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals & Conversions */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Goals & Conversions</CardTitle>
            <CardDescription>
              Track your business objectives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.goals.map((goal) => (
                <div key={goal.name} className="flex items-center justify-between p-3 rounded-lg glass-strong">
                  <div className="flex-1">
                    <p className="font-medium">{goal.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-primary">{goal.completions}</span>
                      <span className="text-sm text-muted-foreground">completions</span>
                    </div>
                  </div>
                  <Badge variant={goal.rate > 5 ? 'default' : 'secondary'}>
                    {goal.rate}% rate
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Real-time Activity
          </CardTitle>
          <CardDescription>
            Live visitor activity on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-strong">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <p className="font-medium">{activity.event}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {activity.location}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;