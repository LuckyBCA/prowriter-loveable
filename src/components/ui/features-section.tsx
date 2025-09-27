import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  FileText, 
  Brain, 
  Settings, 
  Share2, 
  BarChart3,
  Zap,
  CheckCircle 
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI Research",
    description: "Automatically gathers citations and sources from top-ranked content using Perplexity API",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileText,
    title: "SEO Outlines",
    description: "Generate optimized article structures with headings, keywords, and meta descriptions",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Brain,
    title: "Multi-Model AI",
    description: "Choose from GPT-4, Claude, Deepseek, and more through OpenRouter for best results",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Settings,
    title: "Rich Editor",
    description: "Professional editing interface with inline citations, version history, and formatting",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Share2,
    title: "One-Click Publishing",
    description: "Export to WordPress, Markdown, or HTML with proper formatting and citations",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Track article performance, word count, read time, and SEO metrics",
    gradient: "from-teal-500 to-cyan-500"
  }
];

const benefits = [
  "Save 4-12 hours per article",
  "SEO-optimized content that ranks",
  "Professional citations and sources",
  "Multiple export formats",
  "Team collaboration tools",
  "Cost-effective AI routing"
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to Create{" "}
            <span className="text-primary">Professional Content</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From research to publication, Prowriter AI handles every step of the content creation process 
            with professional-grade AI tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits List */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Why Choose Prowriter AI?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};