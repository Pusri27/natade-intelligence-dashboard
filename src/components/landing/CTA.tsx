"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";

const benefits = [
    "14-day free trial",
    "No credit card required",
    "Cancel anytime",
    "Full feature access",
];

export function CTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-zinc-950">
            {/* Background elements */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[150px]"
                />
            </div>

            <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="relative p-8 sm:p-12 lg:p-16 rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl shadow-indigo-500/10"
                >
                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

                    {/* Glow effect */}
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-indigo-500/20 blur-[100px]" />

                    {/* Content */}
                    <div className="relative text-center z-10">
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/25"
                        >
                            <Sparkles className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
                        >
                            Ready to <span className="gradient-text">Transform</span>
                            <br />
                            Your Business?
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 }}
                            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-zinc-400 leading-relaxed"
                        >
                            Join thousands of successful dropshippers who use Natade Intelligence
                            to discover winning products and maximize profits.
                        </motion.p>

                        {/* Benefits */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12"
                        >
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm font-medium text-zinc-300"
                                >
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    {benefit}
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/dashboard"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg overflow-hidden transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
                            >
                                <span className="relative z-10">Get Started Free</span>
                                <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium text-lg hover:bg-white/10 transition-all hover:-translate-y-0.5"
                            >
                                Contact Sales
                            </Link>
                        </motion.div>

                        {/* Trust text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                            className="mt-8 text-sm text-zinc-500 font-medium"
                        >
                            Trusted by 12,000+ dropshippers worldwide
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
