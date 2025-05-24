"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, X, Search, Code2, Users, Image as ImageIcon, Info, Wrench, Building2, Lightbulb, Target, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/app/context/search-context"
import { useSearchParams, useRouter } from "next/navigation"

function HighlightedText({ text, matches }: { text: string; matches: { text: string; score: number }[] }) {
  if (!matches.length) return <span>{text}</span>

  const parts = []
  let lastIndex = 0

  matches.forEach(match => {
    const index = text.toLowerCase().indexOf(match.text.toLowerCase())
    if (index >= lastIndex) {
      // Add text before match
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index))
      }
      // Add highlighted match
      parts.push(
        <span key={index} className="bg-primary/20 text-primary font-medium">
          {text.slice(index, index + match.text.length)}
        </span>
      )
      lastIndex = index + match.text.length
    }
  })

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}

function ImageMatchBadge({ matches }: { matches: { field: string; text: string; score: number }[] }) {
  const imageMatches = matches.filter(m => m.field === 'image')
  if (!imageMatches.length) return null

  return (
    <div className="absolute bottom-2 left-2">
      <Badge variant="secondary" className="bg-primary/20 text-primary">
        Image Match
      </Badge>
    </div>
  )
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'project':
      return <Code2 className="h-4 w-4" />
    case 'team':
      return <Users className="h-4 w-4" />
    case 'gallery':
      return <ImageIcon className="h-4 w-4" />
    case 'about':
      return <Info className="h-4 w-4" />
    case 'service':
      return <Wrench className="h-4 w-4" />
    default:
      return <Info className="h-4 w-4" />
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'project':
      return 'Project'
    case 'team':
      return 'Team Member'
    case 'gallery':
      return 'Gallery Item'
    case 'about':
      return 'About Section'
    case 'service':
      return 'Service'
    default:
      return type.charAt(0).toUpperCase() + type.slice(1)
  }
}

function getAboutIcon(id: string) {
  switch (id) {
    case 'mission':
      return <Target className="h-4 w-4" />
    case 'vision':
      return <Lightbulb className="h-4 w-4" />
    case 'values':
      return <Heart className="h-4 w-4" />
    default:
      return <Info className="h-4 w-4" />
  }
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { searchQuery, setSearchQuery, searchResults, isSearching, recentSearches, handleSearch, clearSearch } = useSearch()
  const [activeFilter, setActiveFilter] = useState("all")

  // Initialize search from URL query parameter
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      handleSearch(query)
    }
  }, [searchParams])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const filteredResults = activeFilter === "all" 
    ? searchResults 
    : searchResults.filter((result) => result.type === activeFilter)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {searchResults.length} results for "{searchQuery}"
          </p>
        </div>

        {isSearching ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No results found</p>
            <Button onClick={() => router.push('/')}>Return Home</Button>
            </div>
        ) : (
          <div className="grid gap-6">
            {searchResults.map((result) => (
              <Link
                key={result.id}
                href={result.url}
                className="group block bg-card rounded-lg overflow-hidden border transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex">
                  {result.image && (
                    <div className="w-1/3 relative">
                      <Image 
                        src={result.image} 
                        alt={result.title} 
                        fill 
                        className="object-cover transition-transform group-hover:scale-105" 
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="capitalize flex items-center gap-1">
                          {getTypeIcon(result.type)}
                          {getTypeLabel(result.type)}
                  </Badge>
              </div>
                      {result.relevance > 0.7 && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            Best Match
                          </Badge>
            </div>
          )}
                      <ImageMatchBadge matches={result.matches} />
          </div>
        )}
                  <div className={`p-4 ${result.image ? 'w-2/3' : 'w-full'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {!result.image && (
                        <Badge className="capitalize flex items-center gap-1">
                          {result.type === 'about' ? getAboutIcon(result.id) : getTypeIcon(result.type)}
                          {getTypeLabel(result.type)}
                        </Badge>
                      )}
                      {result.type === 'about' && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getAboutIcon(result.id)}
                          {result.id.charAt(0).toUpperCase() + result.id.slice(1)}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">
                      <HighlightedText 
                        text={result.title} 
                        matches={result.matches.filter(m => m.field === 'title')} 
                      />
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      <HighlightedText 
                        text={result.description} 
                        matches={result.matches.filter(m => m.field === 'description')} 
                      />
                    </p>
                    {result.matches.some(m => m.field === 'image') && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          Matches in image: {' '}
                          {result.matches
                            .filter(m => m.field === 'image')
                            .map((match, i) => (
                              <span key={i} className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded mr-1">
                                {match.text}
                              </span>
                            ))}
                        </p>
                      </div>
                    )}
                    {result.creator && (
                      <div className="flex items-center gap-2 mb-4">
                        <Image
                          src={result.creator.image}
                          alt={result.creator.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div className="text-sm">
                          <span className="font-medium line-clamp-1">
                            <HighlightedText 
                              text={result.creator.name} 
                              matches={result.matches.filter(m => m.field === 'creator')} 
                            />
                          </span>
                          <span className="text-muted-foreground line-clamp-1">
                            {' • '}
                            <HighlightedText 
                              text={result.creator.role} 
                              matches={result.matches.filter(m => m.field === 'role')} 
                            />
                          </span>
                  </div>
                  </div>
                    )}
                    {result.matches.some(m => m.field === 'category') && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {result.matches
                          .filter(m => m.field === 'category')
                          .map((match, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              <HighlightedText text={match.text} matches={[match]} />
                            </Badge>
              ))}
            </div>
                    )}
                    <div className="flex items-center text-primary text-sm font-medium">
                      View {getTypeLabel(result.type)}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
                  </div>
                </div>
                  </Link>
            ))}
            </div>
        )}
      </div>
    </div>
  )
}
