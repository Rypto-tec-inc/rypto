'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { X, Filter, Folder, Tag, Type } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  image: string
  type: 'gallery' | 'team' | 'content' | 'service' | 'about' | 'project'
  tags?: string[]
  category?: string
  date?: string
  priority?: number
  score: number
}

export function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      // Esc to close search
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
      // Arrow keys to navigate results
      if (isSearchOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1))
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
        }
        // Enter to select
        if (e.key === 'Enter' && searchResults[selectedIndex]) {
          e.preventDefault()
          window.location.href = searchResults[selectedIndex].url
        }
        // Tab to cycle through filters
        if (e.key === 'Tab') {
          e.preventDefault()
          const filters = ['type', 'category', 'tag']
          const currentFilter = selectedType ? 'type' : selectedCategory ? 'category' : selectedTag ? 'tag' : 'type'
          const currentIndex = filters.indexOf(currentFilter)
          const nextIndex = (currentIndex + 1) % filters.length
          const nextFilter = filters[nextIndex]
          
          // Clear current filter
          setSelectedType(null)
          setSelectedCategory(null)
          setSelectedTag(null)
          
          // Set next filter
          if (nextFilter === 'type') setSelectedType('gallery')
          if (nextFilter === 'category') setSelectedCategory('development')
          if (nextFilter === 'tag') setSelectedTag('featured')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, searchResults, selectedIndex])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  // Search function with filters
  const handleSearch = async (query: string) => {
    setIsSearching(true)
    try {
      const params = new URLSearchParams({
        q: query,
        ...(selectedType && { type: selectedType }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedTag && { tag: selectedTag })
      })
      
      const response = await fetch(`/api/search/all?${params}`)
      const data = await response.json()
      setSearchResults(data)
      setSelectedIndex(0) // Reset selection when new results arrive
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedType, selectedCategory, selectedTag])

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        >
          <div className="container flex items-center justify-center min-h-screen p-4">
            <div ref={searchRef} className="w-full max-w-2xl">
              <Command className="rounded-lg border shadow-lg">
                <div className="flex items-center gap-2 p-2 border-b">
                  <CommandInput
                    placeholder="Search gallery, team, or content... (Ctrl+K)"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Search filters */}
                <div className="flex gap-2 p-2 border-b">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={selectedType || ''}
                      onChange={(e) => setSelectedType(e.target.value || null)}
                      className="text-sm bg-transparent border rounded px-2 py-1"
                    >
                      <option value="">All Types</option>
                      <option value="gallery">Gallery</option>
                      <option value="team">Team</option>
                      <option value="project">Projects</option>
                      <option value="service">Services</option>
                      <option value="about">About</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                      className="text-sm bg-transparent border rounded px-2 py-1"
                    >
                      <option value="">All Categories</option>
                      <option value="development">Development</option>
                      <option value="creative">Creative</option>
                      <option value="3d animation">3D Animation</option>
                      <option value="vr/ar">VR/AR</option>
                    </select>
                  </div>

                  {selectedTag && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => setSelectedTag(null)}
                      >
                        {selectedTag} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Search results */}
                <CommandList>
                  <CommandEmpty>
                    {isSearching ? (
                      <div className="p-4 text-center text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Searching...
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No results found
                      </div>
                    )}
                  </CommandEmpty>
                  
                  <CommandGroup>
                    {searchResults.map((result, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          window.location.href = result.url
                        }}
                        className={`flex items-center gap-3 p-2 ${
                          index === selectedIndex ? 'bg-accent' : ''
                        }`}
                      >
                        {result.image && (
                          <div className="relative w-10 h-10 rounded-md overflow-hidden">
                            <Image
                              src={result.image}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.title}</span>
                            <Badge variant="secondary" className="text-xs">
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                          {result.tags && (
                            <div className="flex gap-1 mt-1">
                              {result.tags.map((tag, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs cursor-pointer hover:bg-primary/10"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedTag(tag)
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>

                {/* Keyboard shortcuts help */}
                <div className="p-2 border-t text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span>↑↓ to navigate</span>
                      <span>Enter to select</span>
                      <span>Tab to cycle filters</span>
                    </div>
                    <span>Esc to close</span>
                  </div>
                </div>
              </Command>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 