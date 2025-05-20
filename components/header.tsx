"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { useSearch } from "@/app/context/search-context"
import SearchBar from "@/components/search-bar"

const mainNavItems = [
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/pricing" },
  { name: "Work", path: "/work" },
  {
    name: "Company",
    path: "/company",
    children: [
      { name: "About Us", path: "/about" },
      { name: "Team", path: "/team" },
      { name: "Partners", path: "/partners" },
    ],
  },
  { name: "Gallery", path: "/gallery" },
  { name: "Studio", path: "/studio" },
  { name: "Contact", path: "/contact" },
]

export default function Header({ isLoading = false, showDuringLoading = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { searchQuery, setSearchQuery, handleSearch } = useSearch()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
    }
  }

  const headerBg = scrolled ? "glass-nav" : "bg-transparent"
  const headerStyle = isLoading && !showDuringLoading ? "opacity-0 pointer-events-none" : "opacity-100"

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${headerBg} ${headerStyle}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between border-b border-border/10">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-10" title="RYPTO TEC INC">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/rypto-logo.png"
                  alt="RYPTO TEC INC Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </motion.div>
              <span className="font-bold hidden sm:inline-block">RYPTO TEC</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map((item, index) =>
                item.children ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      className={cn(
                        "text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors",
                        (hoveredItem === item.name || item.children?.some((child) => pathname === child.path)) &&
                          "text-primary",
                        pathname === item.path && "text-primary",
                      )}
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3 ml-0.5 opacity-70" />
                    </button>

                    <AnimatePresence>
                      {hoveredItem === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 w-48 bg-background rounded-none shadow-lg z-50 border border-border"
                        >
                          <div className="py-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.path}
                                className={cn(
                                  "block px-4 py-2 text-sm hover:bg-muted transition-colors",
                                  pathname === child.path ? "text-primary" : "text-foreground",
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={cn(
                      "text-sm font-medium hover:text-primary transition-colors",
                      pathname === item.path && "text-primary",
                    )}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar className="hidden md:block" />
            <ModeToggle />

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(true)} title="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <div className="container flex h-full flex-col overflow-y-auto">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2" title="RYPTO TEC INC">
                  <Image
                    src="/images/rypto-logo.png"
                    alt="RYPTO TEC INC Logo"
                    width={40}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                  <span className="font-bold">RYPTO TEC</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} title="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <SearchBar className="mb-6" />

              <nav className="flex flex-col space-y-6 py-8">
                {mainNavItems.map((item) =>
                  item.children ? (
                    <div key={item.name} className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground">{item.name}</div>
                      <div className="space-y-3 pl-4 border-l border-border">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.path}
                            className={cn(
                              "block text-sm",
                              pathname === child.path
                                ? "text-primary font-medium"
                                : "text-foreground hover:text-primary transition-colors",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={cn(
                        "text-sm font-medium",
                        pathname === item.path
                          ? "text-primary"
                          : "text-foreground hover:text-primary transition-colors",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ),
                )}
              </nav>

              <div className="mt-auto pb-8 border-t border-border pt-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Theme</div>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
