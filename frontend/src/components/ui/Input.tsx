import type React from 'react'
import { twMerge } from 'tailwind-merge'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge(
        'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20',
        className
      )}
      {...props}
    />
  )
}
