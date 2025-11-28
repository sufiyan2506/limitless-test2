import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { GradientText } from '@/components/ui/gradient-text';
import { toast } from '@/hooks/use-toast';
import limitlessLogo from '@/assets/limitless-logo.png';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call - replace with your authentication logic
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        onLogin();
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <Card className="w-full max-w-md glass border-white/20 relative z-10">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <img 
              src={limitlessLogo} 
              alt="Limitless Logo" 
              className="w-16 h-16 mb-3"
            />
            <GradientText
              colors={["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"]}
              className="text-2xl font-bold text-center"
            >
              LIMITLESS
            </GradientText>
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Sign in to access the management dashboard
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@limitless.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass border-white/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass border-white/20 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full glass-strong hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;