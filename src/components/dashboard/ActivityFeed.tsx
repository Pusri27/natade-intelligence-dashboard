"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    Trophy,
    Lightbulb,
    AlertTriangle,
    RefreshCw,
    TrendingUp,
    type LucideIcon,
    Circle,
    MoreVertical,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import insightsData from "@/data/insights.json";

const iconMap: Record<string, LucideIcon> = {
    ShoppingCart,
    Trophy,
    Lightbulb,
    AlertTriangle,
    RefreshCw,
    TrendingUp,
};

const colorStyles: Record<string, { bg: string; text: string }> = {
    "#10B981": { bg: "bg-emerald-500/10", text: "text-emerald-500" },
    "#6366F1": { bg: "bg-indigo-500/10", text: "text-indigo-500" },
    "#F59E0B": { bg: "bg-amber-500/10", text: "text-amber-500" },
    "#EF4444": { bg: "bg-red-500/10", text: "text-red-500" },
    "#3B82F6": { bg: "bg-sky-500/10", text: "text-sky-500" },
};

interface ActivityItem {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    icon: string;
    color: string;
    read: boolean;
}

export function ActivityFeed() {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [isLive, setIsLive] = useState(true);

    useEffect(() => {
        setActivities(insightsData.activityFeed as ActivityItem[]);

        if (isLive) {
            const interval = setInterval(() => {
                const newActivities = [
                    {
                        id: `new_${Date.now()}`,
                        type: "sale",
                        title: "New Order Received",
                        description: `Product #${Math.floor(Math.random() * 1000)} - $${(
                            Math.random() * 200 +
                            20
                        ).toFixed(2)}`,
                        timestamp: new Date().toISOString(),
                        icon: "ShoppingCart",
                        color: "#10B981",
                        read: false,
                    },
                    {
                        id: `trend_${Date.now()}`,
                        type: "insight",
                        title: "Trending Alert",
                        description: "New product showing growth potential",
                        timestamp: new Date().toISOString(),
                        icon: "TrendingUp",
                        color: "#6366F1",
                        read: false,
                    },
                ];

                const randomActivity =
                    newActivities[Math.floor(Math.random() * newActivities.length)];

                setActivities((prev) => [randomActivity, ...prev.slice(0, 9)]);
            }, 8000);

            return () => clearInterval(interval);
        }
    }, [isLive]);

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Live Activity
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                        Real-time updates from your store
                    </p>
                </div>
                <button
                    onClick={() => setIsLive(!isLive)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isLive
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
                        : "bg-zinc-800 text-zinc-400 border-white/5"
                        }`}
                >
                    <span className="relative flex h-2 w-2">
                        {isLive && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span
                            className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? "bg-emerald-500" : "bg-zinc-500"
                                }`}
                        />
                    </span>
                    {isLive ? "Live" : "Paused"}
                </button>
            </div>

            {/* Activity List */}
            <div className="space-y-3 overflow-y-auto flex-1 min-h-0 max-h-80 scrollbar-hide">
                <AnimatePresence mode="popLayout">
                    {activities.map((activity) => {
                        const IconComponent = iconMap[activity.icon] || ShoppingCart;
                        const style = colorStyles[activity.color] || colorStyles["#6366F1"];

                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`relative flex items-start gap-4 p-4 rounded-xl transition-all border ${!activity.read
                                    ? "bg-white/[0.03] border-white/10"
                                    : "bg-transparent border-transparent hover:bg-white/[0.01]"
                                    }`}
                            >
                                {!activity.read && (
                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                )}

                                {/* Icon */}
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 ${style.bg}`}
                                >
                                    <IconComponent className={`w-5 h-5 ${style.text}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <p className="text-sm font-medium text-zinc-200">
                                            {activity.title}
                                        </p>
                                        <span className="text-xs text-zinc-500 whitespace-nowrap">
                                            {formatRelativeTime(new Date(activity.timestamp))}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                                        {activity.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* View All Link */}
            <div className="mt-4 pt-4 border-t border-white/5 shrink-0 text-center">
                <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors hover:underline underline-offset-4 decoration-indigo-500/30">
                    View all activity history
                </button>
            </div>
        </div>
    );
}
