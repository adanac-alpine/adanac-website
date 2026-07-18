'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  opacity?: number
  rotate?: number
  origin?: string
  className?: string
  once?: boolean
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  y = 20, 
  x = 0, 
  scale = 0.9,
  opacity = 0,
  rotate = 0,
  origin = 'center',
  className = '',
  once = true
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity, x, y, scale, rotate, origin }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] as const }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerChildrenProps {
  children: ReactNode
  stagger?: number
  delay?: number
  duration?: number
  y?: number
  className?: string
  once?: boolean
}

export function StaggerChildren({ 
  children, 
  stagger = 0.1, 
  delay = 0,
  duration = 0.5,
  y = 20,
  className = '',
  once = true
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  opacity?: number
  rotate?: number
  className?: string
}

export function StaggerItem({ 
  children, 
  delay = 0,
  duration = 0.5,
  y = 20,
  x = 0,
  scale = 0.9,
  opacity = 0,
  rotate = 0,
  className = ''
}: StaggerItemProps) {
  return (
    <motion.div
      initial={{ opacity, x, y, scale, rotate }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] as const }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}
