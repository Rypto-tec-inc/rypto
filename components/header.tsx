"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Teams", path: "/teams" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/work" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Studio", path: "/studio" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" title="RYPTO TEC INC">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RYPTO_LOGO2-removebg-preview-BJYDfhGKPxgwQEz4Mx41rq9gblvcDA.png"
                alt="RYPTO TEC INC Logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </motion.div>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
                title={item.name}
              >
                {item.name}
              </Link>
            ))}
            <ModeToggle />
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)} title="Menu">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 z-50 bg-background"
        >
          <div className="container flex h-full flex-col overflow-y-auto">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2" title="RYPTO TEC INC">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RYPTO_LOGO2-removebg-preview-BJYDfhGKPxgwQEz4Mx41rq9gblvcDA.png"
                  alt="RYPTO TEC INC Logo"
                  width={100}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} title="Close menu">
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col space-y-6 py-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                  title={item.name}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <ModeToggle />
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
