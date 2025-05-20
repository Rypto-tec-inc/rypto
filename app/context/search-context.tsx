"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

export type SearchResult = {
  id: string
  title: string
  description: string
  type: 'project' | 'team' | 'gallery' | 'service' | 'page' | 'about'
  image?: string
  url: string
  category?: string
  relevance: number
  matches: { field: string; text: string; score: number }[]
  creator?: {
    name: string
    role: string
    image: string
    profileUrl: string
  }
}

type SearchContextType = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: SearchResult[]
  isSearching: boolean
  recentSearches: string[]
  handleSearch: (query: string) => void
  clearSearch: () => void
  saveSearch: (query: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Helper function to normalize text for better matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')        // Normalize spaces
    .trim()
}

// Helper function to extract frame numbers
function extractFrameNumber(text: string): string[] {
  const frameMatches = text.match(/frame\s*(\d+)/gi) || []
  return frameMatches.map(match => match.replace(/\s+/g, ''))
}

// Helper function to calculate string similarity
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1)
  const s2 = normalizeText(str2)
  
  // Exact match
  if (s1 === s2) return 1
  
  // Frame number match
  const frames1 = extractFrameNumber(str1)
  const frames2 = extractFrameNumber(str2)
  if (frames1.length > 0 && frames2.length > 0) {
    if (frames1.some(f1 => frames2.includes(f1))) return 0.9
  }
  
  // Contains match
  if (s1.includes(s2) || s2.includes(s1)) return 0.8
  
  // Word match
  const words1 = s1.split(/\s+/)
  const words2 = s2.split(/\s+/)
  const commonWords = words1.filter(word => words2.includes(word))
  if (commonWords.length > 0) {
    return 0.6 * (commonWords.length / Math.max(words1.length, words2.length))
  }
  
  // Character match
  let matches = 0
  const minLength = Math.min(s1.length, s2.length)
  for (let i = 0; i < minLength; i++) {
    if (s1[i] === s2[i]) matches++
  }
  return 0.4 * (matches / Math.max(s1.length, s2.length))
}

// Helper function to find matches in text
function findMatches(text: string, query: string): { text: string; score: number }[] {
  const matches: { text: string; score: number }[] = []
  const words = text.split(/\s+/)
  const queryWords = normalizeText(query).split(/\s+/)
  
  // Check for frame number matches first
  const frameMatches = extractFrameNumber(query)
  if (frameMatches.length > 0) {
    const textFrames = extractFrameNumber(text)
    frameMatches.forEach(frame => {
      if (textFrames.includes(frame)) {
        const context = words.slice(Math.max(0, words.indexOf(frame) - 2), Math.min(words.length, words.indexOf(frame) + 3)).join(' ')
        matches.push({ text: context, score: 0.9 })
      }
    })
  }
  
  // Regular word matches
  words.forEach((word, index) => {
    queryWords.forEach(queryWord => {
      const similarity = calculateSimilarity(word, queryWord)
      if (similarity > 0.3) {
        const context = words.slice(Math.max(0, index - 2), Math.min(words.length, index + 3)).join(' ')
        matches.push({ text: context, score: similarity })
      }
    })
  })
  
  return matches
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Save recent searches to localStorage
  const saveSearch = (query: string) => {
    if (!query.trim()) return

    const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    saveSearch(query)
    setSearchQuery(query)

    try {
      // Use the unified search endpoint
      const response = await fetch('/api/search/all?q=' + encodeURIComponent(query))
      const results = await response.json()

      // Process results with relevance scoring
      const processedResults = results.map((item: any) => {
        const matches: { field: string; text: string; score: number }[] = []
        let relevance = 0

        // Search in title
        const titleMatches = findMatches(item.title || item.name, query)
        if (titleMatches.length > 0) {
          matches.push(...titleMatches.map(m => ({ field: 'title', ...m })))
          relevance += 0.4
        }

        // Search in description/content
        const contentMatches = findMatches(item.description || item.content || item.bio, query)
        if (contentMatches.length > 0) {
          matches.push(...contentMatches.map(m => ({ field: 'description', ...m })))
          relevance += 0.3
        }

        // Search in image name/path
        if (item.image) {
          const imageMatches = findMatches(item.image, query)
          if (imageMatches.length > 0) {
            matches.push(...imageMatches.map(m => ({ field: 'image', ...m })))
            relevance += 0.35
          }
        }

        // Search in categories/skills
        const categories = item.categories || item.skills || []
        const categoryMatches = categories.filter((cat: string) => 
          calculateSimilarity(cat, query) > 0.3
        )
        if (categoryMatches.length > 0) {
          matches.push(...categoryMatches.map((cat: string) => ({
            field: 'category',
            text: cat,
            score: calculateSimilarity(cat, query)
          })))
          relevance += 0.2
        }

        // Search in creator/team info
        if (item.creator || (item.type === 'team' && item.name)) {
          const creatorName = item.creator?.name || item.name
          const creatorRole = item.creator?.role || item.role
          const nameMatch = calculateSimilarity(creatorName, query)
          const roleMatch = calculateSimilarity(creatorRole, query)
          
          if (nameMatch > 0.3) {
            matches.push({ field: 'creator', text: creatorName, score: nameMatch })
            relevance += 0.1
          }
          if (roleMatch > 0.3) {
            matches.push({ field: 'role', text: creatorRole, score: roleMatch })
            relevance += 0.1
          }
        }

        return {
          id: item.id,
          title: item.title || item.name,
          description: item.description || item.content || item.bio,
          type: item.type,
          image: item.image,
          url: item.url,
          category: item.category,
          relevance,
          matches,
          creator: item.creator || (item.type === 'team' ? {
            name: item.name,
            role: item.role,
            image: item.image,
            profileUrl: `/team#${item.id}`
          } : undefined)
        }
      })

      // Sort by relevance
      const sortedResults = processedResults
        .filter((result: SearchResult) => result.relevance > 0)
        .sort((a: SearchResult, b: SearchResult) => b.relevance - a.relevance)

      setSearchResults(sortedResults)
      router.push(`/search?q=${encodeURIComponent(query)}`)
    } catch (error) {
      console.error('Error searching:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        recentSearches,
        handleSearch,
        clearSearch,
        saveSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 