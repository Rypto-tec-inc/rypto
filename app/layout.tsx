import type React from "react"
import type { Metadata } from "next"
import { Caveat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import TabBar from "@/components/tab-bar"
import Footer from "@/components/footer"
import { InstallPWA } from "@/components/install-pwa"
import { TourGuide } from "@/components/tour-guide"
import { CustomCursor } from "@/components/custom-cursor"
import { LoadingScreen } from "@/components/loading-screen"

// Load Caveat font for pencil-style text
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
})

export const metadata: Metadata = {
  title: "RYPTO TEC INC",
  description:
    "Building future-proof solutions in software, 3D experiences, immersive environments, and AI tailored for the African ecosystem.",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RYPTO TEC INC",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={caveat.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LoadingScreen minDisplayTime={2500} progressSpeed={4} />
          <Navbar />
          <main className="min-h-screen w-full overflow-x-hidden">
            <div className="overflow-x-hidden max-w-full">{children}</div>
          </main>
          <TabBar />
          <Footer />
          <InstallPWA />
          <TourGuide />
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
