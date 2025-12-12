"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Sparkles, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4">
            {/* Background effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.03]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px]" />
            </div>

            <div className="text-center max-w-lg">
                {/* Animated 404 */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        {/* Glow effect */}
                        <div className="absolute inset-0 text-[150px] font-bold gradient-text blur-2xl opacity-30">
                            404
                        </div>
                        <h1 className="relative text-[150px] font-bold gradient-text leading-none">
                            404
                        </h1>
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Oops! The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium border border-white/10 hover:bg-zinc-700 transition-all hover:-translate-y-0.5"
                    >
                        <Sparkles className="w-4 h-4" />
                        Go to Dashboard
                    </Link>
                </motion.div>

                {/* Search suggestion */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 pt-8 border-t border-white/5"
                >
                    <p className="text-sm text-zinc-500 mb-4">
                        Or try using the command palette
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400">
                        <Search className="w-4 h-4" />
                        <span className="text-sm">Press</span>
                        <kbd className="px-2 py-0.5 rounded bg-zinc-800 text-xs font-medium">⌘K</kbd>
                        <span className="text-sm">to search</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
