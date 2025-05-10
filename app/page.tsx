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
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-background to-muted/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1 flex flex-col space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                  Innovative Tech Solutions
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
                  Transforming Ideas Into
                  <span className="block text-primary">Impactful Digital Experiences</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  At RYPTO TEC INC, we blend cutting-edge technologies with creative vision to deliver
                  transformative solutions that push the boundaries of what's possible.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">
                    Explore Our Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => window.open('/demo', '_blank')}
                >
                  View Case Studies
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
                <ComputerAnimation />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
      </section>

      {/* Glassy Video Showcase Section */}
      <section className="relative py-20 md:py-32 bg-transparent">
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
              
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video w-full">
                  <video
                    src="/video/animation_studio.mp4"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    controls
                    title="Rypto Creative Showcase"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Rypto Creative Showcase</h3>
                      <p className="text-white/70 text-sm">
                        Exploring the intersection of technology and creative expression
                      </p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full flex items-center transition-colors">
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
