"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lightbulb,
    TrendingUp,
    AlertTriangle,
    Zap,
    ArrowRight,
    Sparkles,
    Filter,
    Clock,
    CheckCircle2,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import insightsData from "@/data/insights.json";

const iconMap: Record<string, React.ElementType> = {
    opportunity: Zap,
    warning: AlertTriangle,
    trend: TrendingUp,
    recommendation: Lightbulb,
};

const typeStyles: Record<string, { bg: string; text: string; border: string }> = {
    opportunity: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-500",
        border: "hover:border-emerald-500/30",
    },
    warning: {
        bg: "bg-amber-500/10",
        text: "text-amber-500",
        border: "hover:border-amber-500/30",
    },
    trend: {
        bg: "bg-indigo-500/10",
        text: "text-indigo-500",
        border: "hover:border-indigo-500/30",
    },
    recommendation: {
        bg: "bg-sky-500/10",
        text: "text-sky-500",
        border: "hover:border-sky-500/30",
    },
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

export default function InsightsPage() {
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedImpact, setSelectedImpact] = useState<string>("all");

    const insights = insightsData.insights as Insight[];

    const filteredInsights = insights.filter((insight) => {
        const matchesType = selectedType === "all" || insight.type === selectedType;
        const matchesImpact = selectedImpact === "all" || insight.impact === selectedImpact;
        return matchesType && matchesImpact;
    });

    const insightTypes = ["all", "opportunity", "warning", "trend", "recommendation"];
    const impactLevels = ["all", "high", "medium", "low"];

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#09090b]">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.03]" />
                <div className="absolute top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            AI Insights
                        </h1>
                    </div>
                    <p className="text-zinc-400 ml-[52px]">
                        Real-time intelligence powered by machine learning
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                >
                    {[
                        { label: "Total Insights", value: insights.length, icon: Lightbulb },
                        { label: "Opportunities", value: insights.filter((i) => i.type === "opportunity").length, icon: Zap },
                        { label: "Warnings", value: insights.filter((i) => i.type === "warning").length, icon: AlertTriangle },
                        { label: "Avg Confidence", value: `${Math.round(insights.reduce((a, b) => a + b.confidence, 0) / insights.length)}%`, icon: CheckCircle2 },
                    ].map((stat, index) => (
                        <div
                            key={stat.label}
                            className="p-4 rounded-xl bg-zinc-900 border border-white/5"
                        >
                            <stat.icon className="w-5 h-5 text-indigo-500 mb-2" />
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-zinc-500">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap items-center gap-3 mb-6"
                >
                    {/* Type Filter */}
                    <div className="flex items-center gap-2 p-1 rounded-lg bg-zinc-900 border border-white/5">
                        {insightTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${selectedType === type
                                        ? "bg-indigo-600 text-white"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {type === "all" ? "All Types" : type}
                            </button>
                        ))}
                    </div>

                    {/* Impact Filter */}
                    <div className="flex items-center gap-2 p-1 rounded-lg bg-zinc-900 border border-white/5">
                        {impactLevels.map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedImpact(level)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${selectedImpact === level
                                        ? "bg-indigo-600 text-white"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {level === "all" ? "All Impact" : level}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Insights List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredInsights.map((insight, index) => {
                            const IconComponent = iconMap[insight.type] || Lightbulb;
                            const typeStyle = typeStyles[insight.type] || typeStyles.recommendation;
                            const impactStyle = impactStyles[insight.impact];

                            return (
                                <motion.div
                                    key={insight.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.03 }}
                                    className={`group p-6 rounded-2xl bg-zinc-900 border border-white/5 transition-all hover:shadow-xl hover:shadow-black/20 ${typeStyle.border}`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${typeStyle.bg}`}>
                                            <IconComponent className={`w-6 h-6 ${typeStyle.text}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {/* Header */}
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-white text-lg">
                                                            {insight.title}
                                                        </h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${impactStyle.bg} ${impactStyle.text}`}>
                                                            {insight.impact} impact
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                        <Clock className="w-3 h-3" />
                                                        {formatRelativeTime(new Date(insight.createdAt))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-white/5">
                                                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                                    <span className="text-sm font-medium text-white">
                                                        {insight.confidence}% confidence
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-zinc-400 leading-relaxed mb-4">
                                                {insight.description}
                                            </p>

                                            {/* Metrics */}
                                            {insight.metrics && insight.metrics.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {insight.metrics.map((metric, i) => (
                                                        <div
                                                            key={i}
                                                            className="px-3 py-2 rounded-lg bg-zinc-800/50 border border-white/5"
                                                        >
                                                            <span className="text-xs text-zinc-500">{metric.label}</span>
                                                            <p className="text-sm font-semibold text-white">
                                                                {metric.value}
                                                            </p>
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
                        })}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredInsights.length === 0 && (
                    <div className="text-center py-16">
                        <Lightbulb className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                        <p className="text-zinc-400">No insights match your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
