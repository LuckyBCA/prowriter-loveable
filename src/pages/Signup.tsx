import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created!",
        description: "Welcome to ProWriter AI. Let's start creating amazing content!",
      });
      navigate('/dashboard');
    }, 2000);
  };

  const features = [
    "50 AI-generated articles per month",
    "Advanced SEO optimization tools",
    "Multiple content formats",
    "Citation management system",
    "WordPress integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/6 w-80 h-80 bg-gradient-success rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-premium rounded-full opacity-5 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side - Enhanced Features */}
        <div className="hidden lg:block space-y-8 animate-slide-up">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-success/10 text-success px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Always Free Forever
            </div>
            <h2 className="text-4xl font-display font-bold leading-tight">
              Create professional content with{" "}
              <span className="text-gradient-premium">premium AI</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of content creators who use ProWriter AI to generate high-quality articles, blog posts, and marketing content with cutting-edge AI technology.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-display font-semibold">Premium features included:</h3>
            <div className="grid gap-4">
              {[
                { feature: "5 AI-generated articles daily", icon: "📝" },
                { feature: "Advanced SEO optimization", icon: "🎯" },
                { feature: "Multiple AI providers (Deepseek, OpenRouter)", icon: "🚀" },
                { feature: "Rich text editor with citations", icon: "✍️" },
                { feature: "Professional templates & formats", icon: "📋" },
                { feature: "Export & sharing capabilities", icon: "📤" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-card border border-border/50 hover:shadow-card transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-2xl">{item.icon}</div>
                  <span className="font-medium text-foreground">{item.feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-premium p-8 rounded-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h4 className="font-display font-bold text-xl mb-3">✨ Limited Time Benefits</h4>
              <p className="text-white/90 leading-relaxed">
                Get premium AI writing capabilities completely free. No hidden costs, no subscription required. Start creating amazing content today!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Signup Form */}
        <div className="w-full max-w-lg mx-auto lg:mx-0">
          {/* Mobile Header */}
          <div className="text-center mb-8 lg:hidden animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-primary p-3 rounded-xl shadow-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold text-gradient">
                ProWriter AI
              </h1>
            </div>
          </div>

          {/* Signup Card */}
          <Card className="card-premium shadow-premium border-0 backdrop-blur-sm animate-scale-in">
            <CardHeader className="space-y-6 pb-8">
              <div className="text-center">
                <CardTitle className="text-2xl font-display font-semibold">Create Your Account</CardTitle>
                <CardDescription className="text-base mt-2">
                  Start your premium AI writing journey
                </CardDescription>
              </div>
              
              {/* Demo Badge */}
              <div className="flex justify-center">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20 font-medium">
                  ✨ Demo Mode - Use any details
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-12 h-14 text-base border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/80 backdrop-blur transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-12 h-14 text-base border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/80 backdrop-blur transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-12 pr-12 h-14 text-base border-2 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/80 backdrop-blur transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Must be at least 8 characters long
                  </p>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link to="#" className="text-primary hover:text-primary-glow font-medium transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="#" className="text-primary hover:text-primary-glow font-medium transition-colors">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Sign Up Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 text-base font-semibold btn-premium"
                  disabled={isLoading || !agreedToTerms}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Premium Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <Separator className="bg-border/50" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground font-medium">
                  or continue with
                </span>
              </div>

              {/* Social Signup */}
              <Button variant="outline" className="w-full h-14 btn-glass" type="button">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </Button>

              {/* Sign In Link */}
              <div className="text-center pt-6">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="font-semibold text-primary hover:text-primary-glow transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;