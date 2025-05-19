"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pricingPlans = [
  {
    title: "Web Development",
    price: "300",
    description: "Professional website development with modern design and functionality",
    features: [
      "Responsive Design",
      "Modern UI/UX",
      "SEO Optimization",
      "Fast Loading Speed",
      "Cross-browser Compatibility",
      "Content Management System"
    ],
    badge: "Popular",
    icon: "🌐"
  },
  {
    title: "Smart Web App",
    price: "600",
    description: "Advanced web applications with smart features and real-time functionality",
    features: [
      "All Web Development Features",
      "Real-time Updates",
      "User Authentication",
      "Database Integration",
      "API Development",
      "Advanced Analytics"
    ],
    badge: "Best Value",
    icon: "⚡"
  },
  {
    title: "Mobile App",
    price: "300",
    description: "Native mobile applications for iOS and Android platforms",
    features: [
      "Cross-platform Development",
      "Native Performance",
      "Push Notifications",
      "Offline Support",
      "App Store Optimization",
      "Regular Updates"
    ],
    icon: "📱"
  },
  {
    title: "3D Modelling",
    price: "200",
    description: "High-quality 3D models for various applications",
    features: [
      "Detailed Texturing",
      "UV Mapping",
      "Animation Ready",
      "Multiple Formats",
      "Optimized Geometry",
      "Custom Requirements"
    ],
    icon: "🎨"
  },
  {
    title: "3D Animation Video",
    price: "500",
    description: "Professional 3D animation and video production",
    features: [
      "Storyboard Creation",
      "Character Animation",
      "Motion Graphics",
      "Sound Design",
      "Visual Effects",
      "Final Rendering"
    ],
    icon: "🎬"
  },
  {
    title: "Architect Visualization VR",
    price: "50",
    description: "Immersive VR experiences for architectural visualization",
    features: [
      "3D Space Walkthrough",
      "Interactive Elements",
      "Real-time Rendering",
      "VR Headset Support",
      "Custom Environments",
      "Client Modifications"
    ],
    icon: "🏗️"
  }
]

export default function PricingPage() {
  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Our Services & Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the perfect service for your needs. All prices are in USD and include our standard features.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 relative overflow-hidden">
                {plan.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 right-4"
                  >
                    {plan.badge}
                  </Badge>
                )}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{plan.icon}</span>
                    <h3 className="text-xl font-semibold">{plan.title}</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/project</span>
                  </div>
                  <p className="text-muted-foreground">
                    {plan.description}
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full group">
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4 bg-muted/50 p-8 rounded-lg"
        >
          <h2 className="text-2xl font-semibold">Need a Custom Solution?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We understand that every project is unique. Contact us for a custom quote tailored to your specific requirements.
          </p>
          <Button size="lg" className="mt-4">
            Contact Us
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 