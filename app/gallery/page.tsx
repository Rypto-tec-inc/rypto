"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, Share2, Download, Heart, MessageCircle, Facebook, Twitter, Linkedin, Link2, Grid, List, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getDominantColor, adjustColorForBackground } from "@/lib/color-utils"
import Link from "next/link"

type GalleryItem = {
  id: string
  title: string
  description: string
  image: string
  type: 'image' | 'video'
  videoUrl?: string
  category: string
  creator: {
    name: string
    role: string
    image: string
    profileUrl: string
  }
}

type GallerySection = {
  name: string
  path: string
  items: GalleryItem[]
}

export default function GalleryPage() {
  const { toast } = useToast()
  const [sections, setSections] = useState<GallerySection[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState("all")
  const [likedItems, setLikedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [backgroundColor, setBackgroundColor] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load gallery sections
  useEffect(() => {
    const loadGallerySections = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) throw new Error('Failed to load gallery')
        const data = await response.json()
        // Add creator information to each item
        const sectionsWithCreators = data.sections.map((section: GallerySection) => ({
          ...section,
          items: section.items.map((item: GalleryItem) => ({
            ...item,
            creator: {
              name: "Victor Edet Coleman",
              role: "Lead Developer & 3D Artist",
              image: "/Team/victor.jpg",
              profileUrl: "/team"
            }
          }))
        }))
        setSections(sectionsWithCreators || [])
      } catch (error) {
        console.error('Error loading gallery:', error)
        toast({
          title: "Error",
          description: "Failed to load gallery items",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    loadGallerySections()
  }, [toast])

  // Get all items from all sections
  const allItems = sections.flatMap(section => section.items)

  // Filter items based on search and section
  const filteredItems = allItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSection = selectedSection === "all" || 
      item.category.toLowerCase().includes(selectedSection.toLowerCase())

    return matchesSearch && matchesSection
  })

  // Get unique sections
  const sectionOptions = ["all", ...sections.map(section => section.path)]

  // Handle like
  const toggleLike = (itemId: string) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  // Handle share
  const handleShare = async (item: GalleryItem, platform?: string) => {
    const url = window.location.origin + item.image
    const title = item.title
    const text = item.description

    try {
      if (platform) {
        // Platform-specific sharing
        switch (platform) {
          case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
            break
          case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
            break
          case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
            break
          case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank')
            break
        }
      } else {
        // Native share if available
        if (navigator.share) {
          await navigator.share({
            title,
            text,
            url
          })
        } else {
          // Fallback to copying link
          await navigator.clipboard.writeText(url)
          toast({
            title: "Link copied!",
            description: "The image link has been copied to your clipboard.",
          })
        }
      }
    } catch (error) {
      console.error('Error sharing:', error)
      toast({
        title: "Error",
        description: "Failed to share item",
        variant: "destructive"
      })
    }
  }

  // Handle download
  const handleDownload = async (item: GalleryItem) => {
    try {
      const response = await fetch(item.image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = item.title
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast({
        title: "Download started",
        description: "Your file is being downloaded.",
      })
    } catch (error) {
      console.error('Error downloading:', error)
      toast({
        title: "Error",
        description: "Failed to download item",
        variant: "destructive"
      })
    }
  }

  // Get current items for pagination
  const getCurrentItems = (items: GalleryItem[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCardClick = async (e: React.MouseEvent, item: GalleryItem) => {
    // Prevent if clicking on any interactive element
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="menuitem"]') ||
      target.closest('[role="dialog"]') ||
      target.closest('.dropdown-menu') ||
      target.closest('.dropdown-content')
    ) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      // Only get dominant color for images
      if (item.type === 'image') {
        const dominantColor = await getDominantColor(item.image);
        const adjustedColor = adjustColorForBackground(dominantColor);
        setBackgroundColor(adjustedColor);
    } else {
        setBackgroundColor(''); // Reset background for videos
      }
      setSelectedItem(item);
    } catch (error) {
      console.error("Error getting dominant color:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedItem(null)
    setBackgroundColor("")
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Background color transition */}
          <motion.div
        className="fixed inset-0 transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: backgroundColor || "transparent" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: backgroundColor ? 0.1 : 0 }}
      />

      <div className="container py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Gallery</h1>
            <p className="text-muted-foreground">
              Explore our collection of images and videos
                </p>
              </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Input
                    placeholder="Search gallery..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
                  />
                <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="bg-background border border-input rounded-md px-3 py-2"
              >
                {sectionOptions.map(section => (
                  <option key={section} value={section}>
                    {section === "all" ? "All Sections" : section.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
              </div>

          {/* Gallery Sections */}
          {sections.map(section => (
            <div key={section.path} className="space-y-6">
              <h2 className="text-2xl font-semibold">{section.name}</h2>
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              }>
                {getCurrentItems(section.items).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={viewMode === 'list' ? "flex gap-4" : ""}
                  >
                    <Card 
                      className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
                        viewMode === 'list' ? "flex-1 flex" : ""
                      }`}
                      onClick={(e) => handleCardClick(e, item)}
                    >
                      <div className={`relative bg-muted ${
                        viewMode === 'list' ? "w-48" : "aspect-[4/3]"
                      }`}>
                        {item.type === "video" ? (
                          <>
                            <video
                              src={item.videoUrl}
                              className="w-full h-full object-cover"
                              preload="metadata"
                            />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-full bg-background/80 p-3">
                                  <Play className="h-6 w-6" />
                                </div>
                              </div>
                          </>
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                        )}
                        {/* RYPT Logo Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <Image
                            src="/gallary/logos/RYPTO_LOGO2-removebg-preview.png"
                            alt="RYPT"
                            width={120}
                            height={120}
                            className="opacity-20"
                            unoptimized
                          />
                            </div>
                        {/* Category-specific Logo */}
                        {item.category.toLowerCase().includes('orange') && (
                          <div className="absolute bottom-2 left-2 pointer-events-none">
                            <Image
                              src="/gallary/logos/orange.png"
                              alt="Orange"
                              width={40}
                              height={40}
                              className="opacity-80"
                              unoptimized
                            />
                          </div>
                        )}
                        {item.category.toLowerCase().includes('zig') && (
                          <div className="absolute bottom-2 left-2 pointer-events-none">
                            <Image
                              src="/gallary/logos/zig.png"
                              alt="Zig"
                              width={40}
                              height={40}
                              className="opacity-80"
                              unoptimized
                            />
                          </div>
                        )}
                        <Badge 
                          variant="secondary" 
                          className="absolute top-2 right-2 bg-background/80 pointer-events-none"
                        >
                          {item.category}
                        </Badge>
                                  </div>

                      <div className={`p-4 space-y-3 ${viewMode === 'list' ? "flex-1" : ""}`}>
                              <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.description}
                          </p>
                                    </div>
                        {/* Creator Info */}
                        {item.creator && (
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Link href={item.creator.profileUrl} className="group">
                              <div className="flex items-center gap-2">
                                <Image
                                  src={item.creator.image}
                                  alt={item.creator.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full ring-2 ring-offset-2 ring-transparent group-hover:ring-primary transition-all"
                                />
                                <div className="flex flex-col text-sm">
                                  <span className="font-medium group-hover:text-primary transition-colors">
                                    {item.creator.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {item.creator.role}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleLike(item.id);
                              }}
                            >
                              <Heart 
                                className={`h-4 w-4 ${likedItems.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`}
                              />
                                </Button>
                            <span className="text-sm text-muted-foreground">
                              {likedItems.includes(item.id) ? 'Liked' : 'Like'}
                            </span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                              align="end" 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleShare(item);
                                }}
                              >
                                <Link2 className="h-4 w-4 mr-2" />
                                Copy Link
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleShare(item, 'facebook');
                                }}
                              >
                                <Facebook className="h-4 w-4 mr-2" />
                                Facebook
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleShare(item, 'twitter');
                                }}
                              >
                                <Twitter className="h-4 w-4 mr-2" />
                                Twitter
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleShare(item, 'linkedin');
                                }}
                              >
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleShare(item, 'whatsapp');
                                }}
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                WhatsApp
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Lightbox */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
                onClick={handleClose}
              >
                <div 
                  className="max-w-4xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative aspect-video bg-muted">
                    {selectedItem.type === "video" ? (
                      <video
                        src={selectedItem.videoUrl}
                        className="w-full h-full"
                        controls
                        autoPlay
                        playsInline
                      />
                    ) : (
                  <Image
                        src={selectedItem.image}
                        alt={selectedItem.title}
                    fill
                    className="object-contain"
                        unoptimized
                      />
                    )}
                    {/* RYPT Logo Watermark in Lightbox */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Image
                        src="/gallary/logos/RYPTO_LOGO2-removebg-preview.png"
                        alt="RYPT"
                        width={200}
                        height={200}
                        className="opacity-10"
                        unoptimized
                      />
                    </div>
                    {/* Category-specific Logo in Lightbox */}
                    {selectedItem.category.toLowerCase().includes('orange') && (
                      <div className="absolute bottom-4 left-4 pointer-events-none">
                        <Image
                          src="/gallary/logos/orange.png"
                          alt="Orange"
                          width={60}
                          height={60}
                          className="opacity-90"
                          unoptimized
                  />
                </div>
                    )}
                    {selectedItem.category.toLowerCase().includes('zig') && (
                      <div className="absolute bottom-4 left-4 pointer-events-none">
                        <Image
                          src="/gallary/logos/zig.png"
                          alt="Zig"
                          width={60}
                          height={60}
                          className="opacity-90"
                          unoptimized
                        />
                </div>
              )}
                  </div>
              <div className="mt-4 bg-background p-4">
                <div className="flex justify-between items-start">
                  <div>
                        <h2 className="text-xl font-medium">{selectedItem.title}</h2>
                        <p className="text-muted-foreground mt-2">
                          {selectedItem.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(selectedItem)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleShare(selectedItem)}>
                              <Link2 className="h-4 w-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(selectedItem, 'facebook')}>
                              <Facebook className="h-4 w-4 mr-2" />
                              Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(selectedItem, 'twitter')}>
                              <Twitter className="h-4 w-4 mr-2" />
                              Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(selectedItem, 'linkedin')}>
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(selectedItem, 'whatsapp')}>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              WhatsApp
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleClose}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                  </div>
                </div>
                    <Badge variant="secondary" className="mt-4">
                      {selectedItem.category}
                    </Badge>
                  </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
