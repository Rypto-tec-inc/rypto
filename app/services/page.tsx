"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Code, Cpu, Layers, Smartphone, Video, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })

  const services = [
    {
      icon: <Code className="h-10 w-10" />,
      title: "Frontend Development",
      description:
        "We create responsive, user-friendly interfaces using Next.js, React, Tailwind CSS, and Vite. Our frontend solutions are optimized for performance and accessibility.",
      features: [
        "Responsive web applications",
        "Progressive web apps (PWAs)",
        "Interactive user interfaces",
        "Performance optimization",
      ],
    },
    {
      icon: <Cpu className="h-10 w-10" />,
      title: "Backend Development",
      description:
        "Our backend solutions are built with Node.js, Express, and MongoDB, providing robust and scalable server-side applications that power your digital products.",
      features: [
        "API development",
        "Database design and optimization",
        "Authentication systems",
        "Serverless functions",
      ],
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: "3D and Animation",
      description:
        "We create immersive digital experiences using Blender, Three.js, and other advanced tools, bringing your ideas to life with stunning visuals and animations.",
      features: [
        "3D modeling and rendering",
        "Character animation",
        "Motion graphics",
        "Interactive 3D web experiences",
      ],
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "VR/AR Technologies",
      description:
        "We deliver next-level immersive experiences using Unity, A-Frame, and WebXR, pushing the boundaries of what's possible with virtual and augmented reality.",
      features: [
        "Virtual reality applications",
        "Augmented reality experiences",
        "Interactive 360° environments",
        "WebXR development",
      ],
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Mobile App Development",
      description:
        "We build native and cross-platform mobile applications that provide seamless experiences across iOS and Android devices, focusing on performance and usability.",
      features: [
        "iOS and Android development",
        "React Native applications",
        "App Store optimization",
        "Mobile UI/UX design",
      ],
    },
    {
      icon: <Video className="h-10 w-10" />,
      title: "Video Production",
      description:
        "From concept to final delivery, we create high-quality video content including product demos, explainer videos, and promotional content for your brand.",
      features: ["Promotional videos", "Product demonstrations", "Explainer animations", "Corporate presentations"],
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" title="Our Services">
            Our Services
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            We offer a comprehensive range of technology services to help transform your ideas into impactful solutions.
          </p>
        </motion.div>

        <div ref={ref1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="mb-2 text-primary">{service.icon}</div>
                  <CardTitle title={service.title}>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary shrink-0" />
                        <span title={feature}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact" title={`Learn more about ${service.title}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={ref2}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-lg bg-muted p-8 text-center"
        >
          <h2 className="text-2xl font-bold" title="Ready to start your project?">
            Ready to start your project?
          </h2>
          <p className="mx-auto mt-2 max-w-[600px] text-muted-foreground">
            Contact us today to discuss how we can help bring your ideas to life with our expertise in software
            engineering, animation, and emerging technologies.
          </p>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/contact" title="Get in touch with us">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
