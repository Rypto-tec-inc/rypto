import { Metadata } from "next"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the perfect pricing plan for your needs",
}

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$29",
    description: "Essential features for individuals and small projects",
    features: [
      "Basic analytics dashboard",
      "Up to 5 projects",
      "1GB storage space",
      "Email support",
      "Community access"
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$79",
    description: "Advanced features for growing businesses and teams",
    features: [
      "Advanced analytics dashboard",
      "Unlimited projects",
      "10GB storage space", 
      "Priority email support",
      "API access",
      "Team collaboration tools"
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "Complete solution for large organizations and complex needs",
    features: [
      "Custom analytics dashboard",
      "Unlimited projects",
      "Unlimited storage space",
      "24/7 phone and email support",
      "Dedicated account manager",
      "Advanced security features",
      "Custom integrations",
      "Onboarding assistance"
    ],
    buttonText: "Contact Sales",
  },
]

interface FeatureComparison {
  feature: string
  basic: boolean
  pro: boolean
  enterprise: boolean
}

const featureComparison: FeatureComparison[] = [
  { feature: "Basic analytics", basic: true, pro: true, enterprise: true },
  { feature: "Advanced analytics", basic: false, pro: true, enterprise: true },
  { feature: "Custom analytics", basic: false, pro: false, enterprise: true },
  { feature: "Projects", basic: true, pro: true, enterprise: true },
  { feature: "Storage", basic: true, pro: true, enterprise: true },
  { feature: "API access", basic: false, pro: true, enterprise: true },
  { feature: "Team collaboration", basic: false, pro: true, enterprise: true },
  { feature: "Dedicated support", basic: false, pro: false, enterprise: true },
  { feature: "Custom integrations", basic: false, pro: false, enterprise: true },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{plan.name}</CardTitle>
                {plan.popular && <Badge>Most Popular</Badge>}
              </div>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                {plan.price}
                <span className="ml-1 text-xl font-semibold text-muted-foreground">/month</span>
              </div>
              <CardDescription className="mt-4">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className="w-full"
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Separator className="my-12" />

      {/* Feature Comparison Table */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Feature</TableHead>
                <TableHead className="text-center">Basic</TableHead>
                <TableHead className="text-center">Pro</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureComparison.map((item) => (
                <TableRow key={item.feature}>
                  <TableCell className="font-medium">{item.feature}</TableCell>
                  <TableCell className="text-center">
                    {item.basic ? <Check className="h-5 w-5 text-primary mx-auto" /> : null}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.pro ? <Check className="h-5 w-5 text-primary mx-auto" /> : null}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.enterprise ? <Check className="h-5 w-5 text-primary mx-auto" /> : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Can't find the answer you're looking for? Contact our support team for assistance.
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12 bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join thousands of users already using our platform to improve their workflow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg">Start Free Trial</Button>
          <Button variant="outline" size="lg">Contact Sales</Button>
        </div>
      </div>
    </div>
  )
}

