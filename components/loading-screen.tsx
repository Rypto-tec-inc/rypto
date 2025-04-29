"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  /**
   * Minimum time to show the loading screen in milliseconds
   */
  minDisplayTime?: number
  /**
   * Additional delay before fading out in milliseconds
   */
  fadeDelay?: number
  /**
   * Speed of the progress bar (1-10, where 10 is fastest)
   */
  progressSpeed?: number
}

export function LoadingScreen({
  minDisplayTime = 2500,
  fadeDelay = 500,
  progressSpeed = 3,
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Handle loading state and progress bar
  useEffect(() => {
    // Timer to control minimum display time
    const displayTimer = setTimeout(() => {
      setIsLoading(false)
    }, minDisplayTime)

    // Interval to update progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Slow down progress as it approaches 100%
        const increment = Math.max(1, Math.floor((100 - prev) / (20 / progressSpeed)))
        const newValue = prev + increment
        return newValue >= 100 ? 100 : newValue
      })
    }, 50)

    return () => {
      clearTimeout(displayTimer)
      clearInterval(interval)
    }
  }, [minDisplayTime, progressSpeed])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-background/95 via-background to-background/95 backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              delay: fadeDelay / 1000, 
              ease: "easeInOut" 
            }
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Logo container with animation */}
            <motion.div
              className="relative w-36 h-36"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Animated circuit lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/20"
                  strokeWidth="2"
                  strokeDasharray="502"
                  initial={{ strokeDashoffset: 502 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />
                
                <motion.circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/30"
                  strokeWidth="1"
                  strokeDasharray="377"
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                />
                
                {/* Circuit paths */}
                <motion.path
                  d="M100,20 L100,0 M180,100 L200,100 M100,180 L100,200 M20,100 L0,100"
                  stroke="currentColor"
                  className="text-primary/40"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                />

                <motion.path
                  d="M140,40 L160,20 M160,160 L140,140 M40,140 L20,160 M40,40 L20,20"
                  stroke="currentColor"
                  className="text-primary/40"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                />
              </svg>
              
              {/* Logo image */}
              <Image
                src="/rypto-logo.png"
                alt="RYPTO TEC INC Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1.5 bg-background/30 rounded-full overflow-hidden mt-8 mb-4 border border-primary/20">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/70 to-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Loading text with animated dots */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 mb-2">
                RYPTO TECH
              </h2>
              
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground font-mono">INITIALIZING</span>
                <motion.div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{
                        y: [0, -4, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <motion.p 
                className="text-xs text-muted-foreground/70 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {progress}% COMPLETE
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
