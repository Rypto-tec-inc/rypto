"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Search, X, Calendar, User, LucideTag, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popup } from "@/components/ui/popup"
import Barcode from "@/components/barcode"
import AISuggestions from "@/components/ai-suggestions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Project data
const projectsData = [
  {
    id: 3,
    title: "RYPTO QR Code Generator",
    description: "A powerful QR code generation tool built as an in-house software solution. Create customized QR codes for various purposes with advanced features and styling options.",
    image: "/work/qrcode-gen.png",
    categories: ["Web Development", "QR Code", "Tool", "In-house"],
    client: "RYPTO TEC INC",
    year: "2025",
    featured: true,
    projectCode: "RYPT-2025-002",
    gallery: [
      "/work/qrcode-gen.png"
    ],
    duration: "2 months (March 1, 2025 - April 30, 2025)",
    contributors: [{
      name: "Victor Edet Coleman",
      role: "Lead Developer",
      image: "/team/victor.jpg",
      profileUrl: "/team#victor"
    }],
    projectUrl: "https://rypto-qrcode-genx.vercel.app",
    technologies: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "QR Code API",
      "Vercel"
    ],
    features: [
      "Custom QR code generation",
      "Multiple QR code styles",
      "Download in various formats",
      "Real-time preview",
      "Mobile responsive design"
    ],
    testimonial: {
      quote: "Our QR Code Generator has become an essential tool for our team and clients, streamlining the process of creating professional QR codes.",
      author: "RYPTO TEC INC",
      position: "Development Team"
    }
  },
  {
  id: 1,
  title: "VR Architectural Visualization",
  description:
    "An immersive virtual reality experience allowing clients to explore architectural designs before construction begins.",
  image: "/placeholder.svg?height=600&width=800",
  categories: ["VR/AR", "3D Modeling", "Interactive"],
  client: "Modern Architects Inc.",
  year: "2023",
  featured: true,
  projectCode: "RYPT-2023-001",
  gallery: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  duration: "4 months",
  team: ["Project Manager", "VR Developer", "3D Artist", "UI/UX Designer"],
  technologies: ["Unity", "Blender", "Oculus SDK", "C#"],
  challenges:
    "One of the main challenges was optimizing the 3D models and textures to maintain high visual fidelity while ensuring smooth performance in VR. We implemented various optimization techniques, including LOD (Level of Detail) systems, texture atlasing, and occlusion culling to achieve the desired balance between visual quality and performance.",
  results:
    "The VR experience has significantly improved the client's design review process, reducing the need for physical mockups and allowing for faster iteration on design changes. Stakeholders can now make more informed decisions earlier in the design process, leading to cost savings and improved client satisfaction.",
  testimonial: {
    quote:
      "The VR experience created by RYPTO TEC INC has transformed how we present designs to our clients. It's an invaluable tool that has improved our design process and client satisfaction.",
    author: "John Smith",
    position: "Design Director, Modern Architects Inc.",
  },
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
},
{
  id: 2,
  title: "Sherman Resources Website",
  description: "A modern, responsive website for Sherman Resources built with Next.js 14, featuring server-side rendering, dynamic routing, and a beautiful user interface designed with Tailwind CSS.",
  image: "/work/sherman_resources.png",
  categories: ["Web Development", "Next.js", "React", "Frontend"],
  client: "Sherman Resources",
  year: "2025",
  featured: true,
  projectCode: "RYPT-2025-001",
  gallery: [
    "/work/sherman_resources.png"
  ],
  duration: "1.5 months (April 20, 2025 - May 30, 2025)",
  contributors: [{
    name: "Victor Edet Coleman",
    role: "Lead Developer",
    image: "/team/victor.jpg",
    profileUrl: "/team#victor",
    contribution: "Full-stack development, UI/UX implementation, and deployment"
  }],
  technologies: [
    "Next.js 14",
    "React 18",
    "TypeScript 5",
    "Tailwind CSS 3",
    "Framer Motion",
    "Vercel"
  ],
  stack: {
    frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Next.js API Routes", "Server Components", "Server Actions"],
    deployment: ["Vercel", "CI/CD Pipeline"]
  },
  challenges: "The project required building a high-performance website with excellent SEO capabilities. We leveraged Next.js 14's app router and server components for optimal performance, implemented responsive design patterns, and ensured accessibility compliance. The site features dynamic content loading, optimized images, and smooth animations using Framer Motion.",
  results: "Successfully delivered a modern, fast-loading website at https://v0-sherman-resources-website.vercel.app/. The site achieved excellent Core Web Vitals scores, features server-side rendering for SEO optimization, and provides an engaging user experience across all devices.",
  testimonial: {
    quote: "The new website perfectly represents our brand and has significantly improved our online presence.",
    author: "Sherman Resources",
    position: "Management Team"
  },
  videoUrl: ""
}]

// Extract all unique categories
const allCategories = Array.from(new Set(projectsData.flatMap(project => project.categories))).sort()

// Extract all unique years
const allYears = Array.from(new Set(projectsData.map(project => project.year))).sort()

// Extract all unique clients
const allClients = Array.from(new Set(projectsData.map(project => project.client))).sort()

// Team member component with image
const TeamMember = ({ member }: { member: { name: string; role: string; image: string; profileUrl?: string } }) => {
  return (
    member.profileUrl ? (
      <Link href={member.profileUrl} className="group">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all">
          <div className="relative">
            <Image
              src={member.image}
              alt={member.name}
              width={32}
              height={32}
              className="rounded-full ring-2 ring-offset-2 ring-transparent group-hover:ring-primary transition-all"
            />
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-medium group-hover:text-primary transition-colors">{member.name}</span>
            <span className="text-xs text-muted-foreground">{member.role}</span>
          </div>
        </div>
      </Link>
    ) : (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50 backdrop-blur-sm">
        <Image
          src={member.image}
          alt={member.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col text-sm">
          <span className="font-medium">{member.name}</span>
          <span className="text-xs text-muted-foreground">{member.role}</span>
        </div>
      </div>
    )
  )
}

// Project card component
const ProjectCard = ({ project, viewMode = 'grid' }: { project: any, viewMode?: 'grid' | 'list' }) => {
  return (
    <Card className={`group relative overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
      <div className={`relative ${viewMode === 'list' ? 'w-72' : 'aspect-video'} overflow-hidden`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className={`${viewMode === 'list' ? 'flex-1 ' : ''}p-6 space-y-4`}>
        <div>
          <CardTitle className="mb-2">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>
        
        <div className="flex flex-col gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {project.categories.map((category: string) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          {/* Project Info and Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
              <p className="text-sm">{project.client}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Year</h4>
              <p className="text-sm">{project.year}</p>
            </div>
          </div>

          {/* Contributors */}
          {project.contributors && project.contributors.length > 0 && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
              <Image
                src={project.contributors[0].image}
                alt={project.contributors[0].name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{project.contributors[0].name}</p>
                <p className="text-xs text-muted-foreground">{project.contributors[0].role}</p>
              </div>
            </div>
          )}

          {/* Project Link */}
          {project.projectUrl && (
            <Link 
              href={project.projectUrl}
              target="_blank"
              className="flex items-center justify-between p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <span className="text-sm font-medium">Visit Website</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function WorkPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Filter projects based on search query and filters
  useEffect(() => {
    const filtered = projectsData.filter((project) => {
      // Search query filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || project.categories.some((category) => selectedCategories.includes(category))

      // Year filter
      const matchesYear = selectedYears.length === 0 || selectedYears.includes(project.year)

      // Client filter
      const matchesClient = selectedClients.length === 0 || selectedClients.includes(project.client)

      // Featured filter
      const matchesFeatured = !showFeaturedOnly || project.featured

      return matchesSearch && matchesCategory && matchesYear && matchesClient && matchesFeatured
    })

    setFilteredProjects(filtered)
  }, [searchQuery, selectedCategories, selectedYears, selectedClients, showFeaturedOnly])

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedYears([])
    setSelectedClients([])
    setShowFeaturedOnly(false)
  }

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Toggle year selection
  const toggleYear = (year: string) => {
    setSelectedYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
  }

  // Toggle client selection
  const toggleClient = (client: string) => {
    setSelectedClients((prev) => (prev.includes(client) ? prev.filter((c) => c !== client) : [...prev, client]))
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-4">
            <div className="text-8xl font-bold tracking-tighter">03</div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our Work</h1>
              <p className="mt-2 text-xl text-muted-foreground">
                Explore our portfolio of innovative projects across various industries and technologies.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-9 rounded-none border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Categories Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-none border-border">
                    Categories
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border-border">
                  <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    {allCategories.map((category) => (
                      <DropdownMenuGroup key={category}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {category}
                            </label>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Years Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-none border-border">
                    Years
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border-border">
                  <DropdownMenuLabel>Select Years</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {allYears.map((year) => (
                    <DropdownMenuGroup key={year}>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`year-${year}`}
                            checked={selectedYears.includes(year)}
                            onCheckedChange={() => toggleYear(year)}
                          />
                          <label
                            htmlFor={`year-${year}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {year}
                          </label>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clients Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-none border-border">
                    Clients
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border-border">
                  <DropdownMenuLabel>Select Clients</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    {allClients.map((client) => (
                      <DropdownMenuGroup key={client}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`client-${client}`}
                              checked={selectedClients.includes(client)}
                              onCheckedChange={() => toggleClient(client)}
                            />
                            <label
                              htmlFor={`client-${client}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {client}
                            </label>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Featured Filter */}
              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                size="sm"
                className="rounded-none border-border"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              >
                Featured
              </Button>

              {/* Clear Filters */}
              {(searchQuery ||
                selectedCategories.length > 0 ||
                selectedYears.length > 0 ||
                selectedClients.length > 0 ||
                showFeaturedOnly) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedYears.length > 0 || selectedClients.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  {category} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {selectedYears.map((year) => (
                <Badge key={year} variant="secondary" className="cursor-pointer" onClick={() => toggleYear(year)}>
                  {year} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {selectedClients.map((client) => (
                <Badge key={client} variant="secondary" className="cursor-pointer" onClick={() => toggleClient(client)}>
                  {client} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
        </motion.div>

        <div ref={ref} className="space-y-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your search criteria.</p>
              <Button variant="outline" className="mt-4 rounded-none border-border" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div>
              {/* View toggle */}
              <div className="flex items-center justify-end gap-2 mb-6">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                  </svg>
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                  List
                </Button>
              </div>

              {/* Projects container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className={viewMode === 'grid' ? 
                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
                  'flex flex-col gap-6'}
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <ProjectCard project={project} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Card className="p-6 hover:shadow-md transition-shadow rounded-none border-border">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-medium">Partners</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Collaborate with us to bring your innovative ideas to life.
            </p>
            <Button asChild variant="outline" className="w-full rounded-none border-border">
              <Link href="/partners">
                View Partners
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow rounded-none border-border">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-medium">Gallery</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Browse our portfolio of projects, designs, and video showcases.
            </p>
            <Button asChild variant="outline" className="w-full rounded-none border-border">
              <Link href="/gallery">
                View Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow rounded-none border-border">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 mr-2" />
              <h3 className="text-lg font-medium">Team</h3>
            </div>
            <p className="text-muted-foreground mb-4">Meet the talented individuals behind our innovative solutions.</p>
            <Button asChild variant="outline" className="w-full rounded-none border-border">
              <Link href="/team">
                Meet Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </motion.div>

        {/* Project Detail Popup */}
        <AnimatePresence>
          {selectedProject && (
            <Popup
              isOpen={!!selectedProject}
              onOpenChange={(open) => !open && setSelectedProject(null)}
              title={selectedProject.title}
              size="xl"
              trigger={<div />} // Empty div as trigger since we control open state externally
            >
              <div className="space-y-6">
                <div className="aspect-video relative overflow-hidden rounded-none border border-border">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.categories.map((category: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Barcode value={selectedProject.projectCode} width={120} height={30} />
                </div>

                <div>
                  <p className="text-lg">{selectedProject.description}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                    <p className="font-medium">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Year</h3>
                    <p className="font-medium">{selectedProject.year}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button asChild variant="outline" className="rounded-none border-border">
                    <Link href={`/projects/${selectedProject.id}`}>
                      View Full Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Popup>
          )}
        </AnimatePresence>
      </div>

      <AISuggestions currentPage="work" />
    </div>
  )
}
