"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
    const { theme, setTheme } = useStore();

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.remove("light", "dark");
            root.classList.add(systemTheme);
        } else {
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
    }, [theme]);

    const themes: { value: Theme; icon: typeof Moon; label: string }[] = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
        { value: "system", icon: Monitor, label: "System" },
    ];

    return (
        <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-white/10">
            {themes.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`relative p-2 rounded-md transition-all ${theme === value
                            ? "text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    aria-label={`Switch to ${label} theme`}
                    title={label}
                >
                    {theme === value && (
                        <motion.div
                            layoutId="theme-indicator"
                            className="absolute inset-0 bg-indigo-600 rounded-md"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                </button>
            ))}
        </div>
    );
}

// Simple toggle button version
export function ThemeToggleSimple() {
    const { theme, setTheme } = useStore();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
            <AnimatePresence mode="wait">
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="w-4 h-4" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="w-4 h-4" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
