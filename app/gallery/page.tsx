"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Download, Info, Play, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Barcode from "@/components/barcode"

export default function GalleryPage() {
  const { toast } = useToast()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Gallery items data
  const galleryItems = [
    {
      id: "G001",
      title: "Software Architecture Visualization",
      description: "A 3D visualization of our microservices architecture",
      image: "/placeholder.svg?height=800&width=1200",
      category: "software",
      type: "image",
      year: 2023,
      tags: ["architecture", "3d", "visualization"],
    },
    {
      id: "G002",
      title: "Character Animation Reel",
      description: "Showcase of our latest character animations",
      image: "/placeholder.svg?height=800&width=1200",
      category: "animation",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      year: 2023,
      tags: ["animation", "characters", "reel"],
    },
    {
      id: "G003",
      title: "VR Environment Concept",
      description: "Immersive virtual reality environment for architectural visualization",
      image: "/placeholder.svg?height=800&width=1200",
      category: "vr",
      type: "image",
      year: 2023,
      tags: ["vr", "architecture", "concept"],
    },
    {
      id: "G004",
      title: "UI/UX Design System",
      description: "Our comprehensive design system for web and mobile applications",
      image: "/placeholder.svg?height=800&width=1200",
      category: "design",
      type: "image",
      year: 2023,
      tags: ["ui", "ux", "design-system"],
    },
    {
      id: "G005",
      title: "Product Showcase",
      description: "3D renders of our latest product designs",
      image: "/placeholder.svg?height=800&width=1200",
      category: "product",
      type: "image",
      year: 2023,
      tags: ["product", "3d", "render"],
    },
    {
      id: "G006",
      title: "Mobile App Prototype",
      description: "Interactive prototype of our mobile application",
      image: "/placeholder.svg?height=800&width=1200",
      category: "software",
      type: "image",
      year: 2023,
      tags: ["mobile", "app", "prototype"],
    },
    {
      id: "G007",
      title: "Zig Clothes Brand 3D Design",
      description: "A 3D design of our latest product designs ",
      image: "/gallary/zig_hoodie_design.png",
      category: "design",
      type: "image",
      year: 2022,
      tags: ["brand", "3d", "design"],
    },
    {
      id: "G008",
      title: "Architectural Visualization",
      description: "Photorealistic renders of architectural projects",
      image: "/placeholder.svg?height=800&width=1200",
      category: "vr",
      type: "image",
      year: 2022,
      tags: ["architecture", "render", "visualization"],
    },
    {
      id: "G009",
      title: "Product Demo Video",
      description: "Demonstration of our latest software product",
      image: "/placeholder.svg?height=800&width=1200",
      category: "software",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      year: 2022,
      tags: ["product", "demo", "video"],
    },
  ]

  // Filter gallery items based on active filters and search query
  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter !== "all" && item.type !== activeFilter) return false
    if (activeCategory !== "all" && item.category !== activeCategory) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }
    return true
  })

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "software", name: "Software" },
    { id: "animation", name: "Animation" },
    { id: "vr", name: "VR/AR" },
    { id: "design", name: "Design" },
    { id: "product", name: "Product" },
  ]

  // Open lightbox with selected image
  const openLightbox = (item) => {
    setCurrentImage(item)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  // Navigate to next/previous image in lightbox
  const navigateLightbox = (direction) => {
    const currentIndex = filteredItems.findIndex((item) => item.id === currentImage.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredItems.length
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    }

    setCurrentImage(filteredItems[newIndex])
  }

  return (
    <>
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-4">
              <div className="text-8xl font-bold tracking-tighter">01</div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Gallery</h1>
                <p className="mt-2 text-xl text-muted-foreground">
                  Explore our portfolio of work across various disciplines
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="w-full">
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
                <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
                  <TabsList className="bg-muted/30 p-1 h-auto">
                    <TabsTrigger value="grid" className="px-3 py-1.5 h-auto">
                      Grid View
                    </TabsTrigger>
                    <TabsTrigger value="list" className="px-3 py-1.5 h-auto">
                      List View
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search gallery..."
                    className="pl-9 rounded-none border-border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <select
                  className="bg-background border border-border rounded-none px-3 py-1.5 text-sm"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  className="bg-background border border-border rounded-none px-3 py-1.5 text-sm"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                </select>
              </div>

              <Tabs value={viewMode} className="w-full">
                <TabsContent value="grid" className="m-0">
                  <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
                        className="group cursor-pointer"
                        onClick={() => openLightbox(item)}
                      >
                        <Card className="overflow-hidden rounded-none border-border h-full bg-background/50 hover:bg-background transition-colors duration-300">
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {item.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-full bg-background/80 p-3">
                                  <Play className="h-6 w-6" />
                                </div>
                              </div>
                            )}
                            <div className="absolute top-2 right-2">
                              <Badge variant="outline" className="bg-background/80">
                                {item.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{item.title}</h3>
                              <Barcode value={item.id} width={40} height={15} />
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="m-0">
                  <div className="space-y-6">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.05 * (index % 10) }}
                        className="group cursor-pointer"
                        onClick={() => openLightbox(item)}
                      >
                        <Card className="overflow-hidden rounded-none border-border bg-background/50 hover:bg-background transition-colors duration-300">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {item.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="rounded-full bg-background/80 p-3">
                                    <Play className="h-6 w-6" />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="p-4 md:w-2/3 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-medium text-lg">{item.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="outline">{item.category}</Badge>
                                      <Badge variant="outline">{item.year}</Badge>
                                    </div>
                                  </div>
                                  <Barcode value={item.id} width={60} height={20} />
                                </div>
                                <p className="text-muted-foreground mt-4">{item.description}</p>
                                <div className="flex flex-wrap gap-1 mt-4">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-muted/50">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Button variant="outline" size="sm" className="text-xs">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] bg-background/95 flex items-center justify-center p-4"
          >
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => toast({ title: "Download started" })}>
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toast({ title: "Info", description: currentImage.description })}
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={closeLightbox}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Button variant="outline" size="icon" onClick={() => navigateLightbox("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Button variant="outline" size="icon" onClick={() => navigateLightbox("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-w-5xl w-full">
              {currentImage.type === "image" ? (
                <div className="relative aspect-video">
                  <Image
                    src={currentImage.image || "/placeholder.svg"}
                    alt={currentImage.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={currentImage.videoUrl}
                    title={currentImage.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="mt-4 bg-background p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium">{currentImage.title}</h2>
                    <p className="text-muted-foreground mt-2">{currentImage.description}</p>
                  </div>
                  <Barcode value={currentImage.id} width={80} height={30} />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">{currentImage.category}</Badge>
                  <Badge variant="outline">{currentImage.year}</Badge>
                  {currentImage.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
