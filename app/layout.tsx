import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SocialSidebar from "@/components/social-sidebar"
import LoadingScreen from "@/components/loading-screen"
import ScreenshotPrevention from "@/components/screenshot-prevention"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RYPTO TEC INC",
  description:
    "A forward-thinking technology company founded in 2023 by Victor Edet Coleman, specializing in software engineering, animation, and emerging technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ScreenshotPrevention />
          <LoadingScreen />
          <div className="flex min-h-screen flex-col">
            <Header />
            <SocialSidebar />
            <main className="flex-1 px-4 md:px-8 lg:px-12">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
