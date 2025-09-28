import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { 
  ArrowLeft, 
  Search, 
  FileText, 
  Sparkles, 
  Clock,
  Target,
  Users,
  Zap,
  CheckCircle,
  Download,
  Send,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Citation {
  id: string
  title: string
  url: string
  author?: string
  date?: string
}

const CreateArticle = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: "",
    audience: "",
    tone: "",
    length: "",
    keywords: "",
    context: ""
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [articleContent, setArticleContent] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 3000);
  };

  const handleGenerateArticle = async () => {
    setIsGenerating(true);
    // Simulate article generation
    setTimeout(() => {
      setArticleContent(`
        <h1>Best AI Tools for Content Creation in 2025: Complete Guide</h1>
        
        <p>The landscape of content creation has been revolutionized by artificial intelligence, offering unprecedented opportunities for creators, marketers, and businesses to streamline their workflows and enhance productivity.</p>
        
        <h2>Introduction: The AI Content Revolution</h2>
        
        <p>In 2025, artificial intelligence has become an indispensable tool for content creators worldwide. From generating blog posts to creating social media content, AI-powered tools are transforming how we approach content creation.</p>
        
        <h2>Why AI Tools Are Essential for Modern Content Creation</h2>
        
        <p>The benefits of incorporating AI into your content creation workflow are numerous:</p>
        
        <ul>
          <li><strong>Increased Efficiency:</strong> AI tools can reduce content creation time by up to 70%</li>
          <li><strong>Enhanced Quality:</strong> Advanced algorithms ensure grammatically correct and engaging content</li>
          <li><strong>SEO Optimization:</strong> Built-in SEO features help improve search rankings</li>
          <li><strong>Consistency:</strong> Maintain brand voice across all content pieces</li>
        </ul>
        
        <blockquote>
          <p>"AI doesn't replace creativity; it amplifies it." - Content Marketing Institute</p>
        </blockquote>
        
        <h2>Top 10 AI Writing Tools Compared</h2>
        
        <p>After extensive testing and research, here are the leading AI writing tools available in 2025...</p>
        
        <p><em>This is a sample generated article. The full article would continue with detailed comparisons, pricing, and implementation guides.</em></p>
      `);
      
      // Add sample citations
      setCitations([
        {
          id: '1',
          title: 'The State of AI in Content Marketing 2025',
          url: 'https://contentmarketinginstitute.com/ai-report-2025',
          author: 'Content Marketing Institute',
          date: '2025'
        },
        {
          id: '2',
          title: 'AI Tools Market Analysis',
          url: 'https://techcrunch.com/ai-tools-analysis',
          author: 'TechCrunch Research',
          date: 'March 2025'
        }
      ]);
      
      setIsGenerating(false);
      setStep(5); // Add step 5 for the editor
    }, 4000);
  };

  const handleSaveArticle = () => {
    // Simulate saving
    navigate('/dashboard');
  };

  const steps = [
    { number: 1, title: "Topic & Settings", icon: Target },
    { number: 2, title: "Research", icon: Search },
    { number: 3, title: "Outline", icon: FileText },
    { number: 4, title: "Generate", icon: Sparkles },
    { number: 5, title: "Edit & Publish", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Create New Article</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((stepItem, index) => (
            <div key={stepItem.number} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                step >= stepItem.number 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <stepItem.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{stepItem.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step > stepItem.number ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Article Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Article Topic <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="e.g., Best AI tools for content creation in 2025"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Be specific about what you want to write about
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Audience</label>
                    <Select value={formData.audience} onValueChange={(value) => handleInputChange('audience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginners">Beginners</SelectItem>
                        <SelectItem value="professionals">Professionals</SelectItem>
                        <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="general">General Audience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Writing Tone</label>
                    <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="authoritative">Authoritative</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Article Length</label>
                    <Select value={formData.length} onValueChange={(value) => handleInputChange('length', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (800-1200 words)</SelectItem>
                        <SelectItem value="medium">Medium (1200-1800 words)</SelectItem>
                        <SelectItem value="long">Long (1800-2500 words)</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive (2500+ words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Keywords</label>
                    <Input
                      placeholder="AI tools, content creation, marketing"
                      value={formData.keywords}
                      onChange={(e) => handleInputChange('keywords', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Comma-separated keywords for SEO
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Additional Context (Optional)</label>
                  <Textarea
                    placeholder="Any specific points, sources, or requirements for the article..."
                    value={formData.context}
                    onChange={(e) => handleInputChange('context', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleGenerate}
                    disabled={!formData.topic || isGenerating}
                    className="min-w-32"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Researching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Start Research
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  AI Research Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Research Complete</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Found 15 high-quality sources and gathered key insights for your article.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Sources Found</h4>
                    <div className="space-y-2">
                      {[
                        "OpenAI - ChatGPT Documentation",
                        "HubSpot - Content Marketing Guide",
                        "Neil Patel - SEO Best Practices",
                        "Content Marketing Institute",
                        "Backlinko - AI Content Study"
                      ].map((source, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          {source}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Research Insights</h4>
                    <div className="space-y-2">
                      {[
                        "AI tools market growing 25% annually",
                        "Content creators save avg 6 hours per article",
                        "SEO optimization increases traffic by 40%",
                        "Video content drives 3x more engagement",
                        "Personalization improves conversion by 15%"
                      ].map((insight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Zap className="w-3 h-3 text-warning" />
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Outline
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Article Outline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    "Best AI Tools for Content Creation in 2025: Complete Guide"
                  </h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>1,850 words</span>
                    <span>7 min read</span>
                    <span>SEO Score: 94/100</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "Introduction: The AI Content Revolution",
                    "Why AI Tools Are Essential for Modern Content Creation",
                    "Top 10 AI Writing Tools Compared",
                    "AI Tools for Video Content Creation", 
                    "Social Media Content Generation",
                    "SEO Optimization with AI",
                    "Cost Analysis and ROI Considerations",
                    "Future Trends in AI Content Creation",
                    "Getting Started: Implementation Guide",
                    "Conclusion and Key Takeaways"
                  ].map((heading, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <span className="font-medium">{heading}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">SEO Optimization</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Primary Keywords:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {["AI tools", "content creation", "2025"].map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Meta Description:</span>
                      <p className="text-muted-foreground mt-1">
                        Discover the top AI tools for content creation in 2025. Complete guide with comparisons, pricing, and implementation tips.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleGenerateArticle}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Article
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {isGenerating ? "Generating Article..." : "Article Generated!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="animate-pulse-glow bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Creating Your Article</h3>
                <p className="text-muted-foreground mb-8">
                  Our AI is writing your SEO-optimized article with citations and formatting.
                  This usually takes 2-3 minutes.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: isGenerating ? '60%' : '100%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{isGenerating ? '60% complete' : 'Complete!'}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Edit Your Article
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">1,850 words</Badge>
                    <Badge variant="secondary">7 min read</Badge>
                    <Badge variant="secondary">SEO Score: 94/100</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <RichTextEditor
                    content={articleContent}
                    onChange={setArticleContent}
                    citations={citations}
                    onCitationAdd={(citation) => setCitations(prev => [...prev, citation])}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Outline
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={handleSaveArticle}>
                    <Send className="w-4 h-4 mr-2" />
                    Save & Publish
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;