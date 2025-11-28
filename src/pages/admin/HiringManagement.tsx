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
  Download, 
  Eye,
  FileText,
  Calendar,
  User,
  Briefcase,
  Star,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Application {
  id: string;
  candidateName: string;
  email: string;
  phone?: string;
  position: string;
  experience: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  resumeUrl?: string;
  portfolioUrl?: string;
  appliedAt: string;
  lastUpdate?: string;
  rating?: number;
  notes?: string;
}

const HiringManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  
  // Mock data - replace with your API integration
  const mockApplications: Application[] = [
    {
      id: '1',
      candidateName: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Frontend Developer',
      experience: '5+ years',
      status: 'interview',
      resumeUrl: '/resumes/alex-thompson.pdf',
      portfolioUrl: 'https://alexthompson.dev',
      appliedAt: '2024-01-15T10:30:00Z',
      lastUpdate: '2024-01-16T14:20:00Z',
      rating: 4,
      notes: 'Strong React skills, great portfolio projects',
    },
    {
      id: '2',
      candidateName: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      position: 'UI/UX Designer',
      experience: '3+ years',
      status: 'screening',
      portfolioUrl: 'https://dribbble.com/mariagarcia',
      appliedAt: '2024-01-14T09:15:00Z',
      rating: 5,
      notes: 'Excellent design skills, worked with major brands',
    },
    {
      id: '3',
      candidateName: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 987-6543',
      position: 'Backend Developer',
      experience: '7+ years',
      status: 'offer',
      resumeUrl: '/resumes/david-kim.pdf',
      appliedAt: '2024-01-12T16:45:00Z',
      lastUpdate: '2024-01-16T10:30:00Z',
      rating: 5,
      notes: 'Excellent Node.js and Python skills, great culture fit',
    },
  ];

  const [applications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const positions = ['Senior Frontend Developer', 'UI/UX Designer', 'Backend Developer', 'Full Stack Developer'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-500/10 text-blue-500';
      case 'screening': return 'bg-yellow-500/10 text-yellow-500';
      case 'interview': return 'bg-purple-500/10 text-purple-500';
      case 'offer': return 'bg-green-500/10 text-green-500';
      case 'hired': return 'bg-emerald-500/10 text-emerald-500';
      case 'rejected': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         application.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         application.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || application.position === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const exportApplications = () => {
    toast({
      title: "Export Started",
      description: "Application data is being prepared for download.",
    });
  };

  const updateApplicationStatus = (applicationId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hiring & Career Management</h1>
          <p className="text-muted-foreground">
            Manage job applications and track hiring pipeline
          </p>
        </div>
        <Button onClick={exportApplications} className="glass-strong">
          <Download className="w-4 h-4 mr-2" />
          Export Applications
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Total Applications', value: applications.length, color: 'text-blue-500' },
          { label: 'In Interview', value: applications.filter(a => a.status === 'interview').length, color: 'text-purple-500' },
          { label: 'Offers Extended', value: applications.filter(a => a.status === 'offer').length, color: 'text-green-500' },
          { label: 'Hired', value: applications.filter(a => a.status === 'hired').length, color: 'text-emerald-500' },
        ].map((stat) => (
          <Card key={stat.label} className="glass border-white/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className={`text-sm ${stat.color}`}>{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                  placeholder="Search applications..."
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
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-full sm:w-52 glass border-white/20">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>{position}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="glass border-white/20">
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>
            Candidate applications and hiring pipeline status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/20">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} className="border-white/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{application.candidateName}</p>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{application.position}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{application.experience}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {renderStars(application.rating)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl glass border-white/20">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                              <DialogDescription>
                                Complete candidate information and application status
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Candidate Name</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.candidateName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Phone</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.phone || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Position</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.position}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Experience</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.experience}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Rating</label>
                                    <div className="mt-1">
                                      {renderStars(selectedApplication.rating)}
                                    </div>
                                  </div>
                                </div>

                                {selectedApplication.notes && (
                                  <div>
                                    <label className="text-sm font-medium">Notes</label>
                                    <p className="text-sm text-muted-foreground mt-1 p-3 rounded-lg glass-strong">
                                      {selectedApplication.notes}
                                    </p>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                  <Select
                                    value={selectedApplication.status}
                                    onValueChange={(value) => updateApplicationStatus(selectedApplication.id, value)}
                                  >
                                    <SelectTrigger className="w-40 glass border-white/20">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="applied">Applied</SelectItem>
                                      <SelectItem value="screening">Screening</SelectItem>
                                      <SelectItem value="interview">Interview</SelectItem>
                                      <SelectItem value="offer">Offer</SelectItem>
                                      <SelectItem value="hired">Hired</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  {selectedApplication.resumeUrl && (
                                    <Button variant="outline" size="sm" className="glass border-white/20">
                                      <FileText className="w-4 h-4 mr-2" />
                                      View Resume
                                    </Button>
                                  )}
                                  
                                  {selectedApplication.portfolioUrl && (
                                    <Button variant="outline" size="sm" className="glass border-white/20">
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Portfolio
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {application.resumeUrl && (
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
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
    </div>
  );
};

export default HiringManagement;