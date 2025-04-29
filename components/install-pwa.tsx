"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to notify the user they can install the PWA
      setIsInstallable(true)
    })

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      // Log app installed
      console.log("PWA was installed")
      setIsInstalled(true)
      setIsInstallable(false)
    })
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)

    // We've used the prompt, and can't use it again, so clear it
    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  if (!isInstallable || isInstalled) return null

  return (
    <div className="fixed bottom-24 left-4 z-40">
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Install App</span>
      </button>
    </div>
  )
}
