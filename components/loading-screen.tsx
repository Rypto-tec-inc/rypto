"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Header from "@/components/header"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#111] flex flex-col"
        >
          <div className="relative z-10">
            <Header isLoading={true} />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RYPTO_LOGO2-removebg-preview-BJYDfhGKPxgwQEz4Mx41rq9gblvcDA.png"
                  alt="RYPTO TEC INC Logo"
                  width={150}
                  height={60}
                  className="h-16 w-auto"
                />
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-1 bg-primary rounded-full"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                Transforming Ideas Into Reality
              </motion.p>
            </div>
          </div>

          <div className="absolute inset-0 z-0">
            <div className="network-animation">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="network-node"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
