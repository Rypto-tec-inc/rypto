"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Delay showing content to allow exit animation to complete
      const timeout = setTimeout(() => {
        setShowContent(true)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Show header during loading */}
          <div className="w-full">
            <Header />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Animated logo */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M30,35 L70,35 L70,65 L30,65 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.path
                    d="M40,45 L60,45 L60,55 L40,55 Z"
                    fill="currentColor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  />
                </svg>

                {/* Pulsing effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  initial={{ opacity: 0.2, scale: 0.8 }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-2">RYPTO TEC INC</h1>
              <p className="text-muted-foreground mb-8">Engineering Africa's Digital Future</p>

              {/* Progress bar */}
              <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}% -{" "}
                {progress < 30
                  ? "Initializing..."
                  : progress < 60
                    ? "Loading assets..."
                    : progress < 90
                      ? "Preparing interface..."
                      : "Almost ready..."}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
