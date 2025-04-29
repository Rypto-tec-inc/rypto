"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
}

export function SectionTitle({ title, subtitle, description, align = "left", className }: SectionTitleProps) {
  const textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={cn("mb-12", textAlign[align], className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {subtitle && (
        <motion.div variants={item} className="text-sm text-muted-foreground mb-2">
          {subtitle}
        </motion.div>
      )}
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
