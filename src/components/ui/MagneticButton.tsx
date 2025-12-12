"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

export function MagneticButton({
    children,
    className = "",
    strength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * strength;
        const y = (clientY - (top + height / 2)) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className={className}
        >
            {children}
        </motion.button>
    );
}

// Haptic-like button with press effect
interface HapticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost";
}

export function HapticButton({
    children,
    className = "",
    onClick,
    variant = "primary",
}: HapticButtonProps) {
    const baseStyles = "relative overflow-hidden transition-all duration-200 font-medium";

    const variants = {
        primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500",
        secondary: "bg-zinc-800 text-white border border-white/10 hover:bg-zinc-700",
        ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
    };

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {/* Ripple effect container */}
            <span className="relative z-10">{children}</span>

            {/* Shine effect */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                whileHover={{ translateX: "100%" }}
                transition={{ duration: 0.5 }}
            />
        </motion.button>
    );
}

// Link wrapper with magnetic effect
interface MagneticLinkProps {
    children: ReactNode;
    href: string;
    className?: string;
}

export function MagneticLink({ children, href, className = "" }: MagneticLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * 0.2;
        const y = (clientY - (top + height / 2)) * 0.2;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className={className}
        >
            {children}
        </motion.a>
    );
}
