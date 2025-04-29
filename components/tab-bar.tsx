"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, Layers, Wrench, Mail, ImageIcon, Users, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Projects", href: "/projects", icon: Layers },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Team", href: "/team", icon: Users },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
  { name: "Contact", href: "/contact", icon: Mail },
]

export default function TabBar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState("/")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setActiveTab(pathname)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [lastScrollY])

  // For desktop
  if (!isMobile) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-4 left-0 right-0 z-50 flex justify-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            data-tour="tab-bar"
          >
            <div className="flex items-center bg-background/80 backdrop-blur-md border shadow-lg rounded-full px-3 py-2 overflow-x-auto max-w-[90vw] hide-scrollbar mx-auto">
              {navigation.map((item) => {
                const isActive = activeTab === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center px-4 py-2 rounded-full transition-colors whitespace-nowrap relative",
                      isActive ? "text-gray-500" : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                    onClick={() => setActiveTab(item.href)}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gray-500/10 rounded-full -z-10"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-mono mt-1">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // For mobile
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 mobile-tab-bar"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
          >
            <div className="mobile-tab-content">
              {navigation.slice(0, 4).map((item) => {
                const isActive = activeTab === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn("mobile-tab-item", isActive ? "text-gray-500" : "text-muted-foreground")}
                    onClick={() => setActiveTab(item.href)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-mono">{item.name}</span>
                  </Link>
                )
              })}
              <button className="mobile-tab-item text-muted-foreground" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
                <span className="text-xs font-mono">More</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 rounded-t-xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Menu</h3>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {navigation.map((item) => {
                  const isActive = activeTab === item.href
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center p-3 rounded-lg",
                        isActive ? "bg-gray-500/10 text-gray-500" : "text-muted-foreground",
                      )}
                      onClick={() => {
                        setActiveTab(item.href)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <Icon className="h-6 w-6 mb-1" />
                      <span className="text-xs font-mono">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
