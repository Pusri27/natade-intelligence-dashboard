"use client";

import { motion } from "framer-motion";
import {
    Calendar,
    Download,
    RefreshCw,
    Sparkles,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { TrendingTable } from "@/components/dashboard/TrendingTable";
import { InsightCards } from "@/components/dashboard/InsightCards";
import { RevenueChart, CategoryChart, RegionChart } from "@/components/dashboard/Charts";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import analyticsData from "@/data/analytics.json";
import type { KPIData } from "@/types";

export default function DashboardPage() {
    const kpis = analyticsData.kpis as KPIData[];

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#09090b]">
            {/* Background elements */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.03]" />
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-white">
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </span>
                            Dashboard
                        </h1>
                        <p className="mt-1 text-zinc-400 ml-[52px]">
                            Welcome back! Here&apos;s your business overview.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 ml-[52px] md:ml-0">
                        {/* Date Range Selector */}
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                            <Calendar className="w-4 h-4" />
                            <span>Last 30 days</span>
                        </button>

                        {/* Refresh Button */}
                        <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                            <RefreshCw className="w-4 h-4" />
                        </button>

                        {/* Export Button */}
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </motion.div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {kpis.slice(0, 6).map((kpi, index) => (
                        <KPICard
                            key={kpi.id}
                            title={kpi.title}
                            value={kpi.value}
                            previousValue={kpi.previousValue}
                            change={kpi.change}
                            changeType={kpi.changeType}
                            format={kpi.format}
                            icon={kpi.icon}
                            color={kpi.color}
                            sparklineData={kpi.sparklineData}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <RevenueChart />
                    </motion.div>

                    {/* Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="h-full"
                    >
                        <ActivityFeed />
                    </motion.div>
                </div>

                {/* Secondary Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <CategoryChart />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <RegionChart />
                    </motion.div>
                </div>

                {/* AI Insights & Trending Products */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <InsightCards />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="pb-8"
                    >
                        <TrendingTable />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
