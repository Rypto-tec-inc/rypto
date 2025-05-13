"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type UserAction = {
  type: string
  path: string
  timestamp: number
  details?: Record<string, any>
}

type UserSession = {
  id: string
  startTime: number
  actions: UserAction[]
  device: string
  browser: string
  screenSize: string
}

const UserBehaviorTracker = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Use refs instead of state to avoid re-renders
  const sessionRef = useRef<UserSession | null>(null)
  const lastPathRef = useRef<string>(pathname)
  const maxScrollDepthRef = useRef<number>(0)
  const lastReportedDepthRef = useRef<number>(0)
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null) // Ref for interval

  // Initialize session only once
  useEffect(() => {
    const sessionId = Math.random().toString(36).substring(2, 15)
    const userAgent = navigator.userAgent
    const browser = detectBrowser(userAgent)
    const device = detectDevice(userAgent)
    const screenSize = `${window.innerWidth}x${window.innerHeight}`

    sessionRef.current = {
      id: sessionId,
      startTime: Date.now(),
      actions: [],
      device,
      browser,
      screenSize,
    }

    // Track initial page view
    if (sessionRef.current) {
      const action: UserAction = {
        type: "page_view",
        path: pathname,
        timestamp: Date.now(),
        details: { referrer: document.referrer },
      }

      sessionRef.current.actions.push(action)
      console.log(`[UserTracker] page_view:`, { referrer: document.referrer })
    }

    // Clean up function
    return () => {
      // In a real app, you might want to send the session data to your backend here
      if (sessionRef.current) {
        console.log("Session data:", sessionRef.current)
        // Example of how you might send this to your backend:
        // fetch('/api/analytics', {
        //   method: 'POST',
        //   body: JSON.stringify(sessionRef.current)
        // })
      }
      // Clear the interval on cleanup
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current)
      }
    }
  }, []) // Empty dependency array ensures this runs only once

  // Track page changes without using state updates
  useEffect(() => {
    // Only track if the path actually changed and session exists
    if (pathname !== lastPathRef.current && sessionRef.current) {
      const action: UserAction = {
        type: "page_view",
        path: pathname,
        timestamp: Date.now(),
        details: {
          previousPath: lastPathRef.current,
          queryParams: Object.fromEntries(searchParams.entries()),
        },
      }

      sessionRef.current.actions.push(action)
      console.log(`[UserTracker] page_view:`, action.details)

      // Update the last path ref
      lastPathRef.current = pathname

      // Reset scroll tracking for new page
      maxScrollDepthRef.current = 0
      lastReportedDepthRef.current = 0
    }
  }, [pathname, searchParams]) // Only re-run when the path or search params change

  // Track clicks
  useEffect(() => {
    const handleClick = (e) => {
      if (!sessionRef.current) return

      const target = e.target as HTMLElement
      const clickTarget = target.tagName.toLowerCase()
      const nearestLink = target.closest("a")
      const nearestButton = target.closest("button")

      let actionTarget = clickTarget
      const details: Record<string, any> = {
        x: e.clientX,
        y: e.clientY,
        element: clickTarget,
      }

      if (nearestLink) {
        actionTarget = "link"
        details.href = nearestLink.getAttribute("href")
        details.text = nearestLink.textContent
      } else if (nearestButton) {
        actionTarget = "button"
        details.text = nearestButton.textContent
      }

      const action: UserAction = {
        type: "click",
        path: pathname,
        timestamp: Date.now(),
        details: { target: actionTarget, ...details },
      }

      sessionRef.current.actions.push(action)
      console.log(`[UserTracker] click:`, action.details)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [pathname]) // Only re-attach when pathname changes

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      if (!sessionRef.current) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollTop = window.scrollY
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

      if (scrollPercentage > maxScrollDepthRef.current) {
        maxScrollDepthRef.current = scrollPercentage
      }

      // Report at 25%, 50%, 75%, and 100%
      const checkAndReportDepth = (threshold: number) => {
        if (maxScrollDepthRef.current >= threshold && lastReportedDepthRef.current < threshold) {
          const action: UserAction = {
            type: "scroll_depth",
            path: pathname,
            timestamp: Date.now(),
            details: { depth: threshold },
          }

          sessionRef.current?.actions.push(action)
          console.log(`[UserTracker] scroll_depth:`, action.details)

          lastReportedDepthRef.current = threshold
        }
      }

      checkAndReportDepth(25)
      checkAndReportDepth(50)
      checkAndReportDepth(75)
      checkAndReportDepth(100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname]) // Only re-attach when pathname changes

  // Track time spent on page - using a ref for the interval
  useEffect(() => {
    // Start the heartbeat
    heartbeatIntervalRef.current = setInterval(() => {
      if (!sessionRef.current) return

      const action: UserAction = {
        type: "heartbeat",
        path: pathname,
        timestamp: Date.now(),
        details: {
          timeSpent: Math.floor((Date.now() - sessionRef.current.startTime) / 1000),
        },
      }

      sessionRef.current.actions.push(action)
      console.log(`[UserTracker] heartbeat:`, action.details)
    }, 30000) // Every 30 seconds

    // Clear the interval on cleanup
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current)
      }
    }
  }, [pathname]) // Only restart the heartbeat when pathname changes

  return null // This component doesn't render anything
}

// Helper functions
function detectBrowser(userAgent: string): string {
  if (userAgent.indexOf("Chrome") > -1) return "Chrome"
  if (userAgent.indexOf("Safari") > -1) return "Safari"
  if (userAgent.indexOf("Firefox") > -1) return "Firefox"
  if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) return "IE"
  if (userAgent.indexOf("Edge") > -1) return "Edge"
  return "Unknown"
}

function detectDevice(userAgent: string): string {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS"
    if (/Android/i.test(userAgent)) return "Android"
    return "Mobile"
  }
  return "Desktop"
}

export default UserBehaviorTracker
