"use client"

import { useState, useEffect } from "react"
import { X, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type TourStep = {
  target: string
  title: string
  content: string
  position: "top" | "right" | "bottom" | "left"
}

const defaultTourSteps: TourStep[] = [
  {
    target: "nav",
    title: "Navigation",
    content: "Use the navigation bar to explore different sections of our website.",
    position: "bottom",
  },
  {
    target: "theme-toggle",
    title: "Theme Toggle",
    content: "Switch between light and dark mode based on your preference.",
    position: "bottom",
  },
  {
    target: "tab-bar",
    title: "Quick Access",
    content: "Use this tab bar for quick access to main sections from anywhere on the site.",
    position: "top",
  },
  {
    target: "partners-section",
    title: "Our Partners",
    content: "See the companies and organizations we collaborate with.",
    position: "top",
  },
]

export function TourGuide() {
  const [isTourActive, setIsTourActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [tourSteps, setTourSteps] = useState<TourStep[]>(defaultTourSteps)
  const [tooltipStyle, setTooltipStyle] = useState({})
  const [hasShownTourBefore, setHasShownTourBefore] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  useEffect(() => {
    // Check if the tour has been shown before
    const tourShown = localStorage.getItem("tourShown")
    if (tourShown) {
      setHasShownTourBefore(true)
    }
  }, [])

  useEffect(() => {
    if (isTourActive) {
      positionTooltip()
      // Add event listener for window resize
      window.addEventListener("resize", positionTooltip)
      // Add event listener for scroll
      window.addEventListener("scroll", positionTooltip)
    }

    return () => {
      window.removeEventListener("resize", positionTooltip)
      window.removeEventListener("scroll", positionTooltip)
    }
  }, [isTourActive, currentStep])

  const positionTooltip = () => {
    if (!isTourActive || currentStep >= tourSteps.length) return

    const step = tourSteps[currentStep]
    const targetElement = document.querySelector(`[data-tour="${step.target}"]`)

    if (!targetElement) return

    const targetRect = targetElement.getBoundingClientRect()
    const tooltipWidth = 300
    const tooltipHeight = 180
    const spacing = 15

    let top, left

    switch (step.position) {
      case "top":
        top = targetRect.top - tooltipHeight - spacing
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2
        break
      case "right":
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2
        left = targetRect.right + spacing
        break
      case "bottom":
        top = targetRect.bottom + spacing
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2
        break
      case "left":
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2
        left = targetRect.left - tooltipWidth - spacing
        break
    }

    // Ensure the tooltip stays within viewport
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (left < 10) left = 10
    if (left + tooltipWidth > viewportWidth - 10) left = viewportWidth - tooltipWidth - 10
    if (top < 10) top = 10
    if (top + tooltipHeight > viewportHeight - 10) top = viewportHeight - tooltipHeight - 10

    setTooltipStyle({
      top: `${top}px`,
      left: `${left}px`,
    })

    // Highlight the target element
    targetElement.classList.add("tour-highlight")

    return () => {
      targetElement.classList.remove("tour-highlight")
    }
  }

  const startTour = () => {
    setCurrentStep(0)
    setIsTourActive(true)
    localStorage.setItem("tourShown", "true")
    setHasShownTourBefore(true)
  }

  const endTour = () => {
    setIsTourActive(false)
    // Remove highlight from all elements
    document.querySelectorAll(".tour-highlight").forEach((el) => {
      el.classList.remove("tour-highlight")
    })
  }

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      // Remove highlight from current element
      const currentTarget = document.querySelector(`[data-tour="${tourSteps[currentStep].target}"]`)
      if (currentTarget) currentTarget.classList.remove("tour-highlight")

      setCurrentStep(currentStep + 1)
    } else {
      endTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      // Remove highlight from current element
      const currentTarget = document.querySelector(`[data-tour="${tourSteps[currentStep].target}"]`)
      if (currentTarget) currentTarget.classList.remove("tour-highlight")

      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      {/* Tour Guide Button */}
      <motion.button
        onClick={startTour}
        className="fixed bottom-24 right-4 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Start Tour Guide"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isButtonHovered ? 1.1 : 1,
          opacity: 1,
          y: [0, -5, 0],
        }}
        transition={{
          duration: 0.3,
          y: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        whileTap={{ scale: 0.95 }}
      >
        <HelpCircle className="h-5 w-5" />
        {!hasShownTourBefore && (
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </motion.button>

      {/* Tour Guide Tooltip */}
      <AnimatePresence>
        {isTourActive && currentStep < tourSteps.length && (
          <motion.div
            className="fixed z-50 w-[300px] bg-card border shadow-lg rounded-lg p-4"
            style={tooltipStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{tourSteps[currentStep].title}</h3>
              <button onClick={endTour} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-muted-foreground mb-4">{tourSteps[currentStep].content}</p>
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {tourSteps.length}
              </div>
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <motion.button
                    onClick={prevStep}
                    className="p-1 rounded-md hover:bg-accent transition-colors"
                    aria-label="Previous step"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                )}
                <motion.button
                  onClick={nextStep}
                  className="p-1 rounded-md hover:bg-accent transition-colors"
                  aria-label="Next step"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep < tourSteps.length - 1 ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
