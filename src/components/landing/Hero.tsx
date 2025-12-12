"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Play,
    ChevronDown,
    Zap,
    Shield,
    Globe,
} from "lucide-react";

const floatingElements = [
    { icon: Zap, delay: 0, x: "10%", y: "20%" },
    { icon: Shield, delay: 0.2, x: "85%", y: "15%" },
    { icon: Globe, delay: 0.4, x: "75%", y: "75%" },
    { icon: Sparkles, delay: 0.6, x: "15%", y: "70%" },
];

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b]"
        >
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/50 to-[#09090b]" />

                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        x: mousePosition.x * 50,
                        y: mousePosition.y * 50,
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: mousePosition.x * -30,
                        y: mousePosition.y * -30,
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[100px]"
                />
            </div>

            {/* Floating Elements */}
            {floatingElements.map((el, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: el.delay + 0.5, duration: 0.5 }}
                    style={{ left: el.x, top: el.y }}
                    className="absolute hidden lg:block"
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-16 h-16 rounded-2xl glass flex items-center justify-center shadow-2xl shadow-indigo-500/10"
                    >
                        <el.icon className="w-8 h-8 text-indigo-400" />
                    </motion.div>
                </motion.div>
            ))}

            {/* Main Content */}
            <motion.div
                style={{ opacity, y }}
                className="relative z-10 max-w-5xl mx-auto px-4 text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-medium text-zinc-300">
                        Introducing Natade Intelligence v2.0
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500" />
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
                >
                    <span className="text-white">Intelligence That</span>
                    <br />
                    <span className="gradient-text">Drives Growth</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    AI-powered product intelligence platform that helps dropshippers discover
                    winning products, analyze trends, and maximize profits with data-driven insights.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <Link
                        href="/dashboard"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg overflow-hidden transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">Start Free Trial</span>
                        <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium text-lg hover:bg-white/10 transition-all hover:-translate-y-0.5">
                        <Play className="w-5 h-5 fill-current" />
                        Watch Demo
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-3 gap-8 sm:gap-12 max-w-2xl mx-auto border-t border-white/10 pt-12"
                >
                    {[
                        { value: "50K+", label: "Products Analyzed" },
                        { value: "98%", label: "Accuracy Rate" },
                        { value: "10x", label: "Faster Research" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-zinc-500"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </section>
    );
}
