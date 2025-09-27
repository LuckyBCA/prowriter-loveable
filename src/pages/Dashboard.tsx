import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  FileText, 
  BarChart3, 
  Settings,
  Clock,
  TrendingUp,
  Sparkles 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const recentArticles = [
  {
    id: 1,
    title: "10 Best AI Tools for Content Creation in 2025",
    status: "Published",
    wordCount: 1850,
    readTime: 7,
    createdAt: "2 hours ago"
  },
  {
    id: 2,
    title: "Complete Guide to SEO Content Strategy",
    status: "Draft",
    wordCount: 1200,
    readTime: 5,
    createdAt: "1 day ago"
  },
  {
    id: 3,
    title: "How to Scale Content Marketing for SaaS",
    status: "Published",
    wordCount: 2100,
    readTime: 8,
    createdAt: "3 days ago"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Prowriter AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button onClick={() => navigate('/create')}>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-primary rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
              <p className="text-blue-100 mb-6 text-lg">
                Ready to create your next professional article? Let's start with a topic and 
                watch AI research, outline, and write SEO-optimized content.
              </p>
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-glow"
                onClick={() => navigate('/create')}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Start New Article
              </Button>
            </div>

            {/* Recent Articles */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Recent Articles</h3>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-card transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2">{article.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              article.status === 'Published' 
                                ? 'bg-success/10 text-success' 
                                : 'bg-warning/10 text-warning'
                            }`}>
                              {article.status}
                            </span>
                            <span>{article.wordCount} words</span>
                            <span>{article.readTime} min read</span>
                            <span>{article.createdAt}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Usage This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Articles Generated</span>
                    <span className="font-semibold">12 / 50</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>AI Research Calls</span>
                    <span className="font-semibold">28 / 200</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-4">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">4.2h</div>
                <div className="text-sm text-muted-foreground">Avg Time Saved</div>
              </Card>
              
              <Card className="text-center p-4">
                <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">SEO Score</div>
              </Card>
            </div>

            {/* Upgrade Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Upgrade to Creator</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get 50 articles per month, advanced features, and priority support.
                </p>
                <Button className="w-full">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;