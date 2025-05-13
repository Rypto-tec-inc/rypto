"use client"

import { useEffect, useRef } from "react"

interface BarcodeProps {
  value: string
  width?: number
  height?: number
  className?: string
}

export default function Barcode({ value, width = 150, height = 50, className = "" }: BarcodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    // Generate barcode
    generateBarcode(ctx, value, width, height)

    // Add text
    addText(ctx, value, width, height)
  }, [value, width, height])

  // Generate simple Code 128-like barcode
  const generateBarcode = (ctx: CanvasRenderingContext2D, value: string, width: number, height: number) => {
    const barWidth = Math.max(1, Math.floor((width - 20) / (value.length * 6)))
    const startX = 10
    let x = startX

    // Draw start pattern
    drawBars(ctx, x, [1, 1, 1, 1], barWidth, height - 15)
    x += barWidth * 4

    // Draw data
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i)
      const pattern = generatePatternForChar(charCode)

      drawBars(ctx, x, pattern, barWidth, height - 15)
      x += barWidth * pattern.length
    }

    // Draw stop pattern
    drawBars(ctx, x, [1, 1, 1, 1], barWidth, height - 15)
  }

  // Draw bars based on pattern (1 = black, 0 = white)
  const drawBars = (ctx: CanvasRenderingContext2D, x: number, pattern: number[], barWidth: number, height: number) => {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === 1) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(x + i * barWidth, 5, barWidth, height)
      }
    }
  }

  // Generate a unique pattern for each character
  const generatePatternForChar = (charCode: number): number[] => {
    // This is a simplified version, not a real Code 128 implementation
    const seed = charCode % 7

    switch (seed) {
      case 0:
        return [1, 0, 1, 0, 1, 0]
      case 1:
        return [1, 1, 0, 0, 1, 0]
      case 2:
        return [1, 0, 0, 1, 1, 0]
      case 3:
        return [1, 0, 1, 1, 0, 0]
      case 4:
        return [0, 1, 1, 0, 1, 0]
      case 5:
        return [0, 1, 0, 1, 1, 0]
      case 6:
        return [0, 0, 1, 1, 1, 0]
      default:
        return [1, 0, 1, 0, 1, 0]
    }
  }

  // Add text below barcode
  const addText = (ctx: CanvasRenderingContext2D, value: string, width: number, height: number) => {
    ctx.fillStyle = "#000000"
    ctx.font = "10px monospace"
    ctx.textAlign = "center"
    ctx.fillText(value, width / 2, height - 3)
  }

  return <canvas ref={canvasRef} className={className} />
}
