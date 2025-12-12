"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

// Parallax background that moves slower than content
interface ParallaxBackgroundProps {
    children: ReactNode;
    className?: string;
}

export function ParallaxBackground({ children, className = "" }: ParallaxBackgroundProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
        <div ref={ref} className="relative overflow-hidden">
            <motion.div
                style={{ y, opacity }}
                className={`absolute inset-0 ${className}`}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Floating element with parallax effect
interface FloatingElementProps {
    children: ReactNode;
    amplitude?: number;
    duration?: number;
    delay?: number;
    className?: string;
}

export function FloatingElement({
    children,
    amplitude = 20,
    duration = 6,
    delay = 0,
    className = "",
}: FloatingElementProps) {
    return (
        <motion.div
            animate={{
                y: [-amplitude, amplitude, -amplitude],
                rotate: [-2, 2, -2],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
