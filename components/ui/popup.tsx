"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PopupProps {
  trigger?: ReactNode
  title: string
  children: ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function Popup({ trigger, title, children, isOpen: controlledIsOpen, onOpenChange, size = "md" }: PopupProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false)

  // Handle controlled state
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen)
    }
  }, [controlledIsOpen])

  const handleOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open)
    } else {
      setIsOpen(open)
    }
  }

  // Size mapping
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }

  return (
    <>
      {trigger && (
        <div onClick={() => handleOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => handleOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative z-50 w-full ${sizeClasses[size]} bg-card p-6 shadow-lg rounded-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <Button variant="ghost" size="icon" onClick={() => handleOpen(false)} className="h-8 w-8" title="Close">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div className="max-h-[calc(80vh-8rem)] overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
