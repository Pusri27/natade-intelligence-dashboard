"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    animate?: boolean;
}

export function GradientText({
    children,
    className = "",
    animate = true,
}: GradientTextProps) {
    return (
        <span
            className={`relative inline-block ${className}`}
            style={{
                background: animate
                    ? "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #a855f7, #6366f1)"
                    : "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                backgroundSize: animate ? "200% 100%" : "100% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: animate ? "gradient-shift 3s ease infinite" : "none",
            }}
        >
            {children}
            <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
        </span>
    );
}

// Split text reveal animation
interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    type?: "chars" | "words";
}

export function SplitText({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.03,
    type = "chars",
}: SplitTextProps) {
    const items = type === "chars" ? text.split("") : text.split(" ");

    return (
        <span className={className}>
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * staggerDelay,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block"
                    style={{ transformOrigin: "bottom" }}
                >
                    {item === " " ? "\u00A0" : item}
                    {type === "words" && index < items.length - 1 && "\u00A0"}
                </motion.span>
            ))}
        </span>
    );
}

// Shimmer text effect
interface ShimmerTextProps {
    children: ReactNode;
    className?: string;
}

export function ShimmerText({ children, className = "" }: ShimmerTextProps) {
    return (
        <span
            className={`relative inline-block ${className}`}
            style={{
                background: "linear-gradient(90deg, #fafafa 0%, #a1a1aa 50%, #fafafa 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 2s ease-in-out infinite",
            }}
        >
            {children}
            <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </span>
    );
}
