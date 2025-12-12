"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    DollarSign,
    ShoppingCart,
    TrendingUp,
    Package,
    Target,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import { formatNumber, formatCurrency } from "@/lib/utils";

// Icon mapping
const iconMap = {
    DollarSign,
    ShoppingCart,
    TrendingUp,
    Package,
    Target,
    CreditCard,
};

type IconName = keyof typeof iconMap;

interface KPICardProps {
    title: string;
    value: number;
    previousValue: number;
    change: number;
    changeType: "increase" | "decrease" | "neutral";
    format: "number" | "currency" | "percentage";
    icon: string;
    color: "primary" | "success" | "warning" | "error" | "info";
    sparklineData?: number[];
    delay?: number;
}

function AnimatedValue({
    value,
    format,
}: {
    value: number;
    format: "number" | "currency" | "percentage";
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const duration = 1500;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(value * easeOut);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value]);

    const formatted =
        format === "currency"
            ? formatCurrency(count)
            : format === "percentage"
                ? `${count.toFixed(1)}%`
                : formatNumber(Math.floor(count));

    return (
        <span ref={ref} className="tabular-nums font-bold">
            {formatted}
        </span>
    );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
    const points = data
        .map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const min = Math.min(...data);
            const range = Math.max(...data) - min || 1;
            const y = 100 - ((value - min) / range) * 100;
            return `${x},${y}`;
        })
        .join(" ");

    const colorClasses: Record<string, string> = {
        primary: "stroke-indigo-500",
        success: "stroke-emerald-500",
        warning: "stroke-amber-500",
        error: "stroke-red-500",
        info: "stroke-sky-500",
    };

    const fillIds: Record<string, string> = {
        primary: "url(#gradient-primary)",
        success: "url(#gradient-success)",
        warning: "url(#gradient-warning)",
        error: "url(#gradient-error)",
        info: "url(#gradient-info)",
    };

    const strokeClass = colorClasses[color] || "stroke-indigo-500";
    const fillUrl = fillIds[color] || "url(#gradient-primary)";

    return (
        <div className="h-12 w-full mt-4 -mb-2">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
            >
                <defs>
                    <linearGradient id="gradient-primary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient-success" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient-warning" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient-error" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient-info" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d={`M0,100 L${points.replace(/ /g, " L")} L100,100 Z`}
                    fill={fillUrl}
                    className="transition-all duration-300"
                />
                <polyline
                    points={points}
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className={`${strokeClass} transition-all duration-300`}
                />
            </svg>
        </div>
    );
}

export function KPICard({
    title,
    value,
    change,
    changeType,
    format,
    icon,
    color,
    sparklineData = [],
    delay = 0,
}: KPICardProps) {
    const IconComponent = iconMap[icon as IconName] || DollarSign;
    const isPositive = changeType === "increase";
    const isNegative = changeType === "decrease";

    const colorStyles: Record<string, string> = {
        primary: "bg-indigo-500/10 text-indigo-500",
        success: "bg-emerald-500/10 text-emerald-500",
        warning: "bg-amber-500/10 text-amber-500",
        error: "bg-red-500/10 text-red-500",
        info: "bg-sky-500/10 text-sky-500",
    };

    const bgStyle = colorStyles[color] || colorStyles.primary;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="group relative p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
        >
            <div className="flex flex-col h-full justify-between">
                <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgStyle}`}>
                            <IconComponent className="w-5 h-5" />
                        </div>

                        <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border border-transparent ${isPositive
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
                                    : isNegative
                                        ? "bg-red-500/10 text-red-500 border-red-500/10"
                                        : "bg-zinc-800 text-zinc-400"
                                }`}
                        >
                            {isPositive && <ArrowUpRight className="w-3 h-3" />}
                            {isNegative && <ArrowDownRight className="w-3 h-3" />}
                            {change > 0 && "+"}
                            {change.toFixed(1)}%
                        </div>
                    </div>

                    {/* Value */}
                    <div className="mb-1 text-3xl text-white tracking-tight">
                        <AnimatedValue value={value} format={format} />
                    </div>

                    {/* Title */}
                    <p className="text-sm text-zinc-400 font-medium">{title}</p>
                </div>

                {/* Sparkline */}
                {sparklineData.length > 0 && (
                    <Sparkline data={sparklineData} color={color} />
                )}
            </div>
        </motion.div>
    );
}
