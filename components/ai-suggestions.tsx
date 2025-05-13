"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, X, ChevronRight, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AISuggestions({ currentPage }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading AI suggestions
    setLoading(true)

    // This would normally be a call to a TensorFlow.js model or API
    const timer = setTimeout(() => {
      const pageSuggestions = generateSuggestions(currentPage)
      setSuggestions(pageSuggestions)
      setLoading(false)

      // Show suggestions after a delay
      setTimeout(() => {
        setIsVisible(true)
      }, 2000)
    }, 1500)

    return () => clearTimeout(timer)
  }, [currentPage])

  const generateSuggestions = (page) => {
    // Mock suggestions based on current page
    const suggestionsByPage = {
      home: [
        "Explore our VR architectural visualization services",
        "Check out our latest animation projects",
        "Learn about our AI integration capabilities",
        "Contact us for a free consultation",
      ],
      about: [
        "Meet our leadership team",
        "Learn about our company history",
        "Explore our core values",
        "See our client testimonials",
      ],
      work: [
        "Filter projects by industry",
        "View our case studies",
        "See our design process",
        "Request a portfolio presentation",
      ],
      gallery: [
        "View our 3D animation showcase",
        "Explore VR/AR projects",
        "Check out our UI/UX design work",
        "Download our portfolio PDF",
      ],
      team: [
        "Meet our engineering team",
        "Learn about our design department",
        "See our leadership team",
        "View open positions",
      ],
      products: [
        "Explore RyptoFlow features",
        "Request a product demo",
        "View pricing options",
        "Read customer success stories",
      ],
      contact: ["Schedule a consultation", "Visit our office", "Join our newsletter", "Follow us on social media"],
    }

    return suggestionsByPage[page] || suggestionsByPage.home
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed bottom-4 right-4 z-40",
          "bg-background border border-border shadow-lg",
          "transition-all duration-300 ease-in-out",
          isExpanded ? "w-[320px]" : "w-[280px]",
        )}
      >
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm font-medium">AI Suggestions</span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-3">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
              <span className="text-sm">Analyzing your interests...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start p-2 hover:bg-muted cursor-pointer rounded-sm group"
                >
                  <Lightbulb className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                  <span className="text-sm flex-1">{suggestion}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="p-2 text-xs text-center text-muted-foreground border-t border-border">
          Powered by TensorFlow.js • Personalized for you
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
