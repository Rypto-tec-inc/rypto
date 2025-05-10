"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, Filter, Search, Share, X, Maximize2, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample gallery items
const galleryItems = {
  projects: [
    {
      id: 1,
      title: "VR Experience Design",
      category: "projects",
      tags: ["VR", "Architecture", "3D"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Immersive virtual reality experience for architectural visualization.",
      date: "2023-05-15",
    },
    {
      id: 2,
      title: "Mobile App Interface",
      category: "projects",
      tags: ["UI/UX", "Mobile", "App"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "User-friendly mobile application interface for a fintech startup.",
      date: "2023-06-22",
    },
    {
      id: 3,
      title: "3D Animation Project",
      category: "projects",
      tags: ["3D", "Animation", "Character"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Character animation for an upcoming indie game.",
      date: "2023-07-10",
    },
    {
      id: 10,
      title: "E-Commerce Website",
      category: "projects",
      tags: ["Web", "E-Commerce", "UI/UX"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Modern e-commerce platform with advanced filtering and search capabilities.",
      date: "2023-08-05",
    },
  ],
  designs: [
    {
      id: 4,
      title: "Brand Identity System",
      category: "designs",
      tags: ["Branding", "Logo", "Identity"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Complete brand identity system for a tech company.",
      date: "2023-04-18",
    },
    {
      id: 5,
      title: "UI Component Library",
      category: "designs",
      tags: ["UI", "Components", "Design System"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Comprehensive UI component library for web applications.",
      date: "2023-05-30",
    },
    {
      id: 6,
      title: "Website Redesign",
      category: "designs",
      tags: ["Web", "UI/UX", "Redesign"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Complete redesign of an e-commerce platform.",
      date: "2023-06-15",
    },
    {
      id: 11,
      title: "Mobile App Design System",
      category: "designs",
      tags: ["Mobile", "Design System", "UI"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Comprehensive design system for cross-platform mobile applications.",
      date: "2023-07-22",
    },
  ],
  videos: [
    {
      id: 7,
      title: "Product Demo",
      category: "videos",
      tags: ["Demo", "Product", "Marketing"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Demonstration of our latest software product.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2023-03-12",
    },
    {
      id: 8,
      title: "Animation Showreel",
      category: "videos",
      tags: ["Animation", "Showreel", "3D"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Showcase of our animation capabilities.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2023-04-05",
    },
    {
      id: 9,
      title: "Client Testimonial",
      category: "videos",
      tags: ["Testimonial", "Client", "Marketing"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Feedback from one of our satisfied clients.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2023-05-20",
    },
    {
      id: 12,
      title: "VR Experience Walkthrough",
      category: "videos",
      tags: ["VR", "Walkthrough", "Demo"],
      thumbnail: "/placeholder.svg?height=400&width=600",
      description: "Guided tour of our latest virtual reality experience.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2023-08-15",
    },
  ],
}

// Extract all unique tags
const allTags = Array.from(
  new Set(
    Object.values(galleryItems)
      .flat()
      .flatMap((item: any) => item.tags),
  ),
).sort()

export default function GalleryPage() {
  const { toast } = useToast()
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState("projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"date" | "title">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)

  // Filter and sort gallery items
  const filteredItems = Object.entries(galleryItems).reduce((acc: any, [category, items]) => {
    const filtered = (items as any[])
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))

        return matchesSearch && matchesTags
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return sortOrder === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        } else {
          return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        }
      })

    acc[category] = filtered
    return acc
  }, {})

  const openLightbox = (item: any) => {
    setSelectedItem(item)
    setZoomLevel(1)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedItem(null)
    setZoomLevel(1)
    setIsFullscreen(false)
    document.body.style.overflow = "auto"
  }

  const navigateGallery = (direction: "next" | "prev") => {
    if (!selectedItem) return

    const currentItems = galleryItems[selectedItem.category as keyof typeof galleryItems]
    const currentIndex = currentItems.findIndex((item) => item.id === selectedItem.id)

    let newIndex
    if (direction === "next") {
      newIndex = (currentIndex + 1) % currentItems.length
    } else {
      newIndex = (currentIndex - 1 + currentItems.length) % currentItems.length
    }

    setSelectedItem(currentItems[newIndex])
    setZoomLevel(1)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleShare = () => {
    if (selectedItem) {
      navigator.clipboard.writeText(`Check out this amazing ${selectedItem.title} at RYPTO TEC INC!`)
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard.",
      })
    }
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Downloading ${selectedItem.title}...`,
    })
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      lightboxRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return

      switch (e.key) {
        case "ArrowRight":
          navigateGallery("next")
          break
        case "ArrowLeft":
          navigateGallery("prev")
          break
        case "Escape":
          closeLightbox()
          break
        case "f":
          toggleFullscreen()
          break
        case "+":
          setZoomLevel((prev) => Math.min(prev + 0.25, 3))
          break
        case "-":
          setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem])

  return (
    <div className="container py-12 md:py-24" ref={galleryRef}>
      <div className="mx-auto max-w-6xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" title="Browse our work">
            Gallery
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            Explore our portfolio of projects, designs, and video showcases
          </p>
        </motion.div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search gallery..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy("date")}
                  className={sortBy === "date" ? "bg-primary text-primary-foreground" : ""}
                >
                  Date
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy("title")}
                  className={sortBy === "title" ? "bg-primary text-primary-foreground" : ""}
                >
                  Title
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "asc" ? "↑" : "↓"}
                </Button>
              </div>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-muted/50 p-4 rounded-lg"
            >
              <h3 className="font-medium mb-2">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])} className="mt-2">
                  Clear Filters
                </Button>
              )}
            </motion.div>
          )}
        </div>

        <Tabs defaultValue="projects" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="projects" title="View our projects">
                Projects ({filteredItems.projects?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="designs" title="View our designs">
                Designs ({filteredItems.designs?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="videos" title="View our videos">
                Videos ({filteredItems.videos?.length || 0})
              </TabsTrigger>
            </TabsList>
          </div>

          {(Object.keys(galleryItems) as Array<keyof typeof galleryItems>).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              {filteredItems[category]?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No items found matching your search criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedTags([])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems[category]?.map((item: any) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -5 }}
                      className="cursor-pointer"
                      onClick={() => openLightbox(item)}
                    >
                      <Card className="overflow-hidden">
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            title={item.title}
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold" title={item.title}>
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
            ref={lightboxRef}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-auto bg-card rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between bg-card p-4 border-b">
                <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={handleShare} title="Share">
                    <Share className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleDownload} title="Download">
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleFullscreen} title="Toggle fullscreen">
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={closeLightbox} title="Close">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                {selectedItem.category === "videos" ? (
                  <div className="aspect-video relative">
                    <iframe
                      src={selectedItem.videoUrl}
                      title={selectedItem.title}
                      className="absolute inset-0 h-full w-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="relative overflow-hidden flex justify-center">
                    <div
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transition: "transform 0.3s ease",
                      }}
                      className="origin-center"
                    >
                      <Image
                        src={selectedItem.thumbnail || "/placeholder.svg"}
                        alt={selectedItem.title}
                        width={800}
                        height={600}
                        className="object-contain max-h-[60vh]"
                      />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-background/80 backdrop-blur-sm rounded-full p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setZoomLevel(Math.max(zoomLevel - 0.25, 0.5))}
                        title="Zoom out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Slider
                        value={[zoomLevel * 100]}
                        min={50}
                        max={300}
                        step={25}
                        className="w-32 mx-2"
                        onValueChange={(value) => setZoomLevel(value[0] / 100)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setZoomLevel(Math.min(zoomLevel + 0.25, 3))}
                        title="Zoom in"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedItem.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-muted-foreground">{selectedItem.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Date: {new Date(selectedItem.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateGallery("prev")
                  }}
                  title="Previous item"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateGallery("next")
                  }}
                  title="Next item"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
