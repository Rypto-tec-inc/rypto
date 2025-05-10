import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">RYPTO TEC INC</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              A forward-thinking technology company specializing in software engineering, animation, and emerging
              technologies.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/studio"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Studio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pipeline"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pipeline
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newsletter"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Stay Connected</h4>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} RYPTO TEC INC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
