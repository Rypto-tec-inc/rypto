"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Brain, ChevronRight, Lightbulb, Settings, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function AISidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [aiMode, setAiMode] = useState("suggestions") // suggestions, insights, assistant
  const pathname = usePathname()
  const currentPage = pathname.split("/")[1] || "home"
  const sidebarRef = useRef(null)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded])

  useEffect(() => {
    // Reset when page changes
    setLoading(true)

    // This would normally be a call to a TensorFlow.js model or API
    const timer = setTimeout(() => {
      const pageSuggestions = generateSuggestions(currentPage)
      setSuggestions(pageSuggestions)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentPage])

  const generateSuggestions = (page) => {
    // Mock suggestions based on current page
    const suggestionsByPage = {
      home: [
        {
          type: "suggestion",
          text: "Explore our VR architectural visualization services",
          link: "/services#vr-architecture",
          icon: "Lightbulb",
        },
        {
          type: "suggestion",
          text: "Check out our latest animation projects",
          link: "/gallery",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "Users who viewed this page also explored our AI integration capabilities",
          link: "/services#ai-integration",
          icon: "Sparkles",
        },
        {
          type: "action",
          text: "Contact us for a free consultation",
          link: "/contact",
          icon: "ChevronRight",
        },
      ],
      about: [
        {
          type: "suggestion",
          text: "Meet our leadership team",
          link: "/team?department=leadership",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "Most visitors are interested in our company history and vision",
          link: "/about#history",
          icon: "Sparkles",
        },
        {
          type: "suggestion",
          text: "Explore our core values",
          link: "/about#values",
          icon: "Lightbulb",
        },
        {
          type: "action",
          text: "See our client testimonials",
          link: "/about#testimonials",
          icon: "ChevronRight",
        },
      ],
      work: [
        {
          type: "suggestion",
          text: "Filter projects by industry",
          link: "/work?filter=industry",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "Healthcare projects receive the most engagement from visitors",
          link: "/work?industry=healthcare",
          icon: "Sparkles",
        },
        {
          type: "suggestion",
          text: "See our design process",
          link: "/work#process",
          icon: "Lightbulb",
        },
        {
          type: "action",
          text: "Request a portfolio presentation",
          link: "/contact?subject=portfolio",
          icon: "ChevronRight",
        },
      ],
      gallery: [
        {
          type: "suggestion",
          text: "View our 3D animation showcase",
          link: "/gallery?type=3d-animation",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "VR/AR projects are trending among our visitors",
          link: "/gallery?type=vr-ar",
          icon: "Sparkles",
        },
        {
          type: "suggestion",
          text: "Check out our UI/UX design work",
          link: "/gallery?type=ui-ux",
          icon: "Lightbulb",
        },
        {
          type: "action",
          text: "Download our portfolio PDF",
          link: "/downloads/portfolio",
          icon: "ChevronRight",
        },
      ],
      team: [
        {
          type: "suggestion",
          text: "Meet our engineering team",
          link: "/team?department=engineering",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "Visitors are most interested in our AI/ML specialists",
          link: "/team?department=ai-ml",
          icon: "Sparkles",
        },
        {
          type: "suggestion",
          text: "See our leadership team",
          link: "/team?department=leadership",
          icon: "Lightbulb",
        },
        {
          type: "action",
          text: "View open positions",
          link: "/careers",
          icon: "ChevronRight",
        },
      ],
      products: [
        {
          type: "suggestion",
          text: "Explore RyptoFlow features",
          link: "/products/ryptoflow",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "Our AI integration tools receive the most demo requests",
          link: "/products?category=ai",
          icon: "Sparkles",
        },
        {
          type: "suggestion",
          text: "View pricing options",
          link: "/products#pricing",
          icon: "Lightbulb",
        },
        {
          type: "action",
          text: "Request a product demo",
          link: "/contact?subject=demo",
          icon: "ChevronRight",
        },
      ],
      contact: [
        {
          type: "suggestion",
          text: "Schedule a consultation",
          link: "/contact?type=consultation",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "Most visitors contact us about custom development services",
          link: "/services#custom-development",
          icon: "Sparkles",
        },
        {
          type: "suggestion",
          text: "Visit our office",
          link: "/contact#location",
          icon: "Lightbulb",
        },
        {
          type: "action",
          text: "Join our newsletter",
          link: "/newsletter",
          icon: "ChevronRight",
        },
      ],
      studio: [
        {
          type: "suggestion",
          text: "Explore our animation services",
          link: "/studio#animation",
          icon: "Lightbulb",
        },
        {
          type: "insight",
          text: "3D modeling services are our most requested studio service",
          link: "/studio#3d-modeling",
          icon: "Sparkles",
        },
        {
          type: "suggestion",
          text: "View our motion graphics portfolio",
          link: "/gallery?type=motion-graphics",
          icon: "Lightbulb",
        },
        {
          type: "action",
          text: "Request a quote for animation work",
          link: "/contact?subject=animation",
          icon: "ChevronRight",
        },
      ],
    }

    return suggestionsByPage[page] || suggestionsByPage.home
  }

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Lightbulb":
        return <Lightbulb className="h-4 w-4 mr-2 text-primary" />
      case "Sparkles":
        return <Sparkles className="h-4 w-4 mr-2 text-primary" />
      case "ChevronRight":
        return <ChevronRight className="h-4 w-4 mr-2 text-primary" />
      default:
        return <Lightbulb className="h-4 w-4 mr-2 text-primary" />
    }
  }

  const filteredSuggestions = suggestions.filter((suggestion) => {
    if (aiMode === "suggestions") return suggestion.type === "suggestion"
    if (aiMode === "insights") return suggestion.type === "insight"
    if (aiMode === "actions") return suggestion.type === "action"
    return true
  })

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "fixed right-0 top-20 bottom-0 z-30 transition-all duration-300 ease-in-out",
        isExpanded ? "w-[300px]" : "w-[40px]",
      )}
    >
      {/* Tab */}
      <div
        className={cn(
          "absolute top-1/2 -left-10 -translate-y-1/2 h-32 w-10 bg-background border-l border-t border-b border-border cursor-pointer flex items-center justify-center",
          "transition-all duration-300 hover:bg-muted",
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Brain className="h-5 w-5 text-primary" />
          <div className="text-xs font-medium rotate-90 whitespace-nowrap">AI ASSIST</div>
        </div>
      </div>

      {/* Main panel */}
      <div
        className={cn(
          "h-full border-l border-border bg-background/95 backdrop-blur-sm",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsExpanded(false)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border-b border-border">
          <div className="flex items-center justify-between p-2">
            <div className="flex">
              <Button
                variant={aiMode === "suggestions" ? "default" : "ghost"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setAiMode("suggestions")}
              >
                Suggestions
              </Button>
              <Button
                variant={aiMode === "insights" ? "default" : "ghost"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setAiMode("insights")}
              >
                Insights
              </Button>
              <Button
                variant={aiMode === "actions" ? "default" : "ghost"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setAiMode("actions")}
              >
                Actions
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-3 h-[calc(100%-110px)] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
              <span className="text-sm">Analyzing your interests...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-2 hover:bg-muted cursor-pointer rounded-sm group"
                  >
                    {getIcon(suggestion.icon)}
                    <Link href={suggestion.link} className="text-sm flex-1">
                      {suggestion.text}
                    </Link>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No {aiMode} available for this page</div>
              )}
            </div>
          )}
        </div>

        <div className="p-2 text-xs text-center text-muted-foreground border-t border-border">
          Powered by TensorFlow.js • Personalized for you
        </div>
      </div>
    </div>
  )
}
