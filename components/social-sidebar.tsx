"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(true) // Default to open

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      href: "https://web.facebook.com/profile.php?id=61572485499528",
      color: "#1877F2",
    },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", color: "#1DA1F2" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", color: "#E4405F" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", color: "#0A66C2" },
    { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "https://github.com", color: "#181717" },
    { name: "YouTube", icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", color: "#FF0000" },
  ]

  return (
    <div className="fixed left-0 top-1/2 z-40 -translate-y-1/2">
      <motion.div
        initial={{ x: isOpen ? 0 : -60 }}
        animate={{ x: isOpen ? 0 : -60 }}
        transition={{ duration: 0.3 }}
        className="flex"
      >
        <div className="flex flex-col space-y-4 bg-card p-3 shadow-lg rounded-r-lg">
          <TooltipProvider>
            {socialLinks.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                    title={`Visit our ${link.name} page`}
                    style={{ color: link.color }}
                  >
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Visit our {link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="h-10 w-6 rounded-l-none"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Hide social links" : "Show social links"}
        >
          <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          <span className="sr-only">{isOpen ? "Hide social links" : "Show social links"}</span>
        </Button>
      </motion.div>
    </div>
  )
}
