"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

export default function BackgroundAnimation() {
  const { theme } = useTheme()
  const { scrollY } = useScroll()
  const ref = useRef(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Generate random particles
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      // Generate random particles
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        velocity: Math.random() * 0.5 + 0.1,
      }))

      setParticles(newParticles)

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Create motion values for grid pattern
  const gridOpacity = useTransform(scrollY, [0, 500], [0.03, 0.08])
  const gridScale = useTransform(scrollY, [0, 1000], [1, 1.2])
  const gridRotation = useTransform(scrollY, [0, 1000], [0, 5])

  // Create motion values for particles
  const particleOpacity = useTransform(scrollY, [0, 500], [0.2, 0.5])

  return (
    <>
      {/* Grid pattern */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
        style={{
          opacity: gridOpacity,
        }}
      >
        <motion.div
          className="absolute inset-0 grid-pattern"
          style={{
            scale: gridScale,
            rotate: gridRotation,
          }}
        />
      </motion.div>

      {/* Particles */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          opacity: particleOpacity,
        }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              x: particle.x,
              y: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
            }}
            animate={{
              y: [particle.y, particle.y - 100 * particle.velocity, particle.y],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 10 + particle.velocity * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle at 50% 50%, rgba(32, 32, 32, 0) 0%, rgba(32, 32, 32, 0.8) 100%)"
              : "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%)",
        }}
      />
    </>
  )
}
