"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/rypto-logo.png"
                alt="RYPTO TEC Logo"
                width={40}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <span className="font-bold text-lg">RYPTO TEC</span>
            </div>
            <p className="text-muted-foreground">Engineering Africa's Digital Future.</p>
            <p className="text-sm text-muted-foreground">
              An independent software and innovation lab founded in 2023 by a team of young, visionary engineers in West
              Africa.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/ryptotec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com/ryptotec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/company/ryptotec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/ryptotec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Work", path: "/work" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { name: "Software Development", path: "/services#software" },
                { name: "3D Animation", path: "/services#animation" },
                { name: "VR/AR Development", path: "/services#vr-ar" },
                { name: "AI Integration", path: "/services#ai" },
                { name: "Education & Training", path: "/services#education" },
              ].map((service) => (
                <li key={service.name}>
                  <Link href={service.path} className="text-muted-foreground hover:text-primary transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-muted-foreground">Monrovia, Liberia</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <a
                  href="mailto:rypto2099@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  rypto2099@gmail.com
                </a>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <a href="tel:+2310776800064" className="text-muted-foreground hover:text-primary transition-colors">
                  +231 0776800064
                </a>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} RYPTO TEC INC. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
