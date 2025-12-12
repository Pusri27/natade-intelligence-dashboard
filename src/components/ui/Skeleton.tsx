"use client";

import { CSSProperties } from "react";

interface SkeletonProps {
    className?: string;
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    style?: CSSProperties;
}

export function Skeleton({ className = "", rounded = "md", style }: SkeletonProps) {
    const roundedClasses = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
    };

    return (
        <div
            className={`
        relative overflow-hidden
        bg-zinc-800/50
        ${roundedClasses[rounded]}
        ${className}
      `}
            style={style}
        >
            <div
                className="absolute inset-0 -translate-x-full animate-shimmer"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                }}
            />
            <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
        </div>
    );
}

// Card skeleton
export function CardSkeleton() {
    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5">
            <div className="flex items-start justify-between mb-4">
                <Skeleton className="w-10 h-10" rounded="xl" />
                <Skeleton className="w-16 h-6" rounded="full" />
            </div>
            <Skeleton className="w-24 h-8 mb-2" />
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-full h-12 mt-4" rounded="lg" />
        </div>
    );
}

// Table row skeleton
export function TableRowSkeleton() {
    return (
        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
            <Skeleton className="w-10 h-10" rounded="lg" />
            <div className="flex-1">
                <Skeleton className="w-48 h-4 mb-2" />
                <Skeleton className="w-24 h-3" />
            </div>
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-12 h-6" rounded="full" />
        </div>
    );
}

// Chart skeleton
export function ChartSkeleton() {
    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Skeleton className="w-32 h-5 mb-2" />
                    <Skeleton className="w-48 h-3" />
                </div>
                <Skeleton className="w-24 h-8" rounded="lg" />
            </div>
            <div className="relative h-64">
                {/* Fake chart bars */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full">
                    {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 90].map((height, i) => (
                        <Skeleton
                            key={i}
                            className="w-4"
                            style={{ height: `${height}%` }}
                            rounded="sm"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Insight card skeleton
export function InsightSkeleton() {
    return (
        <div className="p-5 rounded-xl bg-zinc-900 border border-white/5">
            <div className="flex items-start gap-4">
                <Skeleton className="w-10 h-10 shrink-0" rounded="lg" />
                <div className="flex-1">
                    <Skeleton className="w-48 h-5 mb-2" />
                    <Skeleton className="w-full h-4 mb-1" />
                    <Skeleton className="w-3/4 h-4" />
                </div>
            </div>
        </div>
    );
}
