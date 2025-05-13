"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Users, Phone, Layers, ImageIcon, Search } from "lucide-react"
import { motion } from "framer-motion"

const MobileNav = () => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Show the nav when scrolling down, hide when at the top
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Work", icon: Briefcase, path: "/work" },
    { name: "Gallery", icon: ImageIcon, path: "/gallery" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Search", icon: Search, path: "/search" },
    { name: "Contact", icon: Phone, path: "/contact" },
    { name: "Studio", icon: Layers, path: "/studio" },
  ]

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <nav className="flex justify-around items-center bg-background/90 backdrop-blur-md h-16 px-2 rounded-t-xl border-t border-primary/10 shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? "text-primary" : "text-muted-foreground"
              } hover:text-primary transition-colors`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-glow" : ""}`} />
              <span className="text-xs mt-1">{item.name}</span>
              {isActive && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 w-10 h-1 bg-primary rounded-t-full" />
              )}
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}

export default MobileNav
