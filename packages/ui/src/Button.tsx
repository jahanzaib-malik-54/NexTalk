import React from 'react'
import type { ButtonHTMLAttributes, CSSProperties } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', style, ...props }: ButtonProps) {
  const baseStyle: CSSProperties = {
    borderRadius: 9999,
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '0.85rem 1.4rem',
    minWidth: 120,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
  }

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      boxShadow: '0 16px 40px rgba(37, 99, 235, 0.18)',
    },
    secondary: {
      backgroundColor: 'rgba(148, 163, 184, 0.12)',
      color: '#e2e8f0',
      boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
    },
  }

  return (
    <button
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
      {...props}
    />
  )
}
