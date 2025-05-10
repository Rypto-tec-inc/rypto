"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ComputerAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Computer parts
    const computer = {
      // Monitor
      drawMonitor: () => {
        // Monitor frame
        ctx.fillStyle = "#222"
        ctx.fillRect(canvas.width / 2 - 120, canvas.height / 2 - 100, 240, 160)

        // Screen
        ctx.fillStyle = "#111"
        ctx.fillRect(canvas.width / 2 - 110, canvas.height / 2 - 90, 220, 140)

        // Stand
        ctx.fillStyle = "#333"
        ctx.fillRect(canvas.width / 2 - 20, canvas.height / 2 + 60, 40, 20)
        ctx.fillRect(canvas.width / 2 - 40, canvas.height / 2 + 80, 80, 10)
      },

      // Keyboard
      drawKeyboard: () => {
        // Keyboard base
        ctx.fillStyle = "#333"
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 100, 200, 60)

        // Keys
        ctx.fillStyle = "#222"
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 10; col++) {
            ctx.fillRect(canvas.width / 2 - 90 + col * 18, canvas.height / 2 + 110 + row * 12, 15, 8)
          }
        }
      },

      // Code on screen
      drawCode: (time: number) => {
        ctx.fillStyle = "#fff"
        ctx.font = "10px monospace"

        const lines = [
          "// RYPTO TEC INC - Founded 2023",
          "class RyptoTec {",
          "  constructor() {",
          "    this.founder = 'Victor Edet Coleman';",
          "    this.services = [",
          "      'Software Engineering',",
          "      '3D Animation',",
          "      'VR/AR Development'",
          "    ];",
          "  }",
          "",
          "  createInnovation() {",
          "    return this.transformIdeas();",
          "  }",
          "}",
        ]

        // Animate typing effect
        const visibleChars = Math.floor(time / 100) % 200
        let totalChars = 0

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          const lineChars = Math.min(line.length, Math.max(0, visibleChars - totalChars))
          const visibleText = line.substring(0, lineChars)

          ctx.fillText(visibleText, canvas.width / 2 - 100, canvas.height / 2 - 70 + i * 12)

          totalChars += line.length
        }
      },

      // Particles
      particles: Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 200 + 55)}, ${Math.floor(
          Math.random() * 255,
        )}, ${Math.random() * 0.5 + 0.2})`,
      })),

      drawParticles: (time: number) => {
        computer.particles.forEach((particle) => {
          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

          // Draw particle
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        })
      },
    }

    // Animation loop
    let animationId: number
    const startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now() - startTime

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      computer.drawParticles(currentTime)

      // Draw computer
      computer.drawMonitor()
      computer.drawKeyboard()

      // Draw code
      computer.drawCode(currentTime)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className="computer-animation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", height: "300px", position: "relative" }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </motion.div>
  )
}
