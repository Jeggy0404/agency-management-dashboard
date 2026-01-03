import type React from "react"
import { twMerge } from 'tailwind-merge'

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80',
        className
      )}
      {...props}
    />
  )
}
