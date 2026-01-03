import type React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, ...props }: Props) {
  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-60 disabled:pointer-events-none',
        variant === 'primary' && 'bg-white text-[#0b1020] hover:opacity-90',
        variant === 'ghost' && 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
        className
      )}
      {...props}
    />
  )
}
