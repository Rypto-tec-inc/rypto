"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Code, Cpu, ExternalLink, Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeAnimation from "@/components/animations/code-animation"
import ComputerAnimation from "@/components/animations/computer-animation"
import { Popup } from "@/components/ui/popup"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { toast } = useToast()
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Transforming Ideas Into Impactful Solutions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  RYPTO TEC INC is a forward-thinking technology company founded in 2023 by Victor Edet Coleman,
                  specializing in software engineering, animation, and emerging technologies.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Popup
                  trigger={
                    <Button variant="outline" size="lg">
                      Watch Demo
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  }
                  title="RYPTO TEC Demo"
                  size="lg"
                >
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="RYPTO TEC Demo"
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Popup>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ComputerAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-24" ref={ref1}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-start gap-4 md:flex-row md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Cutting-edge solutions for modern challenges
              </h2>
            </div>
            <div className="flex-1 md:max-w-md">
              <p className="text-muted-foreground">
                We leverage a modern and dynamic tech stack to build scalable, efficient, and user-centric solutions
                across various industries.
              </p>
            </div>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Code className="h-10 w-10" />,
                title: "Frontend Development",
                description:
                  "Next.js, React, Tailwind CSS, and Vite for building fast, responsive, and user-friendly interfaces.",
              },
              {
                icon: <Cpu className="h-10 w-10" />,
                title: "Backend Development",
                description: "Node.js, Express, and MongoDB for creating robust and scalable server-side applications.",
              },
              {
                icon: <Layers className="h-10 w-10" />,
                title: "3D and Animation",
                description: "Blender, Three.js, and other advanced tools to create immersive digital experiences.",
              },
              {
                icon: <Zap className="h-10 w-10" />,
                title: "VR/AR Technologies",
                description: "Unity, A-Frame, and WebXR for delivering next-level immersive experiences.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Popup
                  trigger={
                    <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-2 text-primary">{service.icon}</div>
                        <CardTitle>{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{service.description}</CardDescription>
                      </CardContent>
                    </Card>
                  }
                  title={service.title}
                >
                  <div className="space-y-4">
                    <p>{service.description}</p>
                    <h3 className="text-lg font-medium">Technologies we use:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {service.title === "Frontend Development" && (
                        <>
                          <li>Next.js for server-side rendering and static site generation</li>
                          <li>React for building interactive user interfaces</li>
                          <li>Tailwind CSS for rapid UI development</li>
                          <li>Framer Motion for smooth animations</li>
                          <li>TypeScript for type safety</li>
                        </>
                      )}
                      {service.title === "Backend Development" && (
                        <>
                          <li>Node.js for server-side JavaScript</li>
                          <li>Express for API development</li>
                          <li>MongoDB for flexible data storage</li>
                          <li>PostgreSQL for relational data</li>
                          <li>GraphQL for efficient data fetching</li>
                        </>
                      )}
                      {service.title === "3D and Animation" && (
                        <>
                          <li>Blender for 3D modeling and animation</li>
                          <li>Three.js for web-based 3D rendering</li>
                          <li>GSAP for advanced animations</li>
                          <li>WebGL for hardware-accelerated graphics</li>
                          <li>Cinema 4D for professional 3D content</li>
                        </>
                      )}
                      {service.title === "VR/AR Technologies" && (
                        <>
                          <li>Unity for cross-platform VR/AR development</li>
                          <li>A-Frame for web-based VR experiences</li>
                          <li>WebXR for immersive web applications</li>
                          <li>ARKit and ARCore for mobile AR</li>
                          <li>Oculus SDK for VR headset integration</li>
                        </>
                      )}
                    </ul>
                    <div className="pt-4">
                      <Button asChild>
                        <Link href="/services">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Popup>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Animation Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Cutting-edge Development</h2>
                <p className="text-muted-foreground">
                  Our team of expert developers creates clean, efficient, and scalable code using the latest
                  technologies and best practices.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                    <span>Modern JavaScript frameworks and libraries</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                    <span>Type-safe development with TypeScript</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                    <span>Responsive and accessible web applications</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                    <span>Optimized performance and SEO</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/services">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CodeAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-24" ref={ref2}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Work more, but 6x faster</h2>
            <p className="mt-4 text-xl text-muted-foreground">Save hours with our components</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "59%", description: "Work with precision, apply to improve your productivity" },
              { value: "350+", description: "Web Design sections in dark and light mode" },
              { value: "100+", description: "Work with innovation, apply to improve your productivity" },
              { value: "59%", description: "Work with precision, apply to improve your productivity" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="text-4xl font-bold">{stat.value}</div>
                <p className="mt-2 text-center text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 md:py-24" ref={ref3}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-start gap-4 md:flex-row md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Work</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Explore our work</h2>
            </div>
            <div className="flex-1 md:max-w-md">
              <p className="text-muted-foreground">
                Where creativity seamlessly meets purpose, pushing boundaries and transforming ideas into impactful
                experiences.
              </p>
            </div>
          </motion.div>
          <div className="mt-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="group relative overflow-hidden rounded-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-video overflow-hidden">
                  <div className="h-full w-full bg-muted"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Project 01</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Coming soon. Our first project showcase will be available here.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to transform your ideas?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Let's collaborate to create innovative solutions that redefine industries and improve lives.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Popup
                trigger={
                  <Button variant="outline" size="lg">
                    Subscribe to Newsletter
                  </Button>
                }
                title="Subscribe to Our Newsletter"
              >
                <div className="space-y-4">
                  <p>Stay updated with the latest news, projects, and innovations from RYPTO TEC INC.</p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
