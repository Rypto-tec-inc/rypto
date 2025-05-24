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
import { GallerySection } from '@/components/gallery-section'
import { LoadingSpinner } from '@/components/loading-spinner'

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

interface GalleryData {
  orange_gsm: string
  zig: string
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
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) {
          throw new Error('Failed to fetch gallery data')
        }
        const data = await response.json()
        setGalleryData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    fetchGalleryData()
  }, [])

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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!galleryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No gallery data available</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GallerySection
          title="Orange GSM"
          images={[
            { src: `${galleryData.orange_gsm}/image1.jpg`, alt: 'Orange GSM 1' },
            { src: `${galleryData.orange_gsm}/image2.jpg`, alt: 'Orange GSM 2' },
            // Add more images as needed
          ]}
        />
        <GallerySection
          title="ZIG"
          images={[
            { src: `${galleryData.zig}/image1.jpg`, alt: 'ZIG 1' },
            { src: `${galleryData.zig}/image2.jpg`, alt: 'ZIG 2' },
            // Add more images as needed
          ]}
        />
      </div>
    </motion.div>
  )
}
