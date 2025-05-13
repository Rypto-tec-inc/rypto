"use client"

import { useEffect, useRef, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

/**
 * Enhanced component that implements various techniques to prevent or discourage screenshots
 * across all devices including mobile
 */
const ScreenshotPrevention = () => {
  // Use refs instead of state to avoid render-time updates
  const lastVisibilityChangeRef = useRef(0)
  const screenshotAttemptsRef = useRef(0)

  // Memoize the showWarning function
  const showWarning = useCallback((message) => {
    toast({
      title: "Content Protection",
      description: message,
      variant: "destructive",
    })
  }, [])

  // Memoize the trackScreenshotAttempt function
  const trackScreenshotAttempt = useCallback(() => {
    screenshotAttemptsRef.current += 1
    if (screenshotAttemptsRef.current > 2) {
      showWarning("Multiple screenshot attempts detected. This content is protected.")
    }
  }, [showWarning])

  // Memoize the addWatermark function
  const addWatermark = useCallback(() => {
    // Check if watermark already exists
    if (document.getElementById("content-protection-watermark")) return

    // Create a semi-transparent watermark
    const watermark = document.createElement("div")
    watermark.id = "content-protection-watermark"
    watermark.style.position = "fixed"
    watermark.style.top = "0"
    watermark.style.left = "0"
    watermark.style.width = "100%"
    watermark.style.height = "100%"
    watermark.style.pointerEvents = "none"
    watermark.style.zIndex = "9999"
    watermark.style.opacity = "0.03"
    watermark.style.backgroundImage =
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><text x="50%" y="50%" fontFamily="Arial" fontSize="20" textAnchor="middle" fill="black">RYPTO TEC © 2023</text></svg>\')'
    watermark.style.backgroundRepeat = "repeat"

    document.body.appendChild(watermark)
  }, [])

  // Memoize the removeWatermark function
  const removeWatermark = useCallback(() => {
    const watermark = document.getElementById("content-protection-watermark")
    if (watermark) {
      document.body.removeChild(watermark)
    }
  }, [])

  // Set up all event listeners in a single useEffect
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault()
      showWarning("Right-click disabled for content protection")
      return false
    }

    // Disable keyboard shortcuts commonly used for screenshots
    const handleKeyDown = (e) => {
      // Prevent PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault()
        showWarning("Screenshot attempt detected")
        trackScreenshotAttempt()
        return false
      }

      // Prevent Ctrl+P (Print)
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault()
        showWarning("Print function is disabled")
        return false
      }

      // Prevent Ctrl+Shift+S or Ctrl+S (Save)
      if (e.ctrlKey && (e.key === "s" || (e.shiftKey && e.key === "s"))) {
        e.preventDefault()
        showWarning("Save function is disabled")
        return false
      }

      // Prevent Cmd+Shift+3 or Cmd+Shift+4 (Mac screenshots)
      if (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4")) {
        showWarning("Screenshot attempt detected")
        trackScreenshotAttempt()
      }

      return true
    }

    // Detect visibility change which might indicate screenshot attempts
    const handleVisibilityChange = () => {
      const now = Date.now()
      // If page becomes hidden and it's been less than 300ms since last change
      // This can indicate screenshot on some mobile devices
      if (document.visibilityState === "hidden" && now - lastVisibilityChangeRef.current < 300) {
        trackScreenshotAttempt()
      }
      lastVisibilityChangeRef.current = now
    }

    // Mobile-specific detection (iOS screenshot detection)
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // Check if this is potentially a screenshot attempt
        if (
          window.innerWidth === document.documentElement.clientWidth &&
          window.innerHeight === document.documentElement.clientHeight
        ) {
          // Possible screenshot attempt on iOS
          trackScreenshotAttempt()
        }
      }, 50)
    }

    // Add watermark to make screenshots less useful
    addWatermark()

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("resize", handleResize)

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("resize", handleResize)
      removeWatermark()
    }
  }, [showWarning, trackScreenshotAttempt, addWatermark, removeWatermark])

  return null // This component doesn't render anything visible
}

export default ScreenshotPrevention
