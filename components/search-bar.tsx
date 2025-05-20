"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/app/context/search-context"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function SearchBar({ placeholder = "Search...", className = "" }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { searchQuery, setSearchQuery, handleSearch, clearSearch, searchResults, isSearching } = useSearch()
  const searchRef = useRef<HTMLDivElement>(null)

  const toggleSearch = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus()
      }, 100)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
    }
  }

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isExpanded])

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {isExpanded ? (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="container max-w-4xl mx-auto pt-20 px-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholder}
                    className="h-12 text-lg pl-10 pr-8 glass-card border-primary/20 focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <Button type="submit" className="h-12 px-6 hover-glow">
                  Search
                </Button>
                <Button type="button" variant="ghost" size="icon" onClick={toggleSearch} className="h-12 w-12">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </form>

            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 glass-card rounded-lg overflow-hidden"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y divide-border">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={result.url}
                          className="block p-4 hover:bg-muted/50 transition-colors"
                          onClick={() => setIsExpanded(false)}
                        >
                          <div className="flex items-start gap-4">
                            {result.image && (
                              <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                                <Image
                                  src={result.image}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium truncate">{result.title}</h3>
                                <Badge variant="secondary" className="capitalize">
                                  {result.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {result.description}
                              </p>
                              {result.creator && (
                                <div className="flex items-center gap-2 mt-2">
                                  <Image
                                    src={result.creator.image}
                                    alt={result.creator.name}
                                    width={16}
                                    height={16}
                                    className="rounded-full"
                                  />
                                  <span className="text-xs text-muted-foreground">
                                    {result.creator.name} • {result.creator.role}
                                  </span>
                                </div>
                              )}
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <Button variant="ghost" size="sm" onClick={toggleSearch} className="px-2">
          <Search className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
