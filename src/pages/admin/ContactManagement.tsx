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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  Grid3X3,
  Table as TableIcon,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileContactCard from '@/components/admin/MobileContactCard';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  source: 'website' | 'chatbot' | 'referral' | 'social';
  submittedAt: string;
  lastContact?: string;
}

const ContactManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const isMobile = useIsMobile();
  
  // Mock data - replace with your API integration
  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Innovations Inc.',
      message: 'Interested in AI consultation for our e-commerce platform. Looking for custom solutions.',
      status: 'new',
      source: 'website',
      submittedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@startup.co',
      company: 'StartupCo',
      message: 'Need help with MVP development. Timeline is 3 months.',
      status: 'contacted',
      source: 'chatbot',
      submittedAt: '2024-01-14T15:45:00Z',
      lastContact: '2024-01-15T09:00:00Z',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@corp.com',
      phone: '+1 (555) 987-6543',
      company: 'Enterprise Corp',
      message: 'Looking for enterprise AI solutions. Budget: $50k-100k.',
      status: 'qualified',
      source: 'referral',
      submittedAt: '2024-01-13T12:20:00Z',
      lastContact: '2024-01-14T14:30:00Z',
    },
  ];

  const [contacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-500';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-500';
      case 'qualified': return 'bg-green-500/10 text-green-500';
      case 'converted': return 'bg-purple-500/10 text-purple-500';
      case 'closed': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website': return 'bg-primary/10 text-primary';
      case 'chatbot': return 'bg-accent/10 text-accent';
      case 'referral': return 'bg-green-500/10 text-green-500';
      case 'social': return 'bg-pink-500/10 text-pink-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || contact.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const exportContacts = () => {
    // Mock export functionality
    toast({
      title: "Export Started",
      description: "Your contact data is being prepared for download.",
    });
  };

  const updateContactStatus = (contactId: string, newStatus: string) => {
    // Mock update functionality
    toast({
      title: "Status Updated",
      description: `Contact status changed to ${newStatus}`,
    });
  };

  // Force card view on mobile
  const currentViewMode = isMobile ? 'cards' : viewMode;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Contact & Lead Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage contact form submissions and track lead progress
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isMobile && (
              <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="h-8 px-3"
                >
                  <TableIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
            )}
            <Button onClick={exportContacts} className="glass-strong flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-2" />
              <span className="sm:inline">Export</span>
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total', value: contacts.length, color: 'text-blue-500' },
            { label: 'New', value: contacts.filter(c => c.status === 'new').length, color: 'text-green-500' },
            { label: 'Qualified', value: contacts.filter(c => c.status === 'qualified').length, color: 'text-purple-500' },
            { label: 'Converted', value: contacts.filter(c => c.status === 'converted').length, color: 'text-orange-500' },
          ].map((stat) => (
            <Card key={stat.label} className="glass border-white/20">
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs sm:text-sm ${stat.color}`}>{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Filters */}
      <Card className="glass border-white/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-white/20 h-11"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="glass border-white/20 h-11">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="glass border-white/20 h-11">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="chatbot">Chatbot</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Display */}
      {currentViewMode === 'cards' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Contacts ({filteredContacts.length})</h2>
          </div>
          <div className="grid gap-4">
            {filteredContacts.map((contact) => (
              <MobileContactCard
                key={contact.id}
                contact={contact}
                onStatusUpdate={updateContactStatus}
                onViewDetails={setSelectedContact}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Contacts ({filteredContacts.length})</CardTitle>
            <CardDescription>
              Recent contact form submissions and inquiries
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/20">
                    <TableHead className="min-w-[250px]">Contact</TableHead>
                    <TableHead className="min-w-[150px]">Company</TableHead>
                    <TableHead className="min-w-[120px]">Status</TableHead>
                    <TableHead className="min-w-[100px]">Source</TableHead>
                    <TableHead className="min-w-[120px]">Submitted</TableHead>
                    <TableHead className="min-w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className="border-white/20">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">{contact.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium truncate">{contact.company || '-'}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSourceColor(contact.source)}>
                          {contact.source.charAt(0).toUpperCase() + contact.source.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(contact.submittedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedContact(contact)}
                                className="h-8 px-2"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[90vw] sm:max-w-2xl glass border-white/20 max-h-[85vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Contact Details</DialogTitle>
                                <DialogDescription>
                                  Full contact information and message
                                </DialogDescription>
                              </DialogHeader>
                              {selectedContact && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Name</label>
                                      <p className="text-sm text-muted-foreground">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Email</label>
                                      <p className="text-sm text-muted-foreground break-all">{selectedContact.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Phone</label>
                                      <p className="text-sm text-muted-foreground">{selectedContact.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Company</label>
                                      <p className="text-sm text-muted-foreground">{selectedContact.company || 'Not provided'}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Message</label>
                                    <p className="text-sm text-muted-foreground mt-1 p-3 rounded-lg glass-strong whitespace-pre-wrap">
                                      {selectedContact.message}
                                    </p>
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <Select
                                      value={selectedContact.status}
                                      onValueChange={(value) => updateContactStatus(selectedContact.id, value)}
                                    >
                                      <SelectTrigger className="glass border-white/20">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="contacted">Contacted</SelectItem>
                                        <SelectItem value="qualified">Qualified</SelectItem>
                                        <SelectItem value="converted">Converted</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <Button variant="outline" size="sm" className="glass border-white/20">
                                      <Mail className="w-4 h-4 mr-2" />
                                      Send Email
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
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

export default ContactManagement;