"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Maximize2, Download, Share2, Heart, X } from "lucide-react"
import { toast } from "sonner"

type StudioItem = {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  type: "animation" | "3d" | "vr"
  duration: string
  category: string
}

export default function StudioPage() {
  const [items, setItems] = useState<StudioItem[]>([])
  const [selectedItem, setSelectedItem] = useState<StudioItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  // Mock data for demonstration
  useEffect(() => {
    const mockItems: StudioItem[] = [
      {
        id: "1",
        title: "Product Animation",
        description: "3D product showcase animation with dynamic lighting",
        thumbnail: "/studio/thumbnails/product-animation.jpg",
        videoUrl: "/studio/videos/product-animation.mp4",
        type: "animation",
        duration: "0:45",
        category: "commercial"
      },
      {
        id: "2",
        title: "Architectural Walkthrough",
        description: "Immersive 3D architectural visualization",
        thumbnail: "/studio/thumbnails/arch-walkthrough.jpg",
        videoUrl: "/studio/videos/arch-walkthrough.mp4",
        type: "3d",
        duration: "2:15",
        category: "architectural"
      },
      {
        id: "3",
        title: "VR Experience",
        description: "Interactive virtual reality environment",
        thumbnail: "/studio/thumbnails/vr-experience.jpg",
        videoUrl: "/studio/videos/vr-experience.mp4",
        type: "vr",
        duration: "5:00",
        category: "interactive"
      },
      // Add more items as needed
    ]
    setItems(mockItems)
  }, [])

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(items.map(item => item.category)))

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleDownload = async (item: StudioItem) => {
    try {
      const response = await fetch(item.videoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${item.title}.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success("Download started")
    } catch (error) {
      toast.error("Failed to download")
    }
  }

  const handleShare = async (item: StudioItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href
        })
      } catch (error) {
        toast.error("Failed to share")
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Animation Studio</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of 3D animations, architectural visualizations, and interactive VR experiences.
            </p>
          </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="search"
            placeholder="Search animations..."
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-border bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All
                        </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
            ))}
                      </div>
                    </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-primary"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Maximize2 className="h-6 w-6" />
                        </Button>
                  </div>
                  <Badge className="absolute top-2 right-2">
                    {item.duration}
                  </Badge>
                      </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleLike(item.id)}
                      className={likedItems.has(item.id) ? "text-red-500" : ""}
                    >
                      <Heart className="h-5 w-5" fill={likedItems.has(item.id) ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="secondary">{item.type}</Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
              </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={e => e.stopPropagation()}
            >
              <video
                src={selectedItem.videoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                loop
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleDownload(selectedItem)}
                  >
                    <Download className="h-4 w-4" />
                      </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleShare(selectedItem)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
  )
}
