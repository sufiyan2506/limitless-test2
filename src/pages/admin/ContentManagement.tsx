import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Plus, 
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Tag,
  FileText,
  Image as ImageIcon,
  Grid3X3,
  Table as TableIcon,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileContentCard from '@/components/admin/MobileContentCard';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  category: string;
  tags: string[];
  author: string;
  publishedAt?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  views?: number;
}

const ContentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const isMobile = useIsMobile();

  // Mock data - replace with your API integration
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI in Web Development',
      slug: 'future-ai-web-development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build websites and applications.',
      content: '# The Future of AI in Web Development\n\nArtificial intelligence is transforming every aspect of web development...',
      status: 'published',
      category: 'Technology',
      tags: ['AI', 'Web Development', 'Future Tech'],
      author: 'John Doe',
      publishedAt: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-14T09:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      featuredImage: '/blog/ai-web-dev.jpg',
      seoTitle: 'The Future of AI in Web Development | Limitless Blog',
      seoDescription: 'Discover how AI is revolutionizing web development with practical examples and future predictions.',
      views: 1250,
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      slug: 'building-scalable-react-applications',
      excerpt: 'Best practices and patterns for creating React applications that can grow with your business.',
      content: '# Building Scalable React Applications\n\nScaling React applications requires careful planning...',
      status: 'draft',
      category: 'Development',
      tags: ['React', 'Scalability', 'Best Practices'],
      author: 'Jane Smith',
      createdAt: '2024-01-16T11:00:00Z',
      updatedAt: '2024-01-16T15:30:00Z',
      seoTitle: 'Building Scalable React Applications - Complete Guide',
      seoDescription: 'Learn the best practices for building scalable React applications that grow with your business.',
      views: 0,
    },
    {
      id: '3',
      title: 'UI/UX Design Trends for 2024',
      slug: 'ui-ux-design-trends-2024',
      excerpt: 'The latest design trends that will shape user experiences in 2024.',
      content: '# UI/UX Design Trends for 2024\n\nAs we move into 2024, several design trends are emerging...',
      status: 'scheduled',
      category: 'Design',
      tags: ['UI/UX', 'Design Trends', '2024'],
      author: 'Mike Johnson',
      scheduledFor: '2024-01-20T09:00:00Z',
      createdAt: '2024-01-16T08:00:00Z',
      updatedAt: '2024-01-16T16:45:00Z',
      featuredImage: '/blog/ui-ux-trends.jpg',
      seoTitle: 'UI/UX Design Trends 2024 | Modern Design Insights',
      seoDescription: 'Explore the top UI/UX design trends that will define user experiences in 2024.',
      views: 0,
    },
  ];

  const categories = ['Technology', 'Development', 'Design', 'Business', 'AI'];

  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
  });
  const [editPost, setEditPost] = useState<Partial<BlogPost>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/10 text-green-500';
      case 'draft': return 'bg-yellow-500/10 text-yellow-500';
      case 'scheduled': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreatePost = () => {
    // Create new post with proper data
    const newPostData: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title || 'Untitled Post',
      slug: (newPost.title || 'untitled-post').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newPost.excerpt || '',
      content: newPost.content || '',
      status: (newPost.status as any) || 'draft',
      category: newPost.category || 'General',
      tags: newPost.tags || [],
      author: 'Admin User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0
    };
    
    setPosts([newPostData, ...posts]);
    
    toast({
      title: "Post Created",
      description: "Your blog post has been saved as a draft.",
    });
    setIsCreateDialogOpen(false);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      status: 'draft',
    });
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setEditPost({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      status: post.status,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdatePost = () => {
    if (!selectedPost) return;
    
    // Update the post in the state
    const updatedPosts = posts.map(post => 
      post.id === selectedPost.id 
        ? { 
            ...post, 
            ...editPost,
            updatedAt: new Date().toISOString()
          }
        : post
    );
    setPosts(updatedPosts);
    
    toast({
      title: "Post Updated",
      description: "Your blog post has been successfully updated.",
    });
    setIsEditDialogOpen(false);
    setEditPost({});
    setSelectedPost(null);
  };

  const handleDeletePost = (postId: string) => {
    // Actually remove from state
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    
    toast({
      title: "Post Deleted",
      description: "The blog post has been permanently deleted.",
    });
  };

  const handleUpdateStatus = (postId: string, newStatus: string) => {
    // Update status in state
    const updatedPosts = posts.map(post =>
      post.id === postId 
        ? { ...post, status: newStatus as any, updatedAt: new Date().toISOString() }
        : post
    );
    setPosts(updatedPosts);
    
    toast({
      title: "Status Updated",
      description: `Post status changed to ${newStatus}`,
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
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Content Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create, edit, and manage your blog posts and articles
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
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="glass-strong flex-1 sm:flex-none">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="sm:inline">Create Post</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-4xl glass border-white/20 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new blog post
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        placeholder="Post title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        className="glass border-white/20 h-11"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                        <SelectTrigger className="glass border-white/20 h-11">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Excerpt</label>
                    <Input
                      placeholder="Brief description of the post"
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                      className="glass border-white/20 h-11"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      placeholder="Write your post content here (Markdown supported)..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="glass border-white/20 min-h-[200px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">SEO Title</label>
                      <Input
                        placeholder="SEO optimized title"
                        className="glass border-white/20 h-11"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select value={newPost.status} onValueChange={(value) => setNewPost({...newPost, status: value as any})}>
                        <SelectTrigger className="glass border-white/20 h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">SEO Description</label>
                    <Textarea
                      placeholder="Meta description for search engines"
                      className="glass border-white/20"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button onClick={handleCreatePost} className="glass-strong">
                      Create Post
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="glass border-white/20">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl glass border-white/20 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update your blog post details and content
            </DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Post title"
                    value={editPost.title || ''}
                    onChange={(e) => setEditPost({...editPost, title: e.target.value})}
                    className="glass border-white/20 h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={editPost.category || ''} onValueChange={(value) => setEditPost({...editPost, category: value})}>
                    <SelectTrigger className="glass border-white/20 h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Excerpt</label>
                <Input
                  placeholder="Brief description of the post"
                  value={editPost.excerpt || ''}
                  onChange={(e) => setEditPost({...editPost, excerpt: e.target.value})}
                  className="glass border-white/20 h-11"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Write your post content here (Markdown supported)..."
                  value={editPost.content || ''}
                  onChange={(e) => setEditPost({...editPost, content: e.target.value})}
                  className="glass border-white/20 min-h-[200px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">SEO Title</label>
                  <Input
                    placeholder="SEO optimized title"
                    value={editPost.seoTitle || ''}
                    onChange={(e) => setEditPost({...editPost, seoTitle: e.target.value})}
                    className="glass border-white/20 h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={editPost.status || 'draft'} onValueChange={(value) => setEditPost({...editPost, status: value as any})}>
                    <SelectTrigger className="glass border-white/20 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">SEO Description</label>
                <Textarea
                  placeholder="Meta description for search engines"
                  value={editPost.seoDescription || ''}
                  onChange={(e) => setEditPost({...editPost, seoDescription: e.target.value})}
                  className="glass border-white/20"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button onClick={handleUpdatePost} className="glass-strong">
                  Update Post
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="glass border-white/20">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: 'Total Posts', value: posts.length, color: 'text-blue-500' },
          { label: 'Published', value: posts.filter(p => p.status === 'published').length, color: 'text-green-500' },
          { label: 'Drafts', value: posts.filter(p => p.status === 'draft').length, color: 'text-yellow-500' },
          { label: 'Total Views', value: posts.reduce((sum, p) => sum + (p.views || 0), 0), color: 'text-purple-500' },
        ].map((stat) => (
          <Card key={stat.label} className="glass border-white/20">
            <CardContent className="p-3 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</div>
              <div className={`text-xs sm:text-sm ${stat.color}`}>{stat.label}</div>
            </CardContent>
          </Card>
        ))}
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
                placeholder="Search posts..."
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="glass border-white/20 h-11">
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
          </div>
        </CardContent>
      </Card>

      {/* Posts Display */}
      {currentViewMode === 'cards' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Posts ({filteredPosts.length})</h2>
          </div>
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <MobileContentCard
                key={post.id}
                post={post}
                onStatusUpdate={handleUpdateStatus}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
            <CardDescription>
              Manage your blog posts and articles
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/20">
                    <TableHead className="min-w-[300px]">Post</TableHead>
                    <TableHead className="min-w-[100px]">Category</TableHead>
                    <TableHead className="min-w-[120px]">Status</TableHead>
                    <TableHead className="min-w-[80px]">Views</TableHead>
                    <TableHead className="min-w-[100px]">Date</TableHead>
                    <TableHead className="min-w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="border-white/20">
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg glass flex items-center justify-center flex-shrink-0">
                            {post.featuredImage ? (
                              <ImageIcon className="w-6 h-6 text-primary" />
                            ) : (
                              <FileText className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.excerpt}</p>
                            <div className="flex gap-1 mt-2">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={post.status}
                          onValueChange={(value) => handleUpdateStatus(post.id, value)}
                        >
                          <SelectTrigger className={`w-32 text-xs border-0 ${getStatusColor(post.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Eye className="w-3 h-3" />
                          {post.views || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {post.status === 'published' && post.publishedAt ? 
                            new Date(post.publishedAt).toLocaleDateString() :
                            new Date(post.updatedAt).toLocaleDateString()
                          }
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPost(post)}
                            className="h-8 px-2"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="h-8 px-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
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

export default ContentManagement;