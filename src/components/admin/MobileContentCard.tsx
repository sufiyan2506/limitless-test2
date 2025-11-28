import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Image as ImageIcon,
  Tag,
  Calendar,
  Eye,
  Edit3,
  Trash2,
} from 'lucide-react';

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

interface MobileContentCardProps {
  post: BlogPost;
  onStatusUpdate: (postId: string, newStatus: string) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
}

const MobileContentCard = ({ post, onStatusUpdate, onEdit, onDelete }: MobileContentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'draft': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="glass border-white/20 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg glass flex items-center justify-center flex-shrink-0">
            {post.featuredImage ? (
              <ImageIcon className="w-6 h-6 text-primary" />
            ) : (
              <FileText className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{post.title}</h3>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(post.status)} text-xs`}>
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            {post.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{post.views}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            by {post.author}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2">
          <Select
            value={post.status}
            onValueChange={(value) => onStatusUpdate(post.id, value)}
          >
            <SelectTrigger className={`w-24 sm:w-32 text-xs border-0 ${getStatusColor(post.status)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(post)}
              className="h-8 px-2"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="h-8 px-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileContentCard;