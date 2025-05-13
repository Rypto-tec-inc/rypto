"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar({ placeholder = "Search...", className = "" }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const toggleSearch = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      // Focus the input when expanded
      setTimeout(() => {
        document.getElementById("search-input")?.focus()
      }, 100)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    document.getElementById("search-input")?.focus()
  }

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isExpanded])

  return (
    <div className={`relative ${className}`}>
      {isExpanded ? (
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative w-full">
            <Input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="pr-8"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" size="sm" variant="ghost" className="ml-1">
            <Search className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={toggleSearch}>
            <X className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <Button variant="ghost" size="sm" onClick={toggleSearch} className="px-2">
          <Search className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
