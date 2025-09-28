import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  FileText, 
  TrendingUp, 
  Clock, 
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  BarChart3,
  Users,
  Calendar,
  Zap,
  Star,
  Crown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'in-progress';
  wordCount: number;
  seoScore: number;
  createdAt: string;
  views: number;
  category: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  const user = {
    name: "John Doe",
    plan: "Creator",
    avatar: "JD"
  };

  const stats = {
    articlesWritten: 24,
    wordsGenerated: 48750,
    timeSaved: 72,
    seoImprovement: 35
  };

  const usage = {
    articlesUsed: 24,
    articlesLimit: 50,
    wordsUsed: 48750,
    wordsLimit: 100000
  };

  const recentArticles: Article[] = [
    {
      id: "1",
      title: "Best AI Tools for Content Creation in 2025",
      status: "published",
      wordCount: 2450,
      seoScore: 94,
      createdAt: "2025-01-15",
      views: 1250,
      category: "Technology"
    },
    {
      id: "2",
      title: "Complete Guide to Social Media Marketing",
      status: "draft",
      wordCount: 1850,
      seoScore: 87,
      createdAt: "2025-01-14",
      views: 0,
      category: "Marketing"
    },
    {
      id: "3",
      title: "E-commerce Trends to Watch This Year",
      status: "in-progress",
      wordCount: 0,
      seoScore: 0,
      createdAt: "2025-01-13",
      views: 0,
      category: "Business"
    },
    {
      id: "4",
      title: "Digital Marketing Strategies for Small Business",
      status: "published",
      wordCount: 3200,
      seoScore: 91,
      createdAt: "2025-01-12",
      views: 2100,
      category: "Marketing"
    },
    {
      id: "5",
      title: "Future of Remote Work and Collaboration",
      status: "published",
      wordCount: 1900,
      seoScore: 89,
      createdAt: "2025-01-11",
      views: 850,
      category: "Business"
    }
  ];

  const filteredArticles = recentArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "default",
      draft: "secondary", 
      "in-progress": "outline"
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">{user.plan} Plan</span>
              </div>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles Written</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.articlesWritten}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Words Generated</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.wordsGenerated.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +25% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.timeSaved}h</div>
              <p className="text-xs text-muted-foreground">
                Compared to manual writing
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SEO Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.seoImprovement}%</div>
              <p className="text-xs text-muted-foreground">
                Average score increase
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage and Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Usage Stats */}
          <Card className="lg:col-span-2 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Monthly Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Articles Generated</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.articlesUsed} / {usage.articlesLimit}
                  </span>
                </div>
                <Progress value={(usage.articlesUsed / usage.articlesLimit) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Words Generated</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.wordsUsed.toLocaleString()} / {usage.wordsLimit.toLocaleString()}
                  </span>
                </div>
                <Progress value={(usage.wordsUsed / usage.wordsLimit) * 100} className="h-2" />
              </div>

              {usage.articlesUsed / usage.articlesLimit > 0.8 && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium text-warning">Upgrade Recommended</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're close to your monthly limit. Upgrade to Pro for unlimited articles.
                  </p>
                  <Button size="sm" className="bg-warning hover:bg-warning/90 text-warning-foreground">
                    Upgrade Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start h-12" 
                onClick={() => navigate('/create')}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
              
              <Button variant="outline" className="w-full justify-start h-12">
                <Users className="w-4 h-4 mr-2" />
                Team Collaboration
              </Button>
              
              <Button variant="outline" className="w-full justify-start h-12">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              
              <Button variant="outline" className="w-full justify-start h-12">
                <Calendar className="w-4 h-4 mr-2" />
                Content Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Articles Management */}
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Articles
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Articles Table */}
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium truncate">{article.title}</h3>
                      {getStatusBadge(article.status)}
                      {article.seoScore > 0 && (
                        <Badge variant="outline" className={getSeoScoreColor(article.seoScore)}>
                          SEO: {article.seoScore}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.category}</span>
                      <span>{article.wordCount} words</span>
                      <span>{article.views} views</span>
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Get started by creating your first article"}
                </p>
                <Button onClick={() => navigate('/create')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Article
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;