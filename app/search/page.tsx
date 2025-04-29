"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

// Mock search results - in a real app, this would come from a database or API
const mockResults = [
  {
    id: 1,
    title: "Virtual Reality Development",
    description: "Our VR development services create immersive experiences for education, training, and entertainment.",
    url: "/services",
    type: "Service",
  },
  {
    id: 2,
    title: "RYPTO Learn Platform",
    description: "An interactive learning platform designed to teach programming and digital skills to African youth.",
    url: "/projects",
    type: "Project",
  },
  {
    id: 3,
    title: "About RYPTO TEC INC",
    description: "Learn about our mission, vision, and the technology we're building.",
    url: "/about",
    type: "Page",
  },
  {
    id: 4,
    title: "3D Visualization Services",
    description: "We create detailed 3D models and visualizations for architecture, product design, and more.",
    url: "/services",
    type: "Service",
  },
  {
    id: 5,
    title: "Contact Us",
    description: "Get in touch with our team to discuss your project needs.",
    url: "/contact",
    type: "Page",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<typeof mockResults>([])

  useEffect(() => {
    // Simulate API call with loading state
    setLoading(true)

    setTimeout(() => {
      if (query) {
        // Filter mock results based on query
        const filteredResults = mockResults.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filteredResults)
      } else {
        setResults([])
      }
      setLoading(false)
    }, 1000)
  }, [query])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="container mx-auto px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="heading-xl mb-6">Search Results</h1>
            <div className="relative">
              <form className="flex items-center">
                <input
                  type="text"
                  defaultValue={query}
                  placeholder="Search..."
                  className="w-full px-4 py-3 pr-10 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section>
        <div className="container mx-auto px-8 py-16">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-8">
                  Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
                </p>
                <div className="space-y-8">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      className="p-6 border rounded-lg hover:shadow-md transition-all"
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                          <p className="text-muted-foreground mb-4">{result.description}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-secondary rounded-full">{result.type}</span>
                      </div>
                      <Link
                        href={result.url}
                        className="inline-flex items-center gap-2 text-sm hover:underline text-primary"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">No results found</h2>
                <p className="text-muted-foreground mb-8">
                  We couldn't find any matches for "{query}". Please try another search term.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
