"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Projects</h1>
          <p className="text-xl text-muted-foreground">
            Explore our innovative projects that showcase our expertise in software engineering, animation, and emerging
            technologies.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid gap-8 md:grid-cols-2"
          >
            <div className="space-y-4">
              <div className="section-number">01</div>
              <h2 className="text-2xl font-bold">Unlocking the opportunity</h2>
              <p className="text-muted-foreground">Business strategy</p>
            </div>
            <div className="space-y-4">
              <p>
                Our projects always begin by gaining a deep understanding of your business goals, customer needs,
                applicable technologies, the surrounding space, and team structure. We meet in person with key
                stakeholders—executives, engineers, data scientists, product owners—to immerse ourselves in your world.
              </p>
              <p>
                The qualitative inquiry unlocks insights, opportunities, and solutions businesses typically haven't
                considered, and resulting personas ensure we empathize with the people we're designing for.
              </p>
              <div className="pt-4">
                <h3 className="font-medium">OUTPUTS INCLUDE</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-5 w-5 shrink-0" />
                    <span>Insights from qualitative and quantitative user research</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-5 w-5 shrink-0" />
                    <span>Personas for current and future users</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-5 w-5 shrink-0" />
                    <span>Data-driven hypothesis on where to focus</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Button asChild variant="outline">
              <Link href="/contact">
                Contact us to learn more about our projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
