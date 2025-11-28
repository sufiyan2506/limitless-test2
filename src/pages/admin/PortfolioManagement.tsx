import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
import { Switch } from '@/components/ui/switch';
import { 
  Search, 
  Plus, 
  Edit3,
  Trash2,
  Eye,
  ExternalLink,
  Calendar,
  Image as ImageIcon,
  Globe,
  Code,
  Briefcase,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  client: string;
  status: 'published' | 'draft' | 'archived';
  isPublished: boolean;
  liveUrl?: string;
  githubUrl?: string;
  thumbnailUrl?: string;
  images: string[];
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  technologies: string[];
  testimonial?: {
    content: string;
    author: string;
    position: string;
  };
}

const PortfolioManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Mock data - replace with your API integration
  const mockProjects: PortfolioProject[] = [
    {
      id: '1',
      title: 'E-commerce AI Platform',
      slug: 'ecommerce-ai-platform',
      description: 'Advanced AI-powered e-commerce platform with personalized recommendations and automated customer service.',
      category: 'Web Application',
      tags: ['AI', 'E-commerce', 'React', 'Node.js'],
      client: 'Tech Innovations Inc.',
      status: 'published',
      isPublished: true,
      liveUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/limitless/ecommerce-ai',
      thumbnailUrl: '/portfolio/ecommerce-thumb.jpg',
      images: ['/portfolio/ecommerce-1.jpg', '/portfolio/ecommerce-2.jpg'],
      completedAt: '2024-01-10T00:00:00Z',
      createdAt: '2023-12-01T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI API', 'Stripe'],
      testimonial: {
        content: 'Outstanding work! The AI features increased our conversion rate by 40%.',
        author: 'Sarah Johnson',
        position: 'CEO, Tech Innovations Inc.',
      },
    },
    {
      id: '2',
      title: 'Healthcare Management System',
      slug: 'healthcare-management-system',
      description: 'Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine features.',
      category: 'Web Application',
      tags: ['Healthcare', 'React', 'TypeScript', 'HIPAA'],
      client: 'MedCare Solutions',
      status: 'published',
      isPublished: true,
      liveUrl: 'https://medcare-demo.com',
      thumbnailUrl: '/portfolio/healthcare-thumb.jpg',
      images: ['/portfolio/healthcare-1.jpg', '/portfolio/healthcare-2.jpg'],
      completedAt: '2023-12-15T00:00:00Z',
      createdAt: '2023-10-01T09:00:00Z',
      updatedAt: '2023-12-20T16:45:00Z',
      technologies: ['React', 'TypeScript', 'PostgreSQL', 'AWS', 'WebRTC'],
    },
    {
      id: '3',
      title: 'Mobile Fitness App',
      slug: 'mobile-fitness-app',
      description: 'Cross-platform mobile application for fitness tracking with AI-powered workout recommendations.',
      category: 'Mobile App',
      tags: ['Mobile', 'React Native', 'AI', 'Fitness'],
      client: 'FitTech Startup',
      status: 'draft',
      isPublished: false,
      githubUrl: 'https://github.com/limitless/fitness-app',
      thumbnailUrl: '/portfolio/fitness-thumb.jpg',
      images: ['/portfolio/fitness-1.jpg'],
      completedAt: '2024-02-01T00:00:00Z',
      createdAt: '2024-01-01T08:00:00Z',
      updatedAt: '2024-01-16T12:20:00Z',
      technologies: ['React Native', 'Firebase', 'TensorFlow', 'Expo'],
    },
  ];

  const categories = ['Web Application', 'Mobile App', 'Desktop Application', 'API/Backend', 'UI/UX Design'];

  const [projects] = useState<PortfolioProject[]>(mockProjects);
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
    title: '',
    description: '',
    category: '',
    tags: [],
    client: '',
    status: 'draft',
    isPublished: false,
    technologies: [],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/10 text-green-500';
      case 'draft': return 'bg-yellow-500/10 text-yellow-500';
      case 'archived': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateProject = () => {
    // Mock create functionality
    toast({
      title: "Project Created",
      description: "Your portfolio project has been saved as a draft.",
    });
    setIsCreateDialogOpen(false);
    setNewProject({
      title: '',
      description: '',
      category: '',
      tags: [],
      client: '',
      status: 'draft',
      isPublished: false,
      technologies: [],
    });
  };

  const toggleProjectStatus = (projectId: string, isPublished: boolean) => {
    // Mock toggle functionality
    toast({
      title: isPublished ? "Project Published" : "Project Unpublished",
      description: `Project ${isPublished ? 'is now live' : 'has been hidden'} on your portfolio.`,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    // Mock delete functionality
    toast({
      title: "Project Deleted",
      description: "The portfolio project has been permanently deleted.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Management</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects and showcase your work
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="glass-strong">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl glass border-white/20 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Portfolio Project</DialogTitle>
              <DialogDescription>
                Create a new project for your portfolio showcase
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Project Title</label>
                  <Input
                    placeholder="Project name"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="glass border-white/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Client</label>
                  <Input
                    placeholder="Client name"
                    value={newProject.client}
                    onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                    className="glass border-white/20"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newProject.category} onValueChange={(value) => setNewProject({...newProject, category: value})}>
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={newProject.status} onValueChange={(value) => setNewProject({...newProject, status: value as any})}>
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Detailed project description..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="glass border-white/20 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Live URL</label>
                  <Input
                    placeholder="https://project-demo.com"
                    className="glass border-white/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">GitHub URL</label>
                  <Input
                    placeholder="https://github.com/user/repo"
                    className="glass border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Technologies Used</label>
                <Input
                  placeholder="React, Node.js, MongoDB (comma separated)"
                  className="glass border-white/20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={newProject.isPublished}
                    onCheckedChange={(checked) => setNewProject({...newProject, isPublished: checked})}
                  />
                  <label htmlFor="published" className="text-sm font-medium">
                    Publish on portfolio
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateProject} className="glass-strong">
                  Create Project
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="glass border-white/20">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'Total Projects', value: projects.length, color: 'text-blue-500', icon: Briefcase },
          { label: 'Published', value: projects.filter(p => p.isPublished).length, color: 'text-green-500', icon: Globe },
          { label: 'In Draft', value: projects.filter(p => p.status === 'draft').length, color: 'text-yellow-500', icon: Edit3 },
          { label: 'Categories', value: new Set(projects.map(p => p.category)).size, color: 'text-purple-500', icon: Code },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="glass border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className={`text-sm ${stat.color}`}>{stat.label}</div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
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
                  placeholder="Search projects..."
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
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 glass border-white/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="glass border-white/20 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              {project.thumbnailUrl ? (
                <ImageIcon className="w-16 h-16 text-primary" />
              ) : (
                <div className="text-center">
                  <Code className="w-16 h-16 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No thumbnail</p>
                </div>
              )}
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {project.client}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {project.status}
                  </Badge>
                  <Switch
                    checked={project.isPublished}
                    onCheckedChange={(checked) => toggleProjectStatus(project.id, checked)}
                  />
                </div>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                {project.category}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.completedAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <Button variant="ghost" size="sm" className="p-1">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" className="p-1">
                      <Code className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortfolioManagement;