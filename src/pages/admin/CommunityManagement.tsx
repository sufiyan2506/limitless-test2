import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Download, 
  Mail,
  Calendar,
  Users,
  TrendingUp,
  UserPlus,
  MessageCircle,
  Globe,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CommunityMember {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: 'website' | 'social' | 'referral' | 'newsletter';
  tags: string[];
  joinedAt: string;
  lastActive?: string;
  engagement: 'high' | 'medium' | 'low';
  location?: string;
  preferences: {
    newsletter: boolean;
    updates: boolean;
    marketing: boolean;
  };
}

interface Newsletter {
  id: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent';
  scheduledFor?: string;
  sentAt?: string;
  recipients: number;
  openRate?: number;
  clickRate?: number;
  createdAt: string;
}

const CommunityManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [engagementFilter, setEngagementFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'members' | 'newsletters'>('members');

  // Mock data - replace with your API integration
  const mockMembers: CommunityMember[] = [
    {
      id: '1',
      email: 'sarah.johnson@email.com',
      name: 'Sarah Johnson',
      status: 'active',
      source: 'website',
      tags: ['premium', 'early-adopter'],
      joinedAt: '2024-01-10T10:30:00Z',
      lastActive: '2024-01-15T14:20:00Z',
      engagement: 'high',
      location: 'New York, USA',
      preferences: {
        newsletter: true,
        updates: true,
        marketing: true,
      },
    },
    {
      id: '2',
      email: 'mike.chen@startup.co',
      name: 'Mike Chen',
      status: 'active',
      source: 'social',
      tags: ['developer', 'startup'],
      joinedAt: '2024-01-08T09:15:00Z',
      lastActive: '2024-01-14T11:30:00Z',
      engagement: 'medium',
      location: 'San Francisco, USA',
      preferences: {
        newsletter: true,
        updates: true,
        marketing: false,
      },
    },
    {
      id: '3',
      email: 'emily.rodriguez@corp.com',
      status: 'unsubscribed',
      source: 'referral',
      tags: ['enterprise'],
      joinedAt: '2024-01-05T16:45:00Z',
      engagement: 'low',
      location: 'London, UK',
      preferences: {
        newsletter: false,
        updates: false,
        marketing: false,
      },
    },
  ];

  const mockNewsletters: Newsletter[] = [
    {
      id: '1',
      subject: 'AI Trends Weekly - January Edition',
      content: 'This week in AI: Latest breakthroughs and industry insights...',
      status: 'sent',
      sentAt: '2024-01-15T09:00:00Z',
      recipients: 1247,
      openRate: 68.5,
      clickRate: 12.3,
      createdAt: '2024-01-14T15:00:00Z',
    },
    {
      id: '2',
      subject: 'New Features & Product Updates',
      content: 'Exciting new features are now live in your dashboard...',
      status: 'scheduled',
      scheduledFor: '2024-01-20T10:00:00Z',
      recipients: 1250,
      createdAt: '2024-01-16T11:30:00Z',
    },
    {
      id: '3',
      subject: 'Community Spotlight: Success Stories',
      content: 'Featuring amazing projects from our community members...',
      status: 'draft',
      recipients: 0,
      createdAt: '2024-01-16T14:00:00Z',
    },
  ];

  const [members] = useState<CommunityMember[]>(mockMembers);
  const [newsletters] = useState<Newsletter[]>(mockNewsletters);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-500';
      case 'unsubscribed': return 'bg-red-500/10 text-red-500';
      case 'bounced': return 'bg-yellow-500/10 text-yellow-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high': return 'bg-green-500/10 text-green-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'low': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getNewsletterStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500/10 text-green-500';
      case 'scheduled': return 'bg-blue-500/10 text-blue-500';
      case 'draft': return 'bg-yellow-500/10 text-yellow-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesEngagement = engagementFilter === 'all' || member.engagement === engagementFilter;
    
    return matchesSearch && matchesStatus && matchesEngagement;
  });

  const exportMembers = () => {
    toast({
      title: "Export Started",
      description: "Community member data is being prepared for download.",
    });
  };

  const sendNewsletter = (newsletterId: string) => {
    toast({
      title: "Newsletter Scheduled",
      description: "Your newsletter has been queued for delivery.",
    });
  };

  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;
  const avgOpenRate = newsletters.filter(n => n.openRate).reduce((sum, n) => sum + (n.openRate || 0), 0) / newsletters.filter(n => n.openRate).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Management</h1>
          <p className="text-muted-foreground">
            Manage newsletter subscribers and community engagement
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportMembers} className="glass border-white/20">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="glass-strong">
            <Mail className="w-4 h-4 mr-2" />
            Create Newsletter
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { 
            label: 'Total Members', 
            value: totalMembers, 
            color: 'text-blue-500', 
            icon: Users,
            description: 'Community members'
          },
          { 
            label: 'Active Subscribers', 
            value: activeMembers, 
            color: 'text-green-500', 
            icon: UserPlus,
            description: 'Active subscriptions'
          },
          { 
            label: 'Avg. Open Rate', 
            value: `${avgOpenRate.toFixed(1)}%`, 
            color: 'text-purple-500', 
            icon: TrendingUp,
            description: 'Newsletter performance'
          },
          { 
            label: 'Newsletters Sent', 
            value: newsletters.filter(n => n.status === 'sent').length, 
            color: 'text-orange-500', 
            icon: MessageCircle,
            description: 'This month'
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className={`text-sm font-medium ${stat.color}`}>{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'members' ? 'default' : 'outline'}
          onClick={() => setActiveTab('members')}
          className={activeTab === 'members' ? 'glass-strong' : 'glass border-white/20'}
        >
          <Users className="w-4 h-4 mr-2" />
          Members ({totalMembers})
        </Button>
        <Button
          variant={activeTab === 'newsletters' ? 'default' : 'outline'}
          onClick={() => setActiveTab('newsletters')}
          className={activeTab === 'newsletters' ? 'glass-strong' : 'glass border-white/20'}
        >
          <Mail className="w-4 h-4 mr-2" />
          Newsletters ({newsletters.length})
        </Button>
      </div>

      {/* Members Tab */}
      {activeTab === 'members' && (
        <>
          {/* Filters */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Filters & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 glass border-white/20"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 glass border-white/20">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                    <SelectItem value="bounced">Bounced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={engagementFilter} onValueChange={setEngagementFilter}>
                  <SelectTrigger className="w-full sm:w-40 glass border-white/20">
                    <SelectValue placeholder="Engagement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Engagement</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Members Table */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Community Members ({filteredMembers.length})</CardTitle>
              <CardDescription>
                Newsletter subscribers and community participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/20 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-white/20">
                      <TableHead>Member</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id} className="border-white/20">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {member.name || member.email.split('@')[0]}
                              </p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                              {member.tags.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {member.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getEngagementColor(member.engagement)}>
                            {member.engagement.charAt(0).toUpperCase() + member.engagement.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {member.source.charAt(0).toUpperCase() + member.source.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Globe className="w-3 h-3" />
                            {member.location || 'Not specified'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(member.joinedAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Newsletters Tab */}
      {activeTab === 'newsletters' && (
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Newsletter Campaigns</CardTitle>
            <CardDescription>
              Manage and track your newsletter campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-white/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/20">
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newsletters.map((newsletter) => (
                    <TableRow key={newsletter.id} className="border-white/20">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">
                            {newsletter.subject}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {newsletter.content.substring(0, 80)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getNewsletterStatusColor(newsletter.status)}>
                          {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{newsletter.recipients.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        {newsletter.openRate ? (
                          <span className="font-medium text-green-500">
                            {newsletter.openRate.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {newsletter.clickRate ? (
                          <span className="font-medium text-blue-500">
                            {newsletter.clickRate.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {newsletter.sentAt ? 
                            new Date(newsletter.sentAt).toLocaleDateString() :
                            newsletter.scheduledFor ?
                            new Date(newsletter.scheduledFor).toLocaleDateString() :
                            new Date(newsletter.createdAt).toLocaleDateString()
                          }
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {newsletter.status === 'draft' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sendNewsletter(newsletter.id)}
                              className="glass border-white/20"
                            >
                              <Mail className="w-4 h-4 mr-1" />
                              Send
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityManagement;