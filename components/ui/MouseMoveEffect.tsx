'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function MouseMoveEffect() {
    const [mounted, setMounted] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth the movement
    const springConfig = { damping: 25, stiffness: 700 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        setMounted(true)
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 200)
            mouseY.set(e.clientY - 200)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            <motion.div
                style={{
                    x,
                    y,
                }}
                className="absolute w-[400px] h-[400px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-[100px]"
            />
        </div>
    )
}
