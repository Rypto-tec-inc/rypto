"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { AISuggestion } from "@/components/ai-suggestion"
import { TensorFlowDemo } from "@/components/tensorflow-demo"
import { SVGDecoration } from "@/components/svg-decorations"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { TestimonialsSection } from "@/components/testimonials-section"
import { VideoPlayer } from "@/components/video-player"

// Partner logos - now only using Zig
const partners = [
  {
    name: "Zig",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/398650338_724320309719591_6000503522797514790_n-removebg-preview-kVgA2ayDaGjcDBB0rDKyMXVRQoRsKz.png",
  },
  {
    name: "Partner 2",
    logo: "/placeholder.svg?height=80&width=160",
  },
  {
    name: "Partner 3",
    logo: "/placeholder.svg?height=80&width=160",
  },
  {
    name: "Partner 4",
    logo: "/placeholder.svg?height=80&width=160",
  },
]

// Process steps
const processSteps = [
  {
    number: "01",
    title: "Unlocking the opportunity",
    subtitle: "Business strategy",
    description:
      "Our projects always begin by gaining a deep understanding of your business goals, customer needs, applicable technologies, the surrounding space, and team structure. We meet in person with key stakeholders—executives, engineers, data scientists, product designers—to immerse ourselves in your world and challenges.",
    outputs: [
      "Insights from qualitative and quantitative user research",
      "Personas for current and future users",
      "Data-driven hypothesis on where to focus",
      "Recommendation on how to best leverage emerging technology",
      "KPIs and success metrics",
    ],
  },
  {
    number: "02",
    title: "Designing the solution",
    subtitle: "Product design",
    description:
      "We create comprehensive design systems that address both user needs and business objectives. Our approach combines aesthetic excellence with functional practicality, ensuring that every element serves a purpose while maintaining visual coherence and brand alignment.",
    outputs: [
      "User experience flows and wireframes",
      "Visual design system and component library",
      "Interactive prototypes for user testing",
      "Accessibility compliance documentation",
      "Design specifications for development",
    ],
  },
  {
    number: "03",
    title: "Building the future",
    subtitle: "Development & implementation",
    description:
      "Our engineering team transforms designs into robust, scalable solutions using cutting-edge technologies. We prioritize code quality, performance optimization, and security while maintaining flexibility for future growth and adaptation to changing requirements.",
    outputs: [
      "Production-ready codebase with documentation",
      "Performance optimization reports",
      "Security audit and compliance verification",
      "Deployment strategy and implementation",
      "Knowledge transfer and training materials",
    ],
  },
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const playFullVideo = () => {
    setShowVideoModal(true)
  }

  const handleVideoPlay = () => {
    setVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setVideoPlaying(false)
  }

  const aiSuggestions = [
    "Explore our VR development services for immersive experiences.",
    "Check out our AI tools specialized for African languages.",
    "Looking for 3D visualization? View our architecture projects.",
    "Need custom software? Contact us for a consultation.",
    "Interested in cybersecurity? Learn about our awareness programs.",
  ]

  return (
    <>
      {/* Hero Section with Video Background */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
        aria-label="Hero Section"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cyberpunk-street-environment-Z8w0nQm1JzGUqAiexP9QC8KT8cLrwt.webp"
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
          >
            <source src="/web_v2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center lg:text-left">
              {loading ? (
                <>
                  <Skeleton className="h-16 w-3/4 mb-6 mx-auto lg:mx-0" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6 mb-8" />
                  <div className="flex gap-4 justify-center lg:justify-start">
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-12 w-32" />
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-white">
                    Building <span className="pencil-text text-gray-400">future-proof</span> tech solutions
                  </h1>
                  <p className="text-xl text-gray-300 mb-10 max-w-lg mx-auto lg:mx-0">
                    RYPTO TEC INC specializes in software development, 3D experiences, immersive environments, and AI
                    tailored for the African ecosystem.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <Link
                      href="/services"
                      className="px-8 py-4 rounded-md bg-gray-500 text-white hover:bg-gray-400 transition-colors"
                    >
                      Our Services
                    </Link>
                    <button
                      onClick={playFullVideo}
                      className="flex items-center gap-2 px-8 py-4 rounded-md border border-white text-white hover:bg-white/10 transition-colors"
                    >
                      <Play className="h-5 w-5" />
                      Watch Video
                    </button>
                  </div>
                </>
              )}
            </motion.div>
            <motion.div className="flex justify-center" initial="hidden" animate="visible" variants={scaleIn}>
              {loading ? (
                <Skeleton className="w-64 h-64 lg:w-80 lg:h-80 rounded-full" />
              ) : (
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 bg-gray-500/10 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-gray-500/20 rounded-full"></div>
                  <div className="absolute inset-8 bg-black/80 rounded-full flex items-center justify-center border border-gray-500/30">
                    <div className="relative w-40 h-40">
                      <Image
                        src="/rypto-logo.png"
                        alt="RYPTO TEC INC Logo"
                        fill
                        className="object-contain mono-filter"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <button
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }}
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="w-full max-w-4xl">
              <VideoPlayer
                src="/web_v2.mp4"
                title="RYPTO TEC INC - Company Overview"
                autoPlay={true}
                loop={false}
                muted={false}
                showControls={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Section - Rearranged with video on left */}
      <section className="py-28   relative overflow-hidden" style={{background:"#181818"}} aria-label="Video Showcase">
        <SVGDecoration type="triangles" className="bottom-left" width={200} height={200} />
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="pencil-text text-2xl">
                Monochromatic: The design relies almost entirely on shades of black and white.
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
              {loading ? (
                <Skeleton className="w-full aspect-video rounded-lg" />
              ) : (
                <VideoPlayer
                  src="/web_v2.mp4"
                  title="RYPTO TEC INC - Company Overview"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                />
              )}
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5 mb-6" />
                  <Skeleton className="h-10 w-32" />
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold mb-4">Transforming Ideas into Reality</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    At RYPTO TEC INC, we believe in the power of technology to transform lives and communities. Our
                    vision is to create innovative solutions that address real-world challenges in Africa and beyond.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    Through our expertise in software development, virtual reality, and artificial intelligence, we're
                    building a future where technology serves humanity and empowers individuals to reach their full
                    potential.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    Learn More About Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section - Enhanced and Dedicated */}
      <section className="py-20 bg-background" data-tour="partners-section" aria-label="Our Partners">
        <div className="container mx-auto px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Collaborating with industry leaders to drive innovation and create cutting-edge solutions
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className="bg-muted p-6 rounded-lg flex items-center justify-center h-32 card-3d"
                  variants={fadeIn}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={80}
                    className="h-16 w-auto object-contain mono-filter"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border hover:bg-accent transition-colors"
            >
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-28 bg-muted" aria-label="Our Process">
        <div className="container mx-auto px-8">
          <motion.div
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="text-sm text-muted-foreground mb-2">FROM START TO FINISH</div>
            <h2 className="text-4xl font-bold">Our Process</h2>
          </motion.div>

          <div className="space-y-32">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <div className="lg:col-span-3">
                  <div className="text-8xl font-bold">{step.number}</div>
                  <h3 className="text-2xl font-bold mt-4 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.subtitle}</p>
                </div>
                <div className="lg:col-span-9">
                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground mb-8 text-lg">{step.description}</p>

                      <div className="mt-8">
                        <div className="text-sm font-medium mb-4">OUTPUTS INCLUDE:</div>
                        <motion.ul
                          className="space-y-2 text-sm text-muted-foreground"
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {step.outputs.map((output, i) => (
                            <motion.li key={i} className="flex items-start gap-2" variants={fadeIn}>
                              <span className="text-gray-500">•</span>
                              <span>{output}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28" aria-label="Key Features">
        <div className="container mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Work more, but <span className="pencil-text text-gray-500">6x faster</span>
            </h2>
            <p className="text-xl text-muted-foreground">Save hours with our innovative solutions</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {loading ? (
              <>
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </>
            ) : (
              <>
                <motion.div
                  className="text-center p-8 border rounded-lg hover:shadow-md transition-shadow card-3d"
                  variants={fadeIn}
                >
                  <div className="text-4xl font-bold mb-4">1%</div>
                  <p className="text-sm text-muted-foreground">
                    Work with advanced AR, easy to improve your productivity
                  </p>
                </motion.div>
                <motion.div
                  className="text-center p-8 border rounded-lg hover:shadow-md transition-shadow card-3d"
                  variants={fadeIn}
                >
                  <div className="text-4xl font-bold mb-4">3+</div>
                  <p className="text-sm text-muted-foreground">Web design sections in dark and light mode</p>
                </motion.div>
                <motion.div
                  className="text-center p-8 border rounded-lg hover:shadow-md transition-shadow card-3d"
                  variants={fadeIn}
                >
                  <div className="text-4xl font-bold mb-4">1+</div>
                  <p className="text-sm text-muted-foreground">
                    Work with universal AI, easy to improve your productivity
                  </p>
                </motion.div>
                <motion.div
                  className="text-center p-8 border rounded-lg hover:shadow-md transition-shadow card-3d"
                  variants={fadeIn}
                >
                  <div className="text-4xl font-bold mb-4">2.3%</div>
                  <p className="text-sm text-muted-foreground">
                    Work with advanced AR, easy to improve your productivity
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {loading ? (
              <>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </>
            ) : (
              <>
                <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm" variants={fadeIn}>
                  <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                  Light Mode
                </motion.div>
                <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm" variants={fadeIn}>
                  <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                  Color Palette
                </motion.div>
                <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm" variants={fadeIn}>
                  <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                  Dark Mode
                </motion.div>
                <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm" variants={fadeIn}>
                  <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                  Web Design Sections
                </motion.div>
                <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm" variants={fadeIn}>
                  <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                  AI Image Generation
                </motion.div>
                <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm" variants={fadeIn}>
                  <span className="w-4 h-4 rounded-full bg-gray-500"></span>
                  App Flows
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-28 bg-muted" aria-label="Case Studies">
        <div className="container mx-auto px-8">
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-sm text-muted-foreground mb-2">SELECTED WORK</div>
            <h2 className="text-4xl font-bold">Case Studies</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {loading ? (
              <>
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
              </>
            ) : (
              <>
                <motion.div className="border rounded-lg overflow-hidden group card-3d" variants={fadeIn}>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/barcode.png"
                      alt="Case Study 1"
                      fill
                      className="object-cover mono-filter group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2">Virtual Liberia</h3>
                    <p className="text-muted-foreground mb-4">
                      An immersive VR experience showcasing Liberia's cultural heritage and natural beauty.
                    </p>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 text-sm hover:underline text-gray-500"
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
                <motion.div className="border rounded-lg overflow-hidden group card-3d" variants={fadeIn}>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/cyberpunk-street.png"
                      alt="Case Study 2"
                      fill
                      className="object-cover mono-filter group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2">RYPTO Learn Platform</h3>
                    <p className="text-muted-foreground mb-4">
                      An interactive learning platform designed to teach programming and digital skills to African
                      youth.
                    </p>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 text-sm hover:underline text-gray-500"
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md border hover:bg-accent transition-colors"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TensorFlow Demo Section */}
      <section className="py-28" aria-label="AI Technology Demo">
        <div className="container mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Solutions</h2>
            <p className="text-xl text-muted-foreground">
              <span className="pencil-text text-2xl">Leveraging TensorFlow for intelligent applications</span>
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <TensorFlowDemo />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="bg-foreground text-background py-20" aria-label="Contact Us">
        <div className="container mx-auto px-8 text-center">
          {loading ? (
            <>
              <Skeleton className="h-10 w-64 mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-2 bg-white/20" />
              <Skeleton className="h-4 w-5/6 max-w-xl mx-auto mb-8 bg-white/20" />
              <Skeleton className="h-12 w-40 mx-auto bg-white/20" />
            </>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to innovate with us?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Whether you have a project in mind or just want to learn more about what we do, we'd love to hear from
                you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-gray-500 text-black hover:bg-gray-400 transition-colors"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* AI Suggestion Component */}
      <AISuggestion suggestions={aiSuggestions} />
    </>
  )
}
