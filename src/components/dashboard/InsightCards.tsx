"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lightbulb,
    TrendingUp,
    AlertTriangle,
    Zap,
    ArrowRight,
    Sparkles,
    type LucideIcon,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import insightsData from "@/data/insights.json";

const iconMap: Record<string, LucideIcon> = {
    opportunity: Zap,
    warning: AlertTriangle,
    trend: TrendingUp,
    recommendation: Lightbulb,
};

const typeStyles: Record<string, { bg: string; text: string; iconBg: string }> = {
    opportunity: { bg: "hover:border-emerald-500/30", text: "text-emerald-500", iconBg: "bg-emerald-500/10" },
    warning: { bg: "hover:border-amber-500/30", text: "text-amber-500", iconBg: "bg-amber-500/10" },
    trend: { bg: "hover:border-indigo-500/30", text: "text-indigo-500", iconBg: "bg-indigo-500/10" },
    recommendation: { bg: "hover:border-sky-500/30", text: "text-sky-500", iconBg: "bg-sky-500/10" },
};

const impactStyles: Record<string, { bg: string; text: string }> = {
    high: { bg: "bg-red-500/10", text: "text-red-500" },
    medium: { bg: "bg-amber-500/10", text: "text-amber-500" },
    low: { bg: "bg-sky-500/10", text: "text-sky-500" },
};

interface Insight {
    id: string;
    type: "opportunity" | "warning" | "trend" | "recommendation";
    title: string;
    description: string;
    confidence: number;
    impact: "high" | "medium" | "low";
    actionable: boolean;
    action?: string;
    createdAt: string;
    metrics?: { label: string; value: string | number }[];
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
    const IconComponent = iconMap[insight.type] || Lightbulb;
    const typeStyle = typeStyles[insight.type] || typeStyles.recommendation;
    const impactStyle = impactStyles[insight.impact];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className={`group relative p-5 rounded-xl bg-zinc-900 border border-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 ${typeStyle.bg}`}
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${typeStyle.iconBg}`}>
                    <IconComponent className={`w-5 h-5 ${typeStyle.text}`} />
                </div>

                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-zinc-100 truncate pr-2">
                                    {insight.title}
                                </h3>
                                <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${impactStyle.bg} ${impactStyle.text}`}>
                                    {insight.impact}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500">
                                {formatRelativeTime(new Date(insight.createdAt))}
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800/50 border border-white/5">
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            <span className="text-xs font-medium text-zinc-300">
                                {insight.confidence}%
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                        {insight.description}
                    </p>

                    {/* Metrics */}
                    {insight.metrics && insight.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {insight.metrics.map((metric, i) => (
                                <div
                                    key={i}
                                    className="px-2.5 py-1.5 rounded-md bg-zinc-800/50 border border-white/5 flex items-center gap-2"
                                >
                                    <span className="text-xs text-zinc-500">{metric.label}:</span>
                                    <span className="text-xs font-semibold text-zinc-200">
                                        {metric.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action */}
                    {insight.actionable && insight.action && (
                        <button className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors group/btn">
                            <span>{insight.action}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function InsightCards() {
    const insights = insightsData.insights as Insight[];
    const [visibleCount, setVisibleCount] = useState(4);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        AI Insights
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                        Real-time intelligence powered by machine learning
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-medium text-emerald-500">Live Analysis</span>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {insights.slice(0, visibleCount).map((insight, index) => (
                        <InsightCard key={insight.id} insight={insight} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Load More */}
            {visibleCount < insights.length && (
                <div className="text-center pt-2">
                    <button
                        onClick={() => setVisibleCount((prev) => Math.min(prev + 4, insights.length))}
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        Show more insights
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
