"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, ChevronLeft, ChevronRight, Code, Globe, Layers, Users, Lightbulb, Graduation, Award, Shield, Zap, Menu } from "lucide-react"
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
  const [showNavSuggestions, setShowNavSuggestions] = useState(false)

  // Auto rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Add scroll event listener to show/hide nav suggestions
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowNavSuggestions(scrollPosition > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const heroImages = [
    {
      src: "/main/1312223.jpeg",
      alt: "RYPTO TEC Software Development",
      title: "Advanced Software Solutions",
      description: "Custom software development tailored to your business needs",
    },
    {
      src: "/main/y.jpg",
      alt: "RYPTO TEC Animation Studio",
      title: "Creative Animation",
      description: "Bringing ideas to life through stunning animations",
    },
    {
      src: "/main/cyberpunkcity.jpg",
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

  const stats = [
    { label: "Projects Completed", value: "50+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Team Members", value: "15+" },
    { label: "Years Experience", value: "2+" },
  ]

  const services = [
    {
      icon: Code,
      title: "Software Development",
      description: "Custom software solutions built with cutting-edge technologies",
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Responsive and modern web applications",
    },
    {
      icon: Layers,
      title: "3D Animation",
      description: "Stunning visual content for your brand",
    },
    {
      icon: Users,
      title: "UI/UX Design",
      description: "User-centered design that delights",
    },
  ]

  const testimonials = [
    {
      quote: "RYPTO TEC transformed our digital presence with their innovative solutions.",
      author: "John Doe",
      role: "CEO, TechCorp",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "Their team's expertise in animation brought our vision to life.",
      author: "Jane Smith",
      role: "Creative Director, DesignStudio",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "Working with RYPTO TEC has been a game-changer for our business.",
      author: "Mike Johnson",
      role: "CTO, StartupX",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div ref={mainRef} className="flex flex-col">
      {/* Floating Navigation Suggestions */}
      <AnimatePresence>
        {showNavSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
          >
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg border border-border p-2">
              <div className="flex gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#services">
                    Services
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#work">
                    Work
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#contact">
                    Contact
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/gallery">
                    Gallery
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/work">
                    View Our Work
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
              src="/main/1312223.jpeg"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology solutions to help your business thrive in the digital age.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" ref={section1Ref} className="py-24 md:py-32 bg-muted/10">
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
            </div>
          </div>
        </div>
      </section>

      {/* Development Section */}
      <section ref={section2Ref} className="py-24 md:py-32">
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
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={section3Ref} className="py-24 md:py-32 bg-muted/10">
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
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.author}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-24 md:py-32 bg-muted/10">
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
            {/* Featured Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src="/main/1312223.jpeg"
                    alt="Project 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">E-commerce Platform</h3>
                  <p className="text-muted-foreground mb-4">
                    A modern e-commerce solution with advanced features and seamless user experience.
                  </p>
                  <div className="flex gap-2">
                    <UIBadge>Web Development</UIBadge>
                    <UIBadge>UI/UX Design</UIBadge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Featured Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src="/main/y.jpg"
                    alt="Project 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">3D Animation Series</h3>
                  <p className="text-muted-foreground mb-4">
                    A captivating animation series showcasing our creative capabilities.
                  </p>
                  <div className="flex gap-2">
                    <UIBadge>3D Animation</UIBadge>
                    <UIBadge>Visual Effects</UIBadge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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

      {/* Technology Stack Section */}
      <section className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Our Technology Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We leverage cutting-edge technologies to build robust and scalable solutions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                category: "Frontend",
                technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
              },
              {
                category: "Backend",
                technologies: ["Node.js", "Python", "Java", "PostgreSQL"],
              },
              {
                category: "Animation",
                technologies: ["Blender", "Maya", "Unity", "Unreal Engine"],
              },
              {
                category: "DevOps",
                technologies: ["Docker", "AWS", "GitHub Actions", "Kubernetes"],
              },
            ].map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{stack.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((tech) => (
                        <UIBadge key={tech} variant="secondary">
                          {tech}
                        </UIBadge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 md:py-32">
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
