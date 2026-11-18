'use client'

import { MotionConfig } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Framer Motion animates via JS, so the `prefers-reduced-motion` rules in globals.css never reach it.
 * `reducedMotion="user"` makes every motion component drop transform/layout animation when the OS
 * asks for reduced motion, while opacity fades still run so content always reaches its final state.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
