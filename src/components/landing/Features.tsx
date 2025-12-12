"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Zap,
    Target,
    Globe,
    BarChart3,
    Lightbulb,
    Shield,
    Cpu,
    TrendingUp,
} from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Real-Time Analytics",
        description: "Get instant insights with live data feeds and real-time market analysis.",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        icon: Target,
        title: "Product Discovery",
        description: "AI-powered product finder that identifies winning products before they trend.",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
    },
    {
        icon: Globe,
        title: "Global Insights",
        description: "Visualize demand across 190+ countries with interactive globe analytics.",
        color: "text-sky-500",
        bg: "bg-sky-500/10",
    },
    {
        icon: BarChart3,
        title: "Advanced Charts",
        description: "Beautiful, interactive charts that make complex data easy to understand.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        icon: Lightbulb,
        title: "AI Recommendations",
        description: "Smart suggestions powered by machine learning to optimize your strategy.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        icon: Shield,
        title: "Risk Analysis",
        description: "Identify potential risks and market volatility before they impact you.",
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
    {
        icon: Cpu,
        title: "Automation Ready",
        description: "Connect with your favorite tools via API and automate your workflow.",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
    },
    {
        icon: TrendingUp,
        title: "Trend Prediction",
        description: "Forecast market trends with 94% accuracy using our predictive models.",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
    },
];

export function Features() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-zinc-950">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />
            </div>

            <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6 uppercase tracking-wider"
                    >
                        Features
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
                        Everything You Need to
                        <br />
                        <span className="gradient-text">Dominate the Market</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Powerful tools and insights designed to give you an unfair advantage
                        in the competitive world of dropshipping.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                            className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                        >
                            {/* Icon */}
                            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold mb-3 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <p className="text-zinc-500 mb-4 text-sm">And many more features to explore...</p>
                    <a
                        href="/dashboard"
                        className="inline-flex items-center gap-2 font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        View all features
                        <TrendingUp className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
