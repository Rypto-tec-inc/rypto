"use client"

import { useEffect } from "react"

export default function ScreenshotPrevention() {
  useEffect(() => {
    const preventScreenshot = () => {
      // Disable right-click
      document.addEventListener("contextmenu", (e) => e.preventDefault())

      // Disable keyboard shortcuts
      document.addEventListener("keydown", (e) => {
        // Prevent PrintScreen
        if (e.key === "PrintScreen") {
          e.preventDefault()
          return false
        }

        // Prevent Ctrl+P (Print)
        if (e.ctrlKey && e.key === "p") {
          e.preventDefault()
          return false
        }

        // Prevent Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === "I") {
          e.preventDefault()
          return false
        }

        // Prevent Ctrl+Shift+C (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === "C") {
          e.preventDefault()
          return false
        }

        // Prevent Ctrl+S (Save)
        if (e.ctrlKey && e.key === "s") {
          e.preventDefault()
          return false
        }

        // Prevent Ctrl+U (View Source)
        if (e.ctrlKey && e.key === "u") {
          e.preventDefault()
          return false
        }
      })

      // Add CSS to prevent selection
      const style = document.createElement("style")
      style.innerHTML = `
        body {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        img, video {
          pointer-events: none;
        }
      `
      document.head.appendChild(style)

      // Add a watermark div that appears when screenshot is attempted
      const watermark = document.createElement("div")
      watermark.id = "screenshot-watermark"
      watermark.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        color: white;
        font-size: 24px;
        text-align: center;
        padding-top: 40vh;
        z-index: 9999;
      `
      watermark.innerHTML = "Screenshots are not permitted on this website."
      document.body.appendChild(watermark)

      // Show watermark on visibility change (potential screenshot attempt)
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          watermark.style.display = "block"
          setTimeout(() => {
            if (document.visibilityState === "visible") {
              watermark.style.display = "none"
            }
          }, 500)
        } else {
          watermark.style.display = "none"
        }
      })
    }

    preventScreenshot()
  }, [])

  return null
}
