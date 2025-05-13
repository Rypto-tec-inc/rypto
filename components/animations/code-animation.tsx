"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function CodeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const codeLines = [
    "// RYPTO TEC INC - Innovation through code",
    "import { future } from 'emerging-tech';",
    "import { AI, VR, Blockchain } from 'rypto-solutions';",
    "",
    "function createInnovation() {",
    "  const nextGenTech = new Technology({",
    "    ai: true,",
    "    vr: true,",
    "    blockchain: true,",
    "  });",
    "",
    "  return nextGenTech.build({",
    "    clientFocused: true,",
    "    scalable: true,",
    "    innovative: true,",
    "  });",
    "}",
    "",
    "// Building the future at RYPTO TEC INC",
    "export default createInnovation();",
  ]

  // Function to apply syntax highlighting
  const highlightSyntax = (text: string) => {
    return text
      .replace(
        /import|export|function|return|const|new|default|from/g,
        (match) => `<span style="color: #C678DD;">${match}</span>`,
      )
      .replace(/true|false/g, (match) => `<span style="color: #D19A66;">${match}</span>`)
      .replace(/'[^']*'/g, (match) => `<span style="color: #98C379;">${match}</span>`)
      .replace(/\/\/.*$/g, (match) => `<span style="color: #5C6370;">${match}</span>`)
      .replace(/\{|\}|$$|$$/g, (match) => `<span style="color: #ABB2BF;">${match}</span>`)
  }

  // Clean up function to clear all intervals and timeouts
  const cleanUp = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }
  }

  // Start the typing animation
  const startTyping = () => {
    cleanUp()

    if (!textRef.current) return

    // Reset state
    textRef.current.innerHTML = ""
    lineIndexRef.current = 0
    charIndexRef.current = 0

    const typeNextChar = () => {
      if (!textRef.current) return

      // If we've reached the end of all lines
      if (lineIndexRef.current >= codeLines.length) {
        cleanUp()
        // Reset after a delay
        resetTimeoutRef.current = setTimeout(() => {
          if (textRef.current) {
            textRef.current.innerHTML = ""
            lineIndexRef.current = 0
            charIndexRef.current = 0
            startTyping()
          }
        }, 3000)
        return
      }

      const currentLine = codeLines[lineIndexRef.current]

      // If we've reached the end of the current line
      if (charIndexRef.current >= currentLine.length) {
        textRef.current.innerHTML += "<br>"
        lineIndexRef.current++
        charIndexRef.current = 0
        return
      }

      // Type the next character
      const char = currentLine[charIndexRef.current]
      const currentText = textRef.current.innerHTML
      const lineWithoutTags = currentLine.substring(0, charIndexRef.current + 1)
      const highlightedLine = highlightSyntax(lineWithoutTags)

      // Replace the current line with the highlighted version
      const lines = currentText.split("<br>")
      lines[lineIndexRef.current] = highlightedLine
      textRef.current.innerHTML = lines.join("<br>")

      charIndexRef.current++

      // Scroll to bottom
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }

    // Start the typing interval
    typingIntervalRef.current = setInterval(typeNextChar, 50)
  }

  // Start typing when component mounts
  useEffect(() => {
    startTyping()

    // Clean up on unmount
    return cleanUp
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border border-border bg-black/90 p-4 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-2 text-xs text-gray-400">code-editor.js</div>
        </div>
        <div
          ref={containerRef}
          className="font-mono text-sm text-green-400 bg-black overflow-auto h-[300px] p-2"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <div ref={textRef}></div>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-green-400 ml-1"
          ></motion.span>
        </div>
      </Card>
    </motion.div>
  )
}
