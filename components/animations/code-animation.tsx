"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function CodeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create code lines
    const codeLines = [
      "// RYPTO TEC INC - Innovative Technology Solutions",
      "import { VR, AR, Animation, Software } from '@rypto-tec/core';",
      "",
      "export class RyptoTecProject {",
      "  private founder: string = 'Victor Edet Coleman';",
      "  private foundingYear: number = 2023;",
      "  private technologies: string[] = [",
      "    'Virtual Reality',",
      "    'Augmented Reality',",
      "    '3D Animation',",
      "    'Software Engineering',",
      "    'Web Development'",
      "  ];",
      "",
      "  constructor(private projectName: string) {",
      "    console.log(`Initializing ${projectName} project...`);",
      "    this.setupEnvironment();",
      "  }",
      "",
      "  private setupEnvironment(): void {",
      "    // Initialize core technologies",
      "    const vrEngine = new VR.Engine();",
      "    const arEngine = new AR.Engine();",
      "    const animationSystem = new Animation.System();",
      "    const softwareStack = new Software.Stack();",
      "",
      "    // Configure project settings",
      "    this.configureProject();",
      "  }",
      "",
      "  private configureProject(): void {",
      "    // Apply RYPTO TEC innovation principles",
      "    this.applyInnovationPrinciples();",
      "  }",
      "",
      "  private applyInnovationPrinciples(): void {",
      "    // Transform ideas into impactful solutions",
      "    console.log('Transforming ideas into impactful solutions...');",
      "  }",
      "",
      "  public start(): void {",
      "    console.log(`${this.projectName} is now running!`);",
      "    console.log(`Created by ${this.founder} in ${this.foundingYear}`);",
      "  }",
      "}",
      "",
      "// Initialize a new RYPTO TEC project",
      "const project = new RyptoTecProject('Immersive Experience');",
      "project.start();",
    ]

    // Clear any existing content
    container.innerHTML = ""

    // Create code elements
    codeLines.forEach((line, index) => {
      const lineEl = document.createElement("div")
      lineEl.className = "code-line"
      lineEl.style.opacity = "0"
      lineEl.style.transform = "translateY(10px)"
      lineEl.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`

      // Add line number
      const lineNum = document.createElement("span")
      lineNum.className = "line-number"
      lineNum.textContent = `${index + 1}`
      lineEl.appendChild(lineNum)

      // Add code content with syntax highlighting
      const codeContent = document.createElement("span")
      codeContent.className = "code-content"

      // Simple syntax highlighting
      const highlightedLine = line
        .replace(
          /class|private|public|constructor|export|import|const|let|var|function|return|if|this|void|number|string/g,
          (match) => `<span class="keyword">${match}</span>`,
        )
        .replace(
          /VR|AR|Animation|Software|Engine|System|Stack|RyptoTecProject|setupEnvironment|configureProject|applyInnovationPrinciples|start/g,
          (match) => `<span class="function">${match}</span>`,
        )
        .replace(/'[^']*'/g, (match) => `<span class="string">${match}</span>`)
        .replace(/"[^"]*"/g, (match) => `<span class="string">${match}</span>`)
        .replace(/\/\/.*$/g, (match) => `<span class="comment">${match}</span>`)
        .replace(/@rypto-tec\/core/g, (match) => `<span class="module">${match}</span>`)
        .replace(/\{|\}|$$|$$|\[|\]/g, (match) => `<span class="bracket">${match}</span>`)

      codeContent.innerHTML = highlightedLine || "&nbsp;"
      lineEl.appendChild(codeContent)

      container.appendChild(lineEl)

      // Trigger animation
      setTimeout(() => {
        lineEl.style.opacity = "1"
        lineEl.style.transform = "translateY(0)"
      }, 100)
    })

    // Add cursor
    const cursor = document.createElement("div")
    cursor.className = "cursor"
    container.appendChild(cursor)

    // Animate cursor
    let cursorLine = 0
    let cursorPosition = 0

    const animateCursor = () => {
      const lines = container.querySelectorAll(".code-line")
      if (lines.length === 0) return

      // Move cursor to next position
      if (cursorPosition >= (codeLines[cursorLine]?.length || 0)) {
        cursorLine = (cursorLine + 1) % codeLines.length
        cursorPosition = 0
      } else {
        cursorPosition++
      }

      // Position cursor
      const currentLine = lines[cursorLine] as HTMLElement
      if (currentLine) {
        const codeContent = currentLine.querySelector(".code-content") as HTMLElement
        if (codeContent) {
          const lineRect = currentLine.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()

          cursor.style.top = `${lineRect.top - containerRect.top}px`
          cursor.style.left = `${lineRect.left - containerRect.left + codeContent.offsetLeft + cursorPosition * 8}px`
        }
      }
    }

    const cursorInterval = setInterval(animateCursor, 200)

    return () => {
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <motion.div
      className="code-animation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={containerRef}
        className="code-editor"
        style={{
          backgroundColor: "rgba(20, 20, 20, 0.95)",
          borderRadius: "8px",
          padding: "16px",
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: "1.5",
          color: "#ffffff",
          overflow: "hidden",
          position: "relative",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      />
      <style jsx global>{`
        .code-line {
          display: flex;
          white-space: pre;
        }
        .line-number {
          opacity: 0.5;
          min-width: 2em;
          padding-right: 1em;
          text-align: right;
          user-select: none;
        }
        .code-content {
          flex: 1;
        }
        .keyword {
          color: #569CD6;
        }
        .function {
          color: #DCDCAA;
        }
        .string {
          color: #CE9178;
        }
        .comment {
          color: #6A9955;
        }
        .module {
          color: #9CDCFE;
        }
        .bracket {
          color: #D4D4D4;
        }
        .cursor {
          position: absolute;
          width: 2px;
          height: 18px;
          background-color: #fff;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  )
}
