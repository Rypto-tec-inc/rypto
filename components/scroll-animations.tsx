"use client"

import React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"

interface ScrollAnimationProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export function FadeInOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { y: 40, opacity: 0 }
      case "down":
        return { y: -40, opacity: 0 }
      case "left":
        return { x: 40, opacity: 0 }
      case "right":
        return { x: -40, opacity: 0 }
      default:
        return { y: 40, opacity: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getDirectionValues()}
      animate={isInView ? { y: 0, x: 0, opacity: 1 } : getDirectionValues()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxOnScroll({
  children,
  className = "",
  speed = 0.5,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  )
}

export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElements() {
  const [elements, setElements] = React.useState<Array<{
    width: number;
    height: number;
    left: string;
    top: string;
    animateY: number;
    animateX: number;
    scale: number;
    duration: number;
  }>>([]);

  React.useEffect(() => {
    const newElements = Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animateY: Math.random() * 30 - 15,
      animateX: Math.random() * 30 - 15,
      scale: Math.random() * 0.2 + 0.9,
      duration: Math.random() * 5 + 5,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
          style={{
            width: element.width,
            height: element.height,
            left: element.left,
            top: element.top,
          }}
          animate={{
            y: [0, element.animateY],
            x: [0, element.animateX],
            scale: [1, element.scale],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
    </div>
  )
}

// Add this to globals.css:
// .bg-grid-pattern {
//   background-size: 50px 50px;
//   background-image:
//     linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
//     linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
// }
