import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for trying out Prowriter AI",
    features: [
      "3 articles per month",
      "Basic SEO outlines",
      "Standard research",
      "Markdown export",
      "Community support"
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Creator",
    price: "₹1,999",
    period: "per month",
    description: "For indie creators and bloggers",
    features: [
      "50 articles per month",
      "Advanced SEO analysis",
      "Priority AI models",
      "WordPress integration",
      "Image suggestions",
      "Version history",
      "Email support"
    ],
    buttonText: "Start 7-Day Trial",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Agency",
    price: "₹4,999",
    period: "per month",
    description: "For agencies and teams",
    features: [
      "Unlimited articles",
      "Multi-model comparison",
      "Team collaboration",
      "Custom integrations",
      "Priority support",
      "Advanced analytics",
      "White-label options",
      "API access"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary" as const,
    popular: false
  }
];

export const PricingSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="text-primary">Writing Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core AI writing features 
            with transparent, usage-based pricing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-card transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-primary ring-2 ring-primary/20 scale-105' 
                  : 'hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-4">
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full mb-6 ${plan.popular ? 'shadow-glow' : ''}`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Need a custom plan? We work with enterprises and large agencies.
          </p>
          <Button variant="outline">
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};