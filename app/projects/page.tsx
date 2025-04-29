"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Clock, Code, Layers, Headset, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

// Project data
const projects = [
  {
    id: 1,
    title: "RYPTO Learn Platform",
    description:
      "An interactive learning platform designed to teach programming and digital skills to African youth. Features include localized content, offline capabilities, and peer collaboration tools.",
    category: "Software",
    icon: Code,
    progress: 45,
    status: "Prototype Development",
    expectedLaunch: "Q3 2025",
    featured: true,
    links: {
      demo: "#",
      github: "#",
    },
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 2,
    title: "Virtual Liberia",
    description:
      "An immersive VR experience showcasing Liberia's cultural heritage, historical landmarks, and natural beauty. Designed for educational purposes and tourism promotion.",
    category: "VR/AR",
    icon: Headset,
    progress: 30,
    status: "Asset Creation",
    expectedLaunch: "Q4 2025",
    featured: true,
    links: {
      demo: "#",
    },
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 3,
    title: "AfriViz",
    description:
      "A 3D visualization tool for architectural and urban planning projects, optimized for African contexts. Features include climate-responsive design tools and local material libraries.",
    category: "3D/Architecture",
    icon: Layers,
    progress: 20,
    status: "Concept Development",
    expectedLaunch: "Q2 2026",
    featured: true,
    links: {
      demo: "#",
      github: "#",
    },
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 4,
    title: "EcoTrack",
    description:
      "A mobile application for tracking and reducing carbon footprints, with features specifically designed for African urban environments.",
    category: "Software",
    icon: Code,
    progress: 15,
    status: "Research Phase",
    expectedLaunch: "Q3 2026",
    featured: false,
    links: {},
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 5,
    title: "HealthConnect",
    description:
      "A telemedicine platform connecting rural communities with healthcare professionals, featuring low-bandwidth video consultations and offline medical reference materials.",
    category: "Software",
    icon: Code,
    progress: 10,
    status: "Planning Phase",
    expectedLaunch: "Q4 2026",
    featured: false,
    links: {},
    image: "/placeholder.svg?height=600&width=600",
  },
]

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
      // Set the first project as active by default
      setActiveProject(projects[0].id)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Our Projects</h1>
            <p className="text-lg text-muted-foreground">
              We're actively working on groundbreaking platforms. Our goal is to launch our first public product in the
              coming months.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Status */}
      <section>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {loading ? (
              <>
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
              </>
            ) : (
              <>
                <div className="p-6 rounded-lg border bg-card text-center hover:shadow-md transition-shadow">
                  <h3 className="text-4xl font-bold mb-2">0</h3>
                  <p className="text-muted-foreground">Live Products</p>
                </div>
                <div className="p-6 rounded-lg border bg-card text-center hover:shadow-md transition-shadow">
                  <h3 className="text-4xl font-bold mb-2">3</h3>
                  <p className="text-muted-foreground">In Development</p>
                </div>
                <div className="p-6 rounded-lg border bg-card text-center hover:shadow-md transition-shadow">
                  <h3 className="text-4xl font-bold mb-2">5+</h3>
                  <p className="text-muted-foreground">Concept Stage</p>
                </div>
              </>
            )}
          </div>

          {/* Featured Projects */}
          <div className="mb-24">
            <h2 className="heading-lg text-center mb-12">Featured Projects</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {loading ? (
                <>
                  <Skeleton className="h-64" />
                  <Skeleton className="h-64" />
                  <Skeleton className="h-64" />
                </>
              ) : (
                projects
                  .filter((project) => project.featured)
                  .map((project) => {
                    const Icon = project.icon
                    return (
                      <div
                        key={project.id}
                        className={`p-6 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer ${
                          activeProject === project.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setActiveProject(project.id)}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-2 rounded-md bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Clock className="h-4 w-4" />
                          <span>Expected launch: {project.expectedLaunch}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground">{project.status}</p>
                        </div>
                      </div>
                    )
                  })
              )}
            </div>
          </div>

          {/* Project Details */}
          {activeProject && !loading && (
            <div className="mb-24 animate-fade-in">
              <h2 className="heading-md mb-8">Project Details</h2>

              {projects
                .filter((project) => project.id === activeProject)
                .map((project) => {
                  const Icon = project.icon
                  return (
                    <div key={project.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-md bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold">{project.title}</h3>
                        </div>

                        <div className="space-y-6">
                          <p className="text-muted-foreground">{project.description}</p>

                          <div>
                            <h4 className="font-medium mb-2">Project Status</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress:</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{project.status}</span>
                                <span>Expected launch: {project.expectedLaunch}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {project.links.demo && (
                              <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-accent transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span>View Demo</span>
                              </a>
                            )}
                            {project.links.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-accent transition-colors"
                              >
                                <Github className="h-4 w-4" />
                                <span>GitHub Repository</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover mono-filter"
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {/* All Projects */}
          <div className="space-y-12">
            <h2 className="heading-lg text-center mb-8">All Projects</h2>

            {loading
              ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-64 mb-8" />)
              : projects.map((project) => {
                  const Icon = project.icon
                  return (
                    <div
                      key={project.id}
                      className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-2 rounded-md bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                          <Clock className="h-4 w-4" />
                          <span>Expected launch: {project.expectedLaunch}</span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Current Status:</h4>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {project.progress}% Complete - {project.status}
                          </p>
                        </div>
                      </div>
                      <div className="bg-secondary rounded-lg overflow-hidden">
                        <div className="relative w-full h-full min-h-[200px]">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover mono-filter"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background">
        <div className="section-container text-center">
          <h2 className="heading-lg mb-6">Interested in our projects?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Stay updated on our progress or discuss potential collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-background text-foreground hover:bg-background/90 transition-colors"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
