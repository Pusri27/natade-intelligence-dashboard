"use client";

import { motion } from "framer-motion";

interface PulseIndicatorProps {
    color?: "green" | "blue" | "amber" | "red";
    size?: "sm" | "md" | "lg";
    label?: string;
}

const colorStyles = {
    green: {
        bg: "bg-emerald-500",
        ping: "bg-emerald-400",
        text: "text-emerald-500",
    },
    blue: {
        bg: "bg-indigo-500",
        ping: "bg-indigo-400",
        text: "text-indigo-500",
    },
    amber: {
        bg: "bg-amber-500",
        ping: "bg-amber-400",
        text: "text-amber-500",
    },
    red: {
        bg: "bg-red-500",
        ping: "bg-red-400",
        text: "text-red-500",
    },
};

const sizeStyles = {
    sm: { dot: "w-1.5 h-1.5", ping: "w-1.5 h-1.5" },
    md: { dot: "w-2 h-2", ping: "w-2 h-2" },
    lg: { dot: "w-3 h-3", ping: "w-3 h-3" },
};

export function PulseIndicator({
    color = "green",
    size = "md",
    label,
}: PulseIndicatorProps) {
    const colorStyle = colorStyles[color];
    const sizeStyle = sizeStyles[size];

    return (
        <div className="flex items-center gap-2">
            <span className="relative flex">
                <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorStyle.ping} ${sizeStyle.ping}`}
                />
                <span
                    className={`relative inline-flex rounded-full ${colorStyle.bg} ${sizeStyle.dot}`}
                />
            </span>
            {label && (
                <span className={`text-xs font-medium ${colorStyle.text}`}>
                    {label}
                </span>
            )}
        </div>
    );
}

// Live indicator with animation
interface LiveBadgeProps {
    isLive?: boolean;
    className?: string;
}

export function LiveBadge({ isLive = true, className = "" }: LiveBadgeProps) {
    return (
        <motion.div
            animate={isLive ? { opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        text-xs font-medium
        ${isLive
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    : "bg-zinc-800 text-zinc-500 border border-white/5"
                }
        ${className}
      `}
        >
            <PulseIndicator color={isLive ? "green" : "amber"} size="sm" />
            {isLive ? "Live" : "Paused"}
        </motion.div>
    );
}

// Status dot for tables/lists
interface StatusDotProps {
    status: "active" | "pending" | "inactive" | "error";
    className?: string;
}

const statusColors = {
    active: "bg-emerald-500",
    pending: "bg-amber-500",
    inactive: "bg-zinc-500",
    error: "bg-red-500",
};

export function StatusDot({ status, className = "" }: StatusDotProps) {
    return (
        <span className={`relative flex h-2 w-2 ${className}`}>
            {status === "active" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${statusColors[status]}`} />
        </span>
    );
}

// Glow dot for emphasis
interface GlowDotProps {
    color?: string;
    size?: number;
}

export function GlowDot({ color = "#6366f1", size = 8 }: GlowDotProps) {
    return (
        <motion.div
            animate={{
                boxShadow: [
                    `0 0 ${size}px ${color}`,
                    `0 0 ${size * 2}px ${color}`,
                    `0 0 ${size}px ${color}`,
                ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: "50%",
            }}
        />
    );
}
