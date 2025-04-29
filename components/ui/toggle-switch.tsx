"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  label?: React.ReactNode
  description?: string
}

export function ToggleSwitch({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  description,
  className,
  ...props
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      {(label || description) && (
        <div className="grid gap-0.5">
          {label && (
            <label htmlFor="toggle" className="text-sm font-medium text-foreground font-mono">
              {label}
            </label>
          )}
          {description && <p className="text-xs text-muted-foreground font-mono">{description}</p>}
        </div>
      )}
      <button
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        id="toggle"
        type="button"
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary" : "bg-gray-200",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  )
}
