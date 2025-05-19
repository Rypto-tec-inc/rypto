import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import IntegratedAiSuggestions from "@/components/integrated-ai-suggestions"
import { FloatingElements } from "@/components/scroll-animations"
import MobileNav from "@/components/mobile-nav"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RYPTO TEC INC",
  description: "Innovative Technology Solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <MobileNav />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
