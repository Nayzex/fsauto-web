'use client'

import { useInView } from '@/hooks/use-in-view'
import { Card } from './card'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  const animationClass = {
    up: 'animate-fade-in-up',
    down: 'animate-fade-in-down',
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    scale: 'animate-scale-in',
  }[direction]

  const delayClass = delay > 0 ? `animate-delay-${delay}` : ''

  return (
    <div ref={ref} className={isInView ? `${animationClass} ${delayClass}` : 'opacity-0'}>
      <Card className={`transition-smooth hover:scale-105 hover:shadow-xl hover:shadow-primary/10 ${className}`}>
        {children}
      </Card>
    </div>
  )
}
