"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CircuitAnimationProps {
  className?: string
  color?: string
  density?: number
}

// Define custom types outside the component to avoid naming conflicts
interface CircuitNode {
  x: number
  y: number
  size: number
  pulseSize: number
  pulseOpacity: number
  isPulsing: boolean
  pulseInterval: number
  lastPulseTime: number
  draw: (ctx: CanvasRenderingContext2D, color: string) => void
  update: (time: number) => void
}

interface CircuitConnection {
  nodeA: CircuitNode
  nodeB: CircuitNode
  progress: number
  speed: number
  active: boolean
  width: number
  draw: (ctx: CanvasRenderingContext2D, color: string) => void
  update: () => void
}

export function CircuitAnimation({ className, color = "#4ADE80", density = 30 }: CircuitAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let nodes: CircuitNode[] = []
    let connections: CircuitConnection[] = []

    // Create a CircuitNode
    function createNode(x: number, y: number): CircuitNode {
      return {
        x,
        y,
        size: Math.random() * 2 + 1,
        pulseSize: 0,
        pulseOpacity: 0,
        isPulsing: false,
        pulseInterval: Math.random() * 5000 + 2000,
        lastPulseTime: Date.now() - Math.random() * 5000,

        draw(ctx: CanvasRenderingContext2D, color: string) {
          // Draw node
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()

          // Draw pulse if active
          if (this.isPulsing) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.pulseSize, 0, Math.PI * 2)
            ctx.strokeStyle = `${color}${Math.floor(this.pulseOpacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        },

        update(time: number) {
          // Check if it's time to pulse
          if (time - this.lastPulseTime > this.pulseInterval) {
            this.isPulsing = true
            this.pulseSize = 0
            this.pulseOpacity = 0.5
            this.lastPulseTime = time
          }

          // Update pulse animation
          if (this.isPulsing) {
            this.pulseSize += 0.5
            this.pulseOpacity -= 0.01

            if (this.pulseOpacity <= 0) {
              this.isPulsing = false
            }
          }
        },
      }
    }

    // Create a CircuitConnection
    function createConnection(nodeA: CircuitNode, nodeB: CircuitNode): CircuitConnection {
      return {
        nodeA,
        nodeB,
        progress: 0,
        speed: Math.random() * 0.01 + 0.005,
        active: Math.random() > 0.7,
        width: Math.random() * 1 + 0.5,

        draw(ctx: CanvasRenderingContext2D, color: string) {
          if (!this.active) return

          const dx = this.nodeB.x - this.nodeA.x
          const dy = this.nodeB.y - this.nodeA.y

          // Calculate current position along the line
          const x = this.nodeA.x + dx * this.progress
          const y = this.nodeA.y + dy * this.progress

          // Draw the connection line
          ctx.beginPath()
          ctx.moveTo(this.nodeA.x, this.nodeA.y)
          ctx.lineTo(x, y)
          ctx.strokeStyle = color
          ctx.lineWidth = this.width
          ctx.stroke()
        },

        update() {
          if (this.active) {
            this.progress += this.speed
            if (this.progress >= 1) {
              this.progress = 0
              this.active = Math.random() > 0.3
            }
          } else if (Math.random() > 0.995) {
            this.active = true
            this.progress = 0
          }
        },
      }
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initializeNodes()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Initialize nodes
    function initializeNodes() {
      nodes = []
      connections = []

      // Create nodes
      const nodeCount = Math.floor((canvas.width * canvas.height) / (10000 / density))
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        nodes.push(createNode(x, y))
      }

      // Create connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            connections.push(createConnection(nodes[i], nodes[j]))
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentTime = Date.now()

      // Update and draw connections
      connections.forEach((connection) => {
        connection.update()
        connection.draw(ctx, color)
      })

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update(currentTime)
        node.draw(ctx, color)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, density])

  return (
    <motion.canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
