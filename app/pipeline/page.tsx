"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  FileCode,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Play,
  Server,
  Settings,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popup } from "@/components/ui/popup"

export default function PipelinePage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" })
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" })
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" })

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

  const technologies = {
    development: [
      { name: "VS Code", description: "Our primary code editor with extensions for productivity and code quality." },
      { name: "GitHub", description: "Platform for version control, code reviews, and collaboration." },
      { name: "TypeScript", description: "Strongly typed programming language that builds on JavaScript." },
      { name: "ESLint", description: "Static code analysis tool for identifying problematic patterns." },
      { name: "Prettier", description: "Code formatter that ensures consistent code style." },
    ],
    testing: [
      { name: "Jest", description: "JavaScript testing framework for unit and integration tests." },
      { name: "Cypress", description: "End-to-end testing framework for web applications." },
      { name: "Playwright", description: "Browser automation library for cross-browser testing." },
      { name: "React Testing Library", description: "Testing utilities for React components." },
      { name: "Lighthouse", description: "Automated tool for improving web page quality." },
    ],
    deployment: [
      { name: "GitHub Actions", description: "CI/CD platform integrated with GitHub repositories." },
      { name: "Docker", description: "Platform for developing, shipping, and running applications in containers." },
      { name: "Kubernetes", description: "Container orchestration system for automating deployment and scaling." },
      { name: "Vercel", description: "Platform for frontend frameworks and static sites." },
      { name: "AWS", description: "Cloud computing services for hosting and infrastructure." },
    ],
    monitoring: [
      { name: "Datadog", description: "Monitoring and analytics platform for cloud applications." },
      { name: "Sentry", description: "Error tracking and performance monitoring." },
      { name: "New Relic", description: "Observability platform for monitoring application performance." },
      { name: "Grafana", description: "Open-source analytics and monitoring solution." },
      { name: "Prometheus", description: "Monitoring system and time series database." },
    ],
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
                <div className="pipeline-animation absolute inset-0">
                  <div className="pipeline-line"></div>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="pipeline-node"
                      style={{
                        left: `${20 + i * 15}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
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
                    </Popup>
                  </div>

                  {/* Center Circle for Desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 md:py-24 bg-muted/50" ref={ref2}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Our Technologies">
              Our Technologies
            </h2>
            <p className="text-muted-foreground md:text-lg">
              We use cutting-edge technologies and tools to ensure efficient development, testing, deployment, and
              monitoring.
            </p>
          </motion.div>

          <div className="mt-12">
            <Tabs defaultValue="development" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="development" title="Development tools">
                  Development
                </TabsTrigger>
                <TabsTrigger value="testing" title="Testing tools">
                  Testing
                </TabsTrigger>
                <TabsTrigger value="deployment" title="Deployment tools">
                  Deployment
                </TabsTrigger>
                <TabsTrigger value="monitoring" title="Monitoring tools">
                  Monitoring
                </TabsTrigger>
              </TabsList>

              {Object.entries(technologies).map(([category, tools]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>{tool.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{tool.description}</CardDescription>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-24" ref={ref3}>
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" title="Benefits of Our Pipeline">
              Benefits of Our Pipeline
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Our streamlined development pipeline offers numerous advantages for your projects.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Zap className="h-10 w-10" />,
                title: "Faster Time to Market",
                description:
                  "Our efficient pipeline reduces development time, allowing your products to reach the market faster.",
              },
              {
                icon: <CheckCircle className="h-10 w-10" />,
                title: "Higher Quality",
                description: "Comprehensive testing and code reviews ensure high-quality deliverables with fewer bugs.",
              },
              {
                icon: <Settings className="h-10 w-10" />,
                title: "Scalability",
                description:
                  "Our pipeline is designed to scale with your project, handling increased complexity and team size.",
              },
              {
                icon: <Database className="h-10 w-10" />,
                title: "Reliability",
                description: "Automated processes reduce human error and ensure consistent, reliable results.",
              },
              {
                icon: <GitMerge className="h-10 w-10" />,
                title: "Collaboration",
                description:
                  "Our pipeline facilitates team collaboration, with clear processes for code reviews and feedback.",
              },
              {
                icon: <Play className="h-10 w-10" />,
                title: "Continuous Improvement",
                description: "We continuously refine our pipeline based on feedback and emerging best practices.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader>
                    <div className="mb-2 text-primary">{benefit.icon}</div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to start your project?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Let's collaborate to create innovative solutions using our efficient development pipeline.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
