"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
}

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(99, 102, 241, 0.15)",
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            {/* Spotlight effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />

            {/* Border glow */}
            <div
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
                style={{
                    opacity: isFocused ? 1 : 0,
                    background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.3), transparent 40%)`,
                }}
            />

            {children}
        </motion.div>
    );
}

// Glass card with enhanced effects
interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export function GlassCard({
    children,
    className = "",
    hover = true,
    glow = false,
}: GlassCardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`
        relative overflow-hidden rounded-2xl
        bg-zinc-900/50 backdrop-blur-xl
        border border-white/[0.08]
        ${glow ? "shadow-lg shadow-indigo-500/10" : ""}
        ${className}
      `}
        >
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

// Bento card for grid layouts
interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2;
    rowSpan?: 1 | 2;
}

export function BentoCard({
    children,
    className = "",
    colSpan = 1,
    rowSpan = 1,
}: BentoCardProps) {
    const colClasses = colSpan === 2 ? "md:col-span-2" : "";
    const rowClasses = rowSpan === 2 ? "md:row-span-2" : "";

    return (
        <SpotlightCard
            className={`
        p-6 rounded-2xl
        bg-zinc-900/80 backdrop-blur-xl
        border border-white/[0.08]
        ${colClasses} ${rowClasses} ${className}
      `}
        >
            {children}
        </SpotlightCard>
    );
}
