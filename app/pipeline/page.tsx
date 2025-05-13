"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Code,
  FileCode,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Server,
  Zap,
  Building2,
  Film,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"
import { Popup } from "@/components/ui/popup"
import Barcode from "@/components/barcode"

export default function PipelinePage() {
const ref1 = useRef(null)
const ref2 = useRef(null)
const ref3 = useRef(null)
const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
const isInView3 = useInView(ref3, { once: true, margin: "-100px" })
const [scrollProgress, setScrollProgress] = useState(0)

// Track scroll progress for parallax effects
useEffect(() => {
  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight
    const currentScroll = window.scrollY
    const progress = (currentScroll / totalScroll) * 100
    setScrollProgress(progress)
  }
  
  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

const businesses = [
  {
    name: "RYPTO TEC INC",
    description: "Our main technology company specializing in software engineering, VR/AR development, and emerging technologies.",
    icon: <Building2 className="h-12 w-12" />,
    link: "/",
    code: "RYPTOTEC-MAIN",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    name: "RYPTO STUDIO",
    description: "Creative production studio focusing on video production, 3D animation, and visual storytelling.",
    icon: <Film className="h-12 w-12" />,
    link: "/studio",
    code: "RYPTOTEC-STUDIO",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    name: "RYPTO ANIMATION",
    description: "Specialized animation studio creating high-quality 3D animations and visual effects.",
    icon: <Layers className="h-12 w-12" />,
    link: "#",
    code: "RYPTOTEC-ANIM",
    color: "from-green-500/20 to-teal-500/20"
  },
  {
    name: "RYPTO LABS",
    description: "Research and development division exploring cutting-edge technologies and innovative solutions.",
    icon: <Zap className="h-12 w-12" />,
    link: "#",
    code: "RYPTOTEC-LABS",
    color: "from-purple-500/20 to-pink-500/20"
  }
]

const pipelineSteps = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Development",
    description: "Our developers write clean, efficient code following best practices and industry standards.",
    details: [
      "Version control with Git",
      "Code reviews and pair programming",
      "Test-driven development",
      "Documentation",
      "Local development environment",
    ],
  },
  {
    icon: <GitBranch className="h-8 w-8" />,
    title: "Version Control",
    description:
      "We use Git for version control, with a branching strategy that ensures code quality and collaboration.",
    details: ["Feature branches", "Pull requests", "Code reviews", "Automated testing", "Continuous integration"],
  },
  {
    icon: <FileCode className="h-8 w-8" />,
    title: "Testing",
    description: "Comprehensive testing ensures our code is reliable, performant, and bug-free.",
    details: [
      "Unit testing",
      "Integration testing",
      "End-to-end testing",
      "Performance testing",
      "Accessibility testing",
    ],
  },
  {
    icon: <GitPullRequest className="h-8 w-8" />,
    title: "Code Review",
    description: "Our team conducts thorough code reviews to maintain code quality and share knowledge.",
    details: [
      "Peer review process",
      "Automated code quality checks",
      "Security vulnerability scanning",
      "Performance optimization",
      "Documentation review",
    ],
  },
  {
    icon: <GitMerge className="h-8 w-8" />,
    title: "Continuous Integration",
    description: "Automated CI pipelines build, test, and validate code changes before they're merged.",
    details: [
      "Automated builds",
      "Test suite execution",
      "Code quality analysis",
      "Security scanning",
      "Performance benchmarking",
    ],
  },
  {
    icon: <Server className="h-8 w-8" />,
    title: "Deployment",
    description: "Our deployment process is automated, reliable, and includes rollback capabilities.",
    details: [
      "Staging environment deployment",
      "Production deployment",
      "Blue-green deployment",
      "Canary releases",
      "Automated rollbacks",
    ],
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Monitoring",
    description:
      "Continuous monitoring ensures our applications are performing optimally and identifies issues quickly.",
    details: [
      "Performance monitoring",
      "Error tracking",
      "User analytics",
      "Server health monitoring",
      "Alerting and notifications",
    ],
  },
]

// Pipeline animation for the background
const PipelineAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 800 600" className="opacity-20">
        {/* Horizontal pipeline */}
        <line x1="100" y1="300" x2="700" y2="300" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray="20,10" />
        
        {/* Nodes */}
        {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
          <circle
            key={`node-${i}`}
            cx={x}
            cy={300}
            r="15"
            fill="currentColor"
            fillOpacity="0.5"
          />
        ))}
        
        {/* Data packets */}
        {[1, 2, 3].map((_, i) => (
          <circle
            key={`packet-${i}`}
            cx={100 + (i * 200)}
            cy={300}
            r="8"
            fill="currentColor"
          >
            <animate
              attributeName="cx"
              from="100"
              to="700"
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

return (
  <div className="flex flex-col">
    {/* Hero Section */}
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-4">
                <Barcode value="RYPTO-PIPELINE-2023" width={150} height={30} />
              </div>
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                title="Our Development Pipeline"
              >
                Our Development Pipeline
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A streamlined, efficient process that ensures high-quality deliverables and exceptional results for
                every project.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/work">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[350px] w-full">
              <PipelineAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* RYPTO Businesses Section */}
    <section className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-3xl space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Businesses">
            RYPTO TEC Businesses
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Discover our family of specialized businesses, each focused on delivering excellence in their domain.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {businesses.map((business, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full overflow-hidden">
                <div className={`bg-gradient-to-r ${business.color} p-6`}>
                  <div className="flex justify-between items-start">
                    <div className="text-primary">{business.icon}</div>
                    <Barcode value={business.code} width={100} height={25} />
                  </div>
                  <CardTitle className="mt-4">{business.name}</CardTitle>
                </div>
                <CardContent className="p-6">
                  <CardDescription className="text-base">{business.description}</CardDescription>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button asChild variant={business.link === "#" ? "outline" : "default"}>
                    <Link href={business.link}>
                      {business.link === "#" ? "Coming Soon" : "Learn More"}
                      {business.link !== "#" && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Pipeline Steps Section */}
    <section className="py-12 md:py-24" ref={ref1}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-3xl space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Pipeline Process">
            Our Pipeline Process
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Our development pipeline is designed to ensure efficiency, quality, and transparency throughout the
            project lifecycle.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Pipeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>

          {/* Pipeline Steps */}
          <div className="space-y-12 md:space-y-0">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-16`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <Popup
                    trigger={
                      <div className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`text-primary ${index % 2 === 0 ? "md:order-last" : ""}`}>{step.icon}</div>
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    }
                    title={`${step.title} Process`}
                  >
                    <div className="space-y-4">
                      <p>{step.description}</p>
                      <h4 className="text-lg font-medium">Key Components:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 text-primary shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4">
                        <Button asChild>
                          <Link href="/contact">
                            Discuss Your Project
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  \
