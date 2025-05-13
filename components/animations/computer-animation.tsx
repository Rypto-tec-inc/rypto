"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

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
      base: {
        width: canvas.width * 0.8,
        height: canvas.height * 0.6,
        x: canvas.width * 0.1,
        y: canvas.height * 0.3,
      },
      screen: {
        width: canvas.width * 0.7,
        height: canvas.height * 0.5,
        x: canvas.width * 0.15,
        y: canvas.height * 0.1,
      },
      keyboard: {
        width: canvas.width * 0.6,
        height: canvas.height * 0.1,
        x: canvas.width * 0.2,
        y: canvas.height * 0.75,
      },
    }

    // Code particles
    const particles: { x: number; y: number; size: number; speed: number; color: string }[] = []
    const createParticles = () => {
      const screenX = computer.screen.x
      const screenY = computer.screen.y
      const screenWidth = computer.screen.width
      const screenHeight = computer.screen.height

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: screenX + Math.random() * screenWidth,
          y: screenY + Math.random() * screenHeight,
          size: 1 + Math.random() * 3,
          speed: 0.5 + Math.random() * 2,
          color: `rgba(0, ${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${0.5 + Math.random() * 0.5})`,
        })
      }
    }

    createParticles()

    // Animation
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw computer base
      ctx.fillStyle = "#333"
      ctx.fillRect(computer.base.x, computer.base.y, computer.base.width, computer.base.height)

      // Draw screen
      ctx.fillStyle = "#111"
      ctx.fillRect(computer.screen.x, computer.screen.y, computer.screen.width, computer.screen.height)

      // Draw screen content (code particles)
      particles.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)

        // Move particles
        particle.y += particle.speed
        if (particle.y > computer.screen.y + computer.screen.height) {
          particle.y = computer.screen.y
          particle.x = computer.screen.x + Math.random() * computer.screen.width
        }
      })

      // Draw RYPTO TEC INC text
      ctx.fillStyle = "#00ff99"
      ctx.font = "bold 16px monospace"
      ctx.textAlign = "center"
      ctx.fillText(
        "RYPTO TEC INC",
        computer.screen.x + computer.screen.width / 2,
        computer.screen.y + computer.screen.height / 2,
      )

      // Draw keyboard
      ctx.fillStyle = "#444"
      ctx.fillRect(computer.keyboard.x, computer.keyboard.y, computer.keyboard.width, computer.keyboard.height)

      // Draw keyboard keys
      const keyWidth = computer.keyboard.width / 15
      const keyHeight = computer.keyboard.height * 0.8
      const keyY = computer.keyboard.y + computer.keyboard.height * 0.1

      ctx.fillStyle = "#222"
      for (let i = 0; i < 14; i++) {
        const keyX = computer.keyboard.x + keyWidth * (i + 0.5)
        ctx.fillRect(keyX, keyY, keyWidth * 0.8, keyHeight)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative"
    >
      <Card className="w-full h-full overflow-hidden border border-border bg-black/10 rounded-lg shadow-lg">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </Card>
    </motion.div>
  )
}
