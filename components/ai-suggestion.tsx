"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X } from "lucide-react"

interface AISuggestionProps {
  suggestions: string[]
  interval?: number
}

export function AISuggestion({ suggestions, interval = 8000 }: AISuggestionProps) {
  const [currentSuggestion, setCurrentSuggestion] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length)
    }, interval)

    return () => clearInterval(timer)
  }, [suggestions, interval])

  if (!visible) return null

  return (
    <div className="fixed bottom-24 right-4 max-w-xs z-40 animate-float">
      <div className="bg-card border shadow-lg rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-primary/20">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-sm">TensorFlow AI</span>
          </div>
          <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm">{suggestions[currentSuggestion]}</p>
      </div>
    </div>
  )
}
