"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, Lightbulb, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface Suggestion {
  id: string
  title: string
  description: string
  category: "design" | "content" | "technical" | "performance"
}

export default function IntegratedAiSuggestions() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  const { theme } = useTheme()

  // Simulate loading suggestions from an API
  useEffect(() => {
    const mockSuggestions: Suggestion[] = [
      {
        id: "1",
        title: "Optimize hero image",
        description: "Consider using WebP format to improve load time by up to 30%",
        category: "performance",
      },
      {
        id: "2",
        title: "Add testimonials section",
        description: "Showcase client feedback to build trust with visitors",
        category: "content",
      },
      {
        id: "3",
        title: "Improve mobile navigation",
        description: "Current menu has touch targets that are too small on mobile devices",
        category: "design",
      },
      {
        id: "4",
        title: "Implement lazy loading",
        description: "Defer loading of off-screen images to improve initial page load",
        category: "technical",
      },
      {
        id: "5",
        title: "Add animation to CTA buttons",
        description: "Subtle hover animations can increase click-through rates",
        category: "design",
      },
      {
        id: "6",
        title: "Optimize font loading",
        description: "Use font-display: swap to prevent invisible text during font loading",
        category: "performance",
      },
    ]

    setTimeout(() => {
      setSuggestions(mockSuggestions)
      setFilteredSuggestions(mockSuggestions)
      setIsLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    if (activeCategory) {
      setFilteredSuggestions(suggestions.filter((suggestion) => suggestion.category === activeCategory))
    } else {
      setFilteredSuggestions(suggestions)
    }
  }, [activeCategory, suggestions])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "design":
        return "bg-blue-500"
      case "content":
        return "bg-green-500"
      case "technical":
        return "bg-purple-500"
      case "performance":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <div className="fixed right-0 top-1/4 z-40 h-auto">
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "flex items-center justify-center rounded-l-md p-2 shadow-md transition-all duration-300",
          isOpen ? "bg-transparent" : "bg-primary text-primary-foreground hover:bg-primary/90",
          theme === "dark" ? "text-white" : "text-gray-800",
        )}
        aria-label={isOpen ? "Close AI suggestions" : "Open AI suggestions"}
      >
        {isOpen ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">AI Suggestions</span>
          </div>
        )}
      </button>

      {/* Sidebar content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "w-80 rounded-l-lg border border-r-0 shadow-lg",
              theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
            )}
          >
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                AI Suggestions
              </h2>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Close suggestions">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 p-4 border-b">
              <Button
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(null)}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={activeCategory === "design" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("design")}
                className="text-xs"
              >
                Design
              </Button>
              <Button
                variant={activeCategory === "content" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("content")}
                className="text-xs"
              >
                Content
              </Button>
              <Button
                variant={activeCategory === "technical" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("technical")}
                className="text-xs"
              >
                Technical
              </Button>
              <Button
                variant={activeCategory === "performance" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("performance")}
                className="text-xs"
              >
                Performance
              </Button>
            </div>

            {/* Suggestions list */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              ) : filteredSuggestions.length > 0 ? (
                <ul className="space-y-3">
                  {filteredSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className={cn(
                        "rounded-lg border p-3 transition-all hover:shadow-md",
                        theme === "dark"
                          ? "border-gray-700 hover:border-gray-600"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-2 w-2 rounded-full ${getCategoryColor(suggestion.category)}`}></div>
                        <h3 className="font-medium">{suggestion.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion.description}</p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-xs">
                          Apply
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No suggestions found</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className={cn(
                "border-t p-3 text-center text-xs",
                theme === "dark" ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500",
              )}
            >
              Powered by RYPTO TEC AI Engine
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
