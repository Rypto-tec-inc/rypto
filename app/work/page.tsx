"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Popup } from "@/components/ui/popup"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample projects data
const projectsData = [
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
  },
  {
    id: 2,
    title: "E-Commerce Platform Redesign",
    description:
      "Complete redesign and development of an e-commerce platform, improving user experience and increasing conversion rates.",
    image: "/placeholder.svg?height=600&width=800",
    categories: ["Web Development", "UI/UX Design", "E-Commerce"],
    client: "Global Retail Solutions",
    year: "2022",
    featured: true,
  },
  {
    id: 3,
    title: "Mobile Banking Application",
    description:
      "A secure and user-friendly mobile banking application with advanced features and biometric authentication.",
    image: "/placeholder.svg?height=600&width=800",
    categories: ["Mobile Development", "FinTech", "Security"],
    client: "NextGen Banking",
    year: "2023",
    featured: false,
  },
  {
    id: 4,
    title: "Interactive Product Showcase",
    description:
      "An interactive 3D product showcase allowing users to explore product features in detail through an immersive experience.",
    image: "/placeholder.svg?height=600&width=800",
    categories: ["3D Animation", "Interactive", "Product Design"],
    client: "Tech Innovations Ltd.",
    year: "2022",
    featured: false,
  },
  {
    id: 5,
    title: "Corporate Training VR Simulation",
    description:
      "Virtual reality training simulations for corporate employees, providing realistic scenarios for skill development.",
    image: "/placeholder.svg?height=600&width=800",
    categories: ["VR/AR", "Training", "Simulation"],
    client: "Enterprise Learning Solutions",
    year: "2023",
    featured: true,
  },
  {
    id: 6,
    title: "Healthcare Management System",
    description:
      "A comprehensive healthcare management system streamlining patient care, appointments, and medical records.",
    image: "/placeholder.svg?height=600&width=800",
    categories: ["Web Development", "Healthcare", "Database"],
    client: "MediCare Systems",
    year: "2022",
    featured: false,
  },
]

// Extract all unique categories
const allCategories = Array.from(new Set(projectsData.flatMap((project) => project.categories))).sort()

// Extract all unique years
const allYears = Array.from(new Set(projectsData.map((project) => project.year)))
  .sort()
  .reverse()

// Extract all unique clients
const allClients = Array.from(new Set(projectsData.map((project) => project.client))).sort()

export default function WorkPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
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
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" title="Our Work">
            Our Work
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            Explore our portfolio of innovative projects across various industries and technologies.
          </p>
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
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Categories Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Categories
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
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
                  <Button variant="outline" size="sm">
                    Years
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
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
                  <Button variant="outline" size="sm">
                    Clients
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
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
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
                  className="group"
                >
                  <Card
                    className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          title={project.title}
                        />
                        {project.featured && (
                          <div className="absolute top-2 left-2">
                            <Badge>Featured</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col">
                        <CardTitle className="mb-2" title={project.title}>
                          {project.title}
                        </CardTitle>
                        <CardDescription className="mb-4">{project.description}</CardDescription>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.categories.map((category, i) => (
                            <Badge key={i} variant="secondary" title={category}>
                              {category}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-sm text-muted-foreground mt-auto">
                          <div className="flex justify-between">
                            <span title={`Client: ${project.client}`}>Client: {project.client}</span>
                            <span title={`Year: ${project.year}`}>Year: {project.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button asChild size="lg">
            <Link href="/contact" title="Discuss your project with us">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Project Detail Popup */}
      <AnimatePresence>
        {selectedProject && (
          <Popup
            isOpen={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedProject(null)}
            title={selectedProject.title}
            size="xl"
          >
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.categories.map((category: string, i: number) => (
                  <Badge key={i} variant="secondary">
                    {category}
                  </Badge>
                ))}
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
                <Button asChild>
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
  )
}
