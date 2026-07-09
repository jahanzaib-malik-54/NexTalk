import React from 'react'
import type { HTMLAttributes, CSSProperties } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ style, ...props }: CardProps) {
  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.96)',
        border: '1px solid rgba(148, 163, 184, 0.12)',
        borderRadius: 24,
        boxShadow: '0 30px 90px rgba(15, 23, 42, 0.45)',
        padding: 32,
        width: '100%',
        maxWidth: 480,
        ...style,
      }}
      {...props}
    />
  )
}
