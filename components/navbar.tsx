"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Download, Search } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

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
      console.log("PWA was installed")
      setIsInstalled(true)
      setIsInstallable(false)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
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

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25
      },
    }),
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, you would implement actual search functionality
      // For now, we'll just navigate to a search results page with the query as a parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header
      data-tour="nav"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/75 backdrop-blur-xl shadow-md border-b border-primary/10" 
          : "bg-gradient-to-r from-background/0 via-background/5 to-background/0 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-2 px-3 md:px-6" aria-label="Global">
        <motion.div
          className="flex lg:flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="-m-1 p-1 flex items-center gap-2 group">
            <motion.div 
              className="relative w-12 h-12 overflow-visible"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image 
                src="/rypto-logo.png"  
                alt="RYPTO TEC INC Logo" 
                fill 
                className="object-contain drop-shadow-md" 
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">RYPTO</span>
              <span className="text-xs tracking-widest text-muted-foreground font-medium">TECH</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-3 items-center">
          {navigation.map((item, i) => (
            <motion.div key={item.name} custom={i} initial="hidden" animate="visible" variants={navItemVariants}>
              <Link
                href={item.href}
                className={`relative px-2 py-1 text-sm font-medium transition-all duration-200 overflow-hidden group ${
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 ${pathname === item.href ? 'scale-x-100 bg-primary' : 'group-hover:scale-x-100 bg-foreground/20'} transition-transform duration-300 ease-out origin-left`}></span>
                {pathname === item.href && 
                  <motion.span 
                    className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                    layoutId="navHighlight"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                }
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <motion.button
            onClick={toggleSearch}
            className="p-1 rounded-md hover:bg-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </motion.button>

          {isInstallable && !isInstalled && (
            <motion.button
              onClick={handleInstallClick}
              className="flex items-center justify-center p-1 rounded-full border border-foreground/20 hover:bg-accent transition-colors"
              aria-label="Install App"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" />
            </motion.button>
          )}
          <motion.button
            type="button"
            className="-m-1.5 inline-flex items-center justify-center rounded-md p-1.5"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Theme toggle, Search and Install button */}
        <motion.div
          className="hidden md:flex md:items-center md:gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search button and input */}
          <div className="relative">
            <motion.button
              onClick={toggleSearch}
              className="p-1 rounded-md hover:bg-accent/80 hover:shadow-md transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  className="absolute right-0 top-full mt-1 w-64 bg-background border rounded-md shadow-lg p-1.5"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      className="flex-1 p-1.5 text-sm bg-transparent border-none focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="p-1.5">
                      <Search className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isInstallable && !isInstalled && (
            <motion.button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-foreground/20 text-xs hover:bg-accent transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" />
              <span>Install App</span>
            </motion.button>
          )}
          <div data-tour="theme-toggle" className="ml-2">
            <ModeToggle />
          </div>
        </motion.div>
      </nav>

      {/* Search overlay for mobile */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="md:hidden px-4 py-2 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 p-1.5 text-xs bg-transparent border-none focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="p-1.5">
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl px-2.5 py-2 sm:max-w-[250px] sm:border-l border-primary/10 shadow-2xl"
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1 p-1 flex items-center gap-2">
                  <motion.div 
                    className="relative w-10 h-10"
                    initial={{ rotate: -10, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-sm"></div>
                    <Image src="/rypto-logo.png" alt="RYPTO TEC INC Logo" fill className="object-contain drop-shadow-md" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">RYPTO</span>
                    <span className="text-xs tracking-widest text-muted-foreground font-medium">TECH</span>
                  </div>
                </Link>
                <motion.button 
                  type="button" 
                  className="-m-1.5 rounded-full p-1.5 bg-primary/10 hover:bg-primary/20 transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </motion.button>
              </div>
              <div className="mt-2 flow-root">
                <div className="-my-1 divide-y divide-border/30">
                  <div className="space-y-0.5 py-2">
                    {navigation.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Link
                          href={item.href}
                          className={`-mx-1 block rounded-md px-2 py-1 text-xs font-medium leading-tight transition-all ${
                            pathname === item.href 
                              ? "text-primary bg-primary/10 shadow-sm border-l-2 border-primary" 
                              : "text-foreground/80 hover:text-foreground hover:bg-accent/40 hover:translate-x-1"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <ModeToggle />
                    {isInstallable && !isInstalled && (
                      <motion.button
                        onClick={handleInstallClick}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-foreground/20 text-xs hover:bg-accent transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="h-4 w-4" />
                        <span>Install App</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
