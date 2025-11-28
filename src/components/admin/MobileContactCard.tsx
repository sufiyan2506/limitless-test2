import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Eye,
  MessageSquare,
} from 'lucide-react';

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

interface MobileContactCardProps {
  contact: Contact;
  onStatusUpdate: (contactId: string, newStatus: string) => void;
  onViewDetails: (contact: Contact) => void;
}

const MobileContactCard = ({ contact, onStatusUpdate, onViewDetails }: MobileContactCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'qualified': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'converted': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'closed': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website': return 'bg-primary/10 text-primary border-primary/20';
      case 'chatbot': return 'bg-accent/10 text-accent border-accent/20';
      case 'referral': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'social': return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Card className="glass border-white/20 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">{contact.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{contact.email}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(contact.status)} text-xs flex-shrink-0`}>
            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-3">
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{contact.phone}</span>
            </div>
          )}
          {contact.company && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{contact.company}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{new Date(contact.submittedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Message Preview */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Message:</span>
          </div>
          <p className="text-sm text-foreground line-clamp-2 pl-6">
            {contact.message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className={`${getSourceColor(contact.source)} text-xs`}>
            {contact.source.charAt(0).toUpperCase() + contact.source.slice(1)}
          </Badge>
          
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(contact)}
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <p className="text-sm text-muted-foreground">{contact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground break-all">{contact.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-sm text-muted-foreground">{contact.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <p className="text-sm text-muted-foreground">{contact.company || 'Not provided'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <p className="text-sm text-muted-foreground mt-1 p-3 rounded-lg glass-strong whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select
                      value={contact.status}
                      onValueChange={(value) => onStatusUpdate(contact.id, value)}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileContactCard;