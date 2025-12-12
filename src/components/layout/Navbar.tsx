"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Command,
    Bell,
    Menu,
    X,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { ThemeToggleSimple } from "@/components/ui/ThemeToggle";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/products", label: "Products" },
    { href: "/insights", label: "Insights" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { toggleCommandPalette, unreadCount } = useStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                toggleCommandPalette();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleCommandPalette]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled ? "glass-strong py-3" : "bg-transparent py-5"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.5 }}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"
                            >
                                <Sparkles className="w-5 h-5 text-white" />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                                    NATADE
                                </span>
                                <span className="text-[10px] text-zinc-500 tracking-[0.2em] font-medium uppercase">
                                    Intelligence
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 backdrop-blur-sm border border-white/5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            {/* Search / Command Palette Trigger */}
                            <button
                                onClick={toggleCommandPalette}
                                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <Search className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                                <span className="text-sm text-zinc-500 group-hover:text-zinc-300">
                                    Search...
                                </span>
                                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/20 border border-white/5 text-[10px] text-zinc-500 font-mono">
                                    <Command className="w-3 h-3" />K
                                </kbd>
                            </button>

                            {/* Notifications */}
                            <button
                                className="relative p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                                aria-label="Notifications"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-black"
                                    />
                                )}
                            </button>

                            {/* Theme Toggle */}
                            <ThemeToggleSimple />

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>

                            {/* CTA Button */}
                            <Link
                                href="/dashboard"
                                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    toggleCommandPalette();
                                }}
                                className="flex items-center gap-2 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium text-left"
                            >
                                <Search className="w-4 h-4" />
                                Search
                            </button>
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-center font-medium hover:bg-indigo-500 transition-all"
                            >
                                Get Started
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
