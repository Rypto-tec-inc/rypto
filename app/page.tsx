"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Popup } from "@/components/ui/popup"
import { useToast } from "@/hooks/use-toast"
import Barcode from "@/components/barcode"
import AISuggestions from "@/components/ai-suggestions"

export default function Home() {
  const { toast } = useToast()
  const mainRef = useRef(null)
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)

  const [activeImage, setActiveImage] = useState(0)
  const [showDemo, setShowDemo] = useState(false)

  // Auto rotate hero images
  useState(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  })

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const heroImages = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "RYPTO TEC Software Development",
      title: "Advanced Software Solutions",
      description: "Custom software development tailored to your business needs",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "RYPTO TEC Animation Studio",
      title: "Creative Animation",
      description: "Bringing ideas to life through stunning animations",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "RYPTO TEC VR Experience",
      title: "Immersive Experiences",
      description: "Virtual and augmented reality solutions for the future",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "RYPTO TEC Team Collaboration",
      title: "Expert Team",
      description: "Talented professionals dedicated to excellence",
    },
  ]

  return (
    <div ref={mainRef} className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Barcode value="RYPTO-TEC-2023" width={120} height={30} />
                  <UIBadge variant="outline" className="text-xs">
                    EST. 2023
                  </UIBadge>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                  Transforming Ideas Into Impactful Solutions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mt-4">
                  RYPTO TEC INC is a forward-thinking technology company founded in 2023 by Victor Edet Coleman,
                  specializing in software engineering, animation, and emerging technologies.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Popup
                  trigger={
                    <Button variant="outline" size="lg">
                      Watch Demo
                      <Play className="ml-2 h-4 w-4" />
                    </Button>
                  }
                  title="RYPTO TEC Demo"
                  size="lg"
                >
                  <div className="video-container">
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
              <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden border border-border">
                {/* Hero image carousel */}
                <div className="absolute inset-0">
                  {heroImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === activeImage ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{image.title}</h3>
                        <p className="text-sm text-white/80">{image.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Image navigation */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="ml-2 bg-black/20 hover:bg-black/40 text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="mr-2 bg-black/20 hover:bg-black/40 text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Image controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeImage ? "w-6 bg-white" : "bg-white/40"
                      }`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <Image
              src="/general_pic/r.jpg"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section ref={section1Ref} className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">01</div>
              <h2 className="text-3xl font-bold mt-4">Unlocking the opportunity</h2>
              <p className="text-muted-foreground mt-2">Business strategy</p>
            </div>

            <div className="md:w-2/3 space-y-6">
              <p>
                Our projects always begin by gaining a deep understanding of your business goals, customer needs,
                applicable technologies, the surrounding space, and team structure. We meet in person with key
                stakeholders—executives, engineers, data scientists, product owners—to immerse ourselves in your world.
              </p>
              <p>
                Our qualitative inquiry unlocks insights, opportunities, and solutions businesses typically haven't
                considered, and resulting personas ensure we empathize with the people we're designing for. We land on
                an informed hypothesis about where to focus the work to ensure the end product is feasible to build
                based on your team's strengths, is user-friendly and beautiful, and drives adoption and scale.
              </p>

              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-medium uppercase text-muted-foreground">Outputs include</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Insights from qualitative and quantitative user research</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Personas for current and future users</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Data-driven hypothesis on where to focus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Recommendation on how to best leverage emerging technology (and address technology constraints)
                      for desired outcome
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>KPIs and success metrics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 */}
      <section ref={section2Ref} className="py-24 md:py-32 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">02</div>
              <h2 className="text-3xl font-bold mt-4">Crafting the solution</h2>
              <p className="text-muted-foreground mt-2">Design & development</p>
            </div>

            <div className="md:w-2/3 space-y-6">
              <p>
                With a clear understanding of the opportunity, we move into the design and development phase. Our
                multidisciplinary team of designers, developers, and strategists work collaboratively to create
                solutions that are both visually stunning and technically robust.
              </p>
              <p>
                We follow a user-centered design approach, constantly testing and iterating based on feedback. Our
                development process emphasizes clean, maintainable code and scalable architecture to ensure your
                solution can grow with your business.
              </p>

              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-medium uppercase text-muted-foreground">Outputs include</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>User experience flows and wireframes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Visual design system and UI components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Functional prototypes for user testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Production-ready code and technical documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Quality assurance and performance testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 */}
      <section ref={section3Ref} className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">03</div>
              <h2 className="text-3xl font-bold mt-4">Delivering impact</h2>
              <p className="text-muted-foreground mt-2">Implementation & growth</p>
            </div>

            <div className="md:w-2/3 space-y-6">
              <p>
                Launching a product is just the beginning. We work closely with your team to ensure successful
                implementation, adoption, and continuous improvement. Our approach focuses on measuring impact against
                the defined KPIs and making data-driven decisions for future enhancements.
              </p>
              <p>
                We provide comprehensive training and documentation to ensure your team can maintain and evolve the
                solution independently. For clients who prefer ongoing support, we offer flexible maintenance and growth
                packages tailored to your specific needs.
              </p>

              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-medium uppercase text-muted-foreground">Outputs include</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Launch strategy and implementation plan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>User onboarding and training materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Analytics implementation and performance dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Post-launch optimization recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Growth roadmap and scaling strategy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 md:py-32 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            <div className="md:w-1/3">
              <div className="text-8xl font-bold tracking-tighter">04</div>
              <h2 className="text-3xl font-bold mt-4">Featured work</h2>
              <p className="text-muted-foreground mt-2">Selected projects</p>
            </div>

            <div className="md:w-2/3">
              <p className="text-xl">
                Where creativity seamlessly meets purpose, pushing boundaries and transforming ideas into impactful
                experiences.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                id: 1,
                title: "VR Architectural Visualization",
                description:
                  "An immersive virtual reality experience allowing clients to explore architectural designs before construction begins.",
                image: "/placeholder.svg?height=400&width=600",
                category: "vr",
                code: "RYPT-2023-001",
              },
              {
                id: 2,
                title: "E-Commerce Platform",
                description:
                  "A scalable e-commerce solution with advanced product filtering and secure payment processing.",
                image: "/placeholder.svg?height=400&width=600",
                category: "software",
                code: "RYPT-2023-002",
              },
            ].map((project) => (
              <motion.div
                key={project.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden rounded-none border-border/10 bg-background/50 hover:bg-background transition-colors duration-300">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <Barcode value={project.code} width={60} height={20} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/work">
                          View Project
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/work">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to transform your ideas?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Let's collaborate to create innovative solutions that redefine industries and improve lives.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Suggestions */}
      <AISuggestions currentPage="home" />
    </div>
  )
}
