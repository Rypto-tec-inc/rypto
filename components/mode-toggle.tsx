"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import { Sun, Moon } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
        <span className="text-sm font-medium font-mono">THEME</span>
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2" data-tour="theme-toggle">
      <ToggleSwitch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        label={
          <div className="flex items-center gap-2">
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only md:not-sr-only">{isDark ? "DARK" : "LIGHT"}</span>
          </div>
        }
      />
    </div>
  )
}
