"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SocialSidebar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={20} />, url: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter size={20} />, url: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram size={20} />, url: "https://instagram.com" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, url: "https://linkedin.com" },
    { name: "GitHub", icon: <Github size={20} />, url: "https://github.com" },
    { name: "YouTube", icon: <Youtube size={20} />, url: "https://youtube.com" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          exit={{ x: -100 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center",
            "bg-background border border-border",
            "transition-all duration-300 ease-in-out",
            isExpanded ? "w-[200px]" : "w-[50px]",
          )}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="p-2 w-full text-center border-b border-border flex items-center justify-center">
            <Share2 className="h-4 w-4 mr-2" />
            <span className={cn("text-xs font-medium", isExpanded ? "block" : "hidden")}>Connect With Us</span>
          </div>
          <div className="py-2 w-full">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center px-3 py-2 hover:bg-muted transition-colors",
                  "text-muted-foreground hover:text-primary",
                )}
                whileHover={{ scale: 1.05, x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="mr-3">{link.icon}</span>
                {isExpanded && <span className="text-sm">{link.name}</span>}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
