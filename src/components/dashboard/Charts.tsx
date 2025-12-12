"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import analyticsData from "@/data/analytics.json";

type TimeRange = "7d" | "30d" | "90d" | "1y";

const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" },
    { value: "90d", label: "90D" },
    { value: "1y", label: "1Y" },
];

export function RevenueChart() {
    const [timeRange, setTimeRange] = useState<TimeRange>("1y");
    const data = analyticsData.revenueData;

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Revenue Overview
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                        Track your revenue and profit trends
                    </p>
                </div>

                {/* Time Range Selector */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/50 border border-white/5">
                    {timeRanges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => setTimeRange(range.value)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${timeRange === range.value
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272a"
                            vertical={false}
                            opacity={0.4}
                        />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717a", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717a", fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#18181b",
                                borderColor: "#27272a",
                                borderRadius: "12px",
                                padding: "12px",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                            }}
                            labelStyle={{ color: "#a1a1aa", marginBottom: "8px", fontSize: "12px" }}
                            itemStyle={{ color: "#fafafa", fontSize: "14px", fontWeight: 500 }}
                            formatter={(value: number) => [formatCurrency(value), ""]}
                            cursor={{ stroke: "#3f3f46", strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke="#6366F1"
                            strokeWidth={2}
                            fill="url(#colorRevenue)"
                            dot={false}
                            activeDot={{ r: 6, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="profit"
                            name="Profit"
                            stroke="#10B981"
                            strokeWidth={2}
                            fill="url(#colorProfit)"
                            dot={false}
                            activeDot={{ r: 6, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-xs font-medium text-zinc-400">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-zinc-400">Profit</span>
                </div>
            </div>
        </div>
    );
}

export function CategoryChart() {
    const data = analyticsData.categoryBreakdown;

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 h-full">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">
                    Category Breakdown
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                    Revenue by product category
                </p>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272a"
                            horizontal={true}
                            vertical={false}
                            opacity={0.4}
                        />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717a", fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a1a1aa", fontSize: 12 }}
                            width={100}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                            contentStyle={{
                                backgroundColor: "#18181b",
                                borderColor: "#27272a",
                                borderRadius: "12px",
                                padding: "12px",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                            }}
                            formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                            labelStyle={{ color: "#fafafa", fontWeight: 600, marginBottom: "4px" }}
                            itemStyle={{ color: "#d4d4d8" }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function RegionChart() {
    const data = analyticsData.regionData;
    const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B"];

    return (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 h-full">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">
                    Regional Distribution
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                    Sales by geographic region
                </p>
            </div>

            <div className="flex items-center gap-8">
                <div className="w-40 h-40 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={4}
                                dataKey="percentage"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#18181b",
                                    borderColor: "#27272a",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                }}
                                itemStyle={{ color: "#fafafa" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-4">
                    {data.map((region, index) => (
                        <motion.div
                            key={region.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                        {region.name}
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-white tabular-nums">
                                    {region.percentage}%
                                </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-zinc-800/50 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${region.percentage}%` }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
