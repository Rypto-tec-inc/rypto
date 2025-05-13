"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function AnimatedSvg() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const isDark = theme === "dark"

    // Update colors based on theme
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll("path")
      const circles = svgRef.current.querySelectorAll("circle")

      paths.forEach((path) => {
        path.setAttribute("stroke", isDark ? "#00ff99" : "#0070f3")
      })

      circles.forEach((circle) => {
        circle.setAttribute("fill", isDark ? "#00ff99" : "#0070f3")
      })
    }
  }, [theme])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg ref={svgRef} viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Grid background */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Central node */}
        <motion.circle
          cx="400"
          cy="300"
          r="20"
          fill="#00ff99"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Connecting nodes */}
        {[
          { x: 200, y: 150, delay: 0.4 },
          { x: 600, y: 150, delay: 0.6 },
          { x: 200, y: 450, delay: 0.8 },
          { x: 600, y: 450, delay: 1.0 },
          { x: 300, y: 200, delay: 1.2 },
          { x: 500, y: 200, delay: 1.4 },
          { x: 300, y: 400, delay: 1.6 },
          { x: 500, y: 400, delay: 1.8 },
        ].map((node, index) => (
          <motion.g key={index}>
            <motion.path
              d={`M 400 300 L ${node.x} ${node.y}`}
              stroke="#00ff99"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
              initial={{ strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1, delay: node.delay }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill="#00ff99"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: node.delay + 0.5 }}
            />
          </motion.g>
        ))}

        {/* Animated data particles */}
        {[...Array(8)].map((_, index) => {
          const node = [
            { x: 200, y: 150 },
            { x: 600, y: 150 },
            { x: 200, y: 450 },
            { x: 600, y: 450 },
            { x: 300, y: 200 },
            { x: 500, y: 200 },
            { x: 300, y: 400 },
            { x: 500, y: 400 },
          ][index]

          return (
            <motion.circle
              key={`particle-${index}`}
              cx="400"
              cy="300"
              r="4"
              fill="#ffffff"
              initial={{ cx: 400, cy: 300 }}
              animate={{
                cx: [400, node.x, 400],
                cy: [300, node.y, 300],
              }}
              transition={{
                duration: 4,
                delay: index * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            />
          )
        })}

        {/* RYPTO TEC text */}
        <motion.text
          x="400"
          y="300"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontFamily="monospace"
          fontSize="16"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          RYPTO TEC
        </motion.text>
      </svg>
    </motion.div>
  )
}
