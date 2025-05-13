"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchResults, setSearchResults] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock data for search results
  const allResults = [
    {
      id: 1,
      title: "VR Architectural Visualization",
      description: "An immersive virtual reality experience for architectural designs.",
      type: "project",
      image: "/placeholder.svg?height=200&width=300",
      url: "/work",
    },
    {
      id: 2,
      title: "Software Development Services",
      description: "Custom software solutions for businesses of all sizes.",
      type: "service",
      image: "/placeholder.svg?height=200&width=300",
      url: "/services#software",
    },
    {
      id: 3,
      title: "3D Animation Studio",
      description: "Professional 3D animation services for various industries.",
      type: "service",
      image: "/placeholder.svg?height=200&width=300",
      url: "/services#animation",
    },
    {
      id: 4,
      title: "RYPTO STUDIO",
      description: "Our creative studio specializing in animation and visual storytelling.",
      type: "business",
      image: "/placeholder.svg?height=200&width=300",
      url: "/studio",
    },
    {
      id: 5,
      title: "Meet Our Team",
      description: "Learn about the talented individuals behind RYPTO TEC INC.",
      type: "page",
      image: "/placeholder.svg?height=200&width=300",
      url: "/team",
    },
    {
      id: 6,
      title: "E-Commerce Platform",
      description: "A scalable e-commerce solution with advanced features.",
      type: "project",
      image: "/placeholder.svg?height=200&width=300",
      url: "/work",
    },
    {
      id: 7,
      title: "Virtual Reality Development",
      description: "Cutting-edge VR solutions for immersive experiences.",
      type: "service",
      image: "/placeholder.svg?height=200&width=300",
      url: "/services#emerging-tech",
    },
    {
      id: 8,
      title: "Contact Us",
      description: "Get in touch with our team to discuss your project.",
      type: "page",
      image: "/placeholder.svg?height=200&width=300",
      url: "/contact",
    },
  ]

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Save recent searches to localStorage
  const saveSearch = (query) => {
    if (!query.trim()) return

    const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    saveSearch(searchQuery)

    // Simulate search delay
    setTimeout(() => {
      const filtered = allResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filtered)
      setIsSearching(false)
    }, 500)
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  const filteredResults =
    activeFilter === "all" ? searchResults : searchResults.filter((result) => result.type === activeFilter)

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl gradient-text">Search</h1>
          <p className="text-xl text-muted-foreground">Find projects, services, and information across our site</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-6 rounded-lg"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for projects, services, or pages..."
                  className="pl-10 glass-card border-primary/20 focus:border-primary h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={clearSearch}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <Button type="submit" className="h-12 px-6 hover-glow">
                Search
              </Button>
            </div>
          </form>

          {recentSearches.length > 0 && !searchResults.length && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => {
                      setSearchQuery(search)
                      handleSearch({ preventDefault: () => {} })
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {isSearching && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter:</span>
                <Tabs value={activeFilter} onValueChange={handleFilterChange} className="w-[200px]">
                  <TabsList className="glass-card">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="project">Projects</TabsTrigger>
                    <TabsTrigger value="service">Services</TabsTrigger>
                    <TabsTrigger value="page">Pages</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredResults.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-lg overflow-hidden hover-glow border-primary/10"
                >
                  <div className="aspect-video relative">
                    <Image src={result.image || "/placeholder.svg"} alt={result.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="capitalize">{result.type}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{result.title}</h3>
                    <p className="text-muted-foreground mb-4">{result.description}</p>
                    <Button asChild variant="outline" className="hover:bg-primary/10">
                      <Link href={result.url}>
                        View {result.type === "project" ? "Project" : result.type === "service" ? "Service" : "Page"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {searchQuery && searchResults.length === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-bold mb-2">No results found for "{searchQuery}"</h2>
            <p className="text-muted-foreground mb-6">Try different keywords or browse our popular categories below.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" className="hover:bg-primary/10">
                <Link href="/services">
                  Browse Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="hover:bg-primary/10">
                <Link href="/work">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="hover:bg-primary/10">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {!searchQuery && !searchResults.length && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <div className="glass-card p-6 rounded-lg hover-glow border-primary/10">
              <h3 className="text-xl font-bold mb-3 gradient-text">Popular Searches</h3>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-foreground hover:text-primary"
                    onClick={() => {
                      setSearchQuery("virtual reality")
                      handleSearch({ preventDefault: () => {} })
                    }}
                  >
                    Virtual Reality
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-foreground hover:text-primary"
                    onClick={() => {
                      setSearchQuery("animation")
                      handleSearch({ preventDefault: () => {} })
                    }}
                  >
                    Animation
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-foreground hover:text-primary"
                    onClick={() => {
                      setSearchQuery("software development")
                      handleSearch({ preventDefault: () => {} })
                    }}
                  >
                    Software Development
                  </Button>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6 rounded-lg hover-glow border-primary/10">
              <h3 className="text-xl font-bold mb-3 gradient-text">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-foreground hover:text-primary">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-foreground hover:text-primary">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-foreground hover:text-primary">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6 rounded-lg hover-glow border-primary/10">
              <h3 className="text-xl font-bold mb-3 gradient-text">Featured</h3>
              <div className="space-y-4">
                <div className="relative h-32 rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Featured Project"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <p className="text-white font-medium">VR Architectural Visualization</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full hover:bg-primary/10">
                  <Link href="/work">
                    View Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
