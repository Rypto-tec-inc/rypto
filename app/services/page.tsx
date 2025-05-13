import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Layers, Cpu, Palette, Globe, Database, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Services - RYPTO TEC INC",
  description: "Explore our comprehensive range of technology services and solutions",
}

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Custom Software Development",
      description:
        "Tailored software solutions designed to address your specific business challenges and requirements.",
      features: [
        "Web applications",
        "Enterprise software",
        "API development and integration",
        "Legacy system modernization",
      ],
    },
    {
      icon: Layers,
      title: "3D Animation & Visualization",
      description: "Stunning visual content that brings your ideas to life through advanced animation techniques.",
      features: ["Product visualizations", "Architectural renderings", "Character animation", "Motion graphics"],
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Intelligent solutions that leverage the power of artificial intelligence to drive business value.",
      features: ["Predictive analytics", "Natural language processing", "Computer vision", "Recommendation systems"],
    },
    {
      icon: Palette,
      title: "UX/UI Design",
      description: "User-centered design that creates intuitive, engaging, and accessible digital experiences.",
      features: ["User research", "Wireframing and prototyping", "Visual design", "Usability testing"],
    },
    {
      icon: Globe,
      title: "VR/AR Experiences",
      description: "Immersive virtual and augmented reality solutions for training, marketing, and entertainment.",
      features: [
        "VR training simulations",
        "AR product visualization",
        "Interactive experiences",
        "360° virtual tours",
      ],
    },
    {
      icon: Database,
      title: "Cloud Solutions",
      description: "Scalable, secure, and reliable cloud infrastructure and migration services.",
      features: ["Cloud migration", "Infrastructure as code", "Serverless architecture", "DevOps implementation"],
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: [
        "iOS and Android development",
        "React Native applications",
        "Progressive web apps",
        "Mobile strategy consulting",
      ],
    },
  ]

  return (
    <div className="container py-12 md:py-20">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Services</h1>
        <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
          We offer a comprehensive range of technology services to help businesses innovate, transform, and grow.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {services.map((service, index) => (
          <Card key={index} className="border-border/10 hover:border-border/30 transition-colors">
            <CardHeader>
              <div className="mb-2">
                <service.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-2 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
          <p className="text-muted-foreground mb-6">
            We follow a collaborative, user-centered approach to ensure that every solution we deliver meets your
            business objectives and exceeds user expectations.
          </p>

          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-bold">Discovery & Strategy</h3>
              <p className="text-sm text-muted-foreground">
                We begin by understanding your business goals, user needs, and technical requirements to develop a
                comprehensive strategy.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-bold">Design & Prototyping</h3>
              <p className="text-sm text-muted-foreground">
                Our design team creates intuitive interfaces and experiences, testing and iterating based on user
                feedback.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-bold">Development & Implementation</h3>
              <p className="text-sm text-muted-foreground">
                We build robust, scalable solutions using modern technologies and best practices in software
                development.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-bold">Testing & Quality Assurance</h3>
              <p className="text-sm text-muted-foreground">
                Rigorous testing ensures that your solution is reliable, secure, and performs optimally across all
                platforms.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-4">
              <h3 className="font-bold">Deployment & Support</h3>
              <p className="text-sm text-muted-foreground">
                We handle the deployment process and provide ongoing support and maintenance to ensure long-term
                success.
              </p>
            </div>
          </div>
        </div>

        <div className="relative aspect-video">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Our approach to service delivery"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>

      <div className="bg-muted/30 p-8 rounded-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Contact us today to discuss how we can help you achieve your technology goals.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
