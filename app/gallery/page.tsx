"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Sample gallery data - in a real app, this would come from a database or API
const galleryItems = [
  {
    id: 1,
    title: "VR Development",
    description: "Virtual reality application development",
    image: "/gallary/2.png",
    category: "VR",
    featured: true,
  },
  {
    id: 2,
    title: "3D Modeling",
    description: "3D architectural visualization",
    image: "/images/barcode.png",
    category: "3D",
    featured: false,
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications",
    image: "/gallary/1.png",
    category: "Software",
    featured: true,
  },
  {
    id: 4,
    title: "AI Solutions",
    description: "Artificial intelligence integration",
    image: "/images/lifestyle.jpeg",
    category: "AI",
    featured: false,
  },
  {
    id: 5,
    title: "Team Collaboration",
    description: "Our team working together",
    image: "/placeholder.svg?height=600&width=600",
    category: "Team",
    featured: false,
  },
  {
    id: 6,
    title: "Office Space",
    description: "Our workspace in Monrovia",
    image: "/placeholder.svg?height=600&width=600",
    category: "Office",
    featured: false,
  },
  {
    id: 7,
    title: "Client Meeting",
    description: "Discussing project requirements",
    image: "/placeholder.svg?height=600&width=600",
    category: "Business",
    featured: false,
  },
  {
    id: 8,
    title: "Product Demo",
    description: "Showcasing our latest products",
    image: "/placeholder.svg?height=600&width=600",
    category: "Products",
    featured: true,
  },
  {
    id: 9,
    title: "AR Application",
    description: "Augmented reality experience",
    image: "/placeholder.svg?height=600&width=600",
    category: "VR",
    featured: false,
  },
  {
    id: 10,
    title: "UI Design",
    description: "User interface design process",
    image: "/placeholder.svg?height=600&width=600",
    category: "Software",
    featured: false,
  },
  {
    id: 11,
    title: "Team Building",
    description: "Team building activities",
    image: "/placeholder.svg?height=600&width=600",
    category: "Team",
    featured: false,
  },
  {
    id: 12,
    title: "Tech Workshop",
    description: "Technology workshop with local students",
    image: "/placeholder.svg?height=600&width=600",
    category: "Education",
    featured: true,
  },
]

// Categories for filtering
const categories = ["All", "VR", "3D", "Software", "AI", "Team", "Office", "Business", "Products", "Education"]

export default function GalleryPage() {
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredItems, setFilteredItems] = useState(galleryItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<null | number>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let results = galleryItems

    // Apply category filter
    if (activeCategory !== "All") {
      results = results.filter((item) => item.category === activeCategory)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      )
    }

    setFilteredItems(results)
  }, [activeCategory, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInputRef.current) {
      setSearchQuery(searchInputRef.current.value)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.value = ""
      searchInputRef.current.focus()
    }
  }

  const openLightbox = (id: number) => {
    setSelectedItem(id)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const navigateLightbox = (direction: "next" | "prev") => {
    if (!selectedItem) return

    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredItems.length
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    }

    setSelectedItem(filteredItems[newIndex].id)
  }

  const selectedItemData = selectedItem ? galleryItems.find((item) => item.id === selectedItem) : null

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Gallery</h1>
            <p className="text-lg text-muted-foreground">
              Explore our work, projects, and team through our visual showcase.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <form onSubmit={handleSearch} className="relative w-full md:w-auto md:min-w-[300px]">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search gallery..."
                  className="w-full px-4 py-2 pr-10 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={searchQuery}
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                ) : null}
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </button>
              </form>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-accent transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                {activeCategory !== "All" && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground text-background text-sm">
                    {activeCategory}
                    <button onClick={() => setActiveCategory("All")}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Category Filter */}
            {showFilters && (
              <div className="mt-6 p-4 border rounded-md bg-card animate-fade-in">
                <h3 className="text-sm font-medium mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        activeCategory === category
                          ? "bg-foreground text-background"
                          : "bg-secondary text-foreground hover:bg-accent"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Featured Items */}
          {activeCategory === "All" && !searchQuery && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Featured Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading
                  ? Array.from({ length: 2 }).map((_, index) => (
                      <div key={index} className="aspect-video">
                        <Skeleton className="w-full h-full" />
                      </div>
                    ))
                  : galleryItems
                      .filter((item) => item.featured)
                      .slice(0, 2)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
                          onClick={() => openLightbox(item.id)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-6">
                            <h3 className="text-white text-xl font-bold">{item.title}</h3>
                            <p className="text-white/80">{item.description}</p>
                          </div>
                          <div className="w-full h-full bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover  group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      ))}
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {searchQuery ? `Search Results: ${filteredItems.length}` : "All Projects"}
              </h2>
              {filteredItems.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Showing {filteredItems.length} of {galleryItems.length} items
                </p>
              )}
            </div>

            {filteredItems.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-lg mb-4">No items found matching your criteria.</p>
                <button
                  onClick={() => {
                    setActiveCategory("All")
                    setSearchQuery("")
                    if (searchInputRef.current) {
                      searchInputRef.current.value = ""
                    }
                  }}
                  className="px-4 py-2 rounded-md border hover:bg-accent transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="gallery-item">
                        <Skeleton className="w-full h-full" />
                      </div>
                    ))
                  : filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="gallery-item group cursor-pointer"
                        onClick={() => openLightbox(item.id)}
                      >
                        <div className="relative w-full h-full">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-4">
                            <h3 className="text-white font-bold">{item.title}</h3>
                            <p className="text-white/80 text-sm">{item.description}</p>
                            <div className="mt-2">
                              <span className="inline-block px-2 py-1 text-xs rounded-full bg-white/20 text-white">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-full bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover  group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && selectedItemData && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={() => navigateLightbox("prev")}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={() => navigateLightbox("next")}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          <div className="max-w-4xl w-full">
            <div className="relative aspect-video">
              <Image
                src={selectedItemData.image || "/placeholder.svg"}
                alt={selectedItemData.title}
                fill
                className="object-contain "
              />
            </div>
            <div className="mt-4 text-white">
              <h3 className="text-2xl font-bold">{selectedItemData.title}</h3>
              <p className="text-white/80">{selectedItemData.description}</p>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-white/20">
                  {selectedItemData.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
