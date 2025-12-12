"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ShortcutCategory {
    title: string;
    shortcuts: { keys: string[]; description: string }[];
}

const shortcutCategories: ShortcutCategory[] = [
    {
        title: "Navigation",
        shortcuts: [
            { keys: ["G", "D"], description: "Go to Dashboard" },
            { keys: ["G", "P"], description: "Go to Products" },
            { keys: ["G", "I"], description: "Go to Insights" },
            { keys: ["G", "H"], description: "Go to Home" },
        ],
    },
    {
        title: "Actions",
        shortcuts: [
            { keys: ["⌘", "K"], description: "Open Command Palette" },
            { keys: ["⌘", "S"], description: "Save Changes" },
            { keys: ["⌘", "F"], description: "Search" },
            { keys: ["R"], description: "Refresh Data" },
        ],
    },
    {
        title: "Interface",
        shortcuts: [
            { keys: ["T"], description: "Toggle Theme" },
            { keys: ["?"], description: "Show Shortcuts" },
            { keys: ["Esc"], description: "Close Modal" },
            { keys: ["["], description: "Toggle Sidebar" },
        ],
    },
];

export function ShortcutsOverlay() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-full max-w-2xl"
                    >
                        <div className="mx-4 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                <h2 className="text-lg font-semibold text-white">
                                    Keyboard Shortcuts
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 max-h-[60vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {shortcutCategories.map((category) => (
                                        <div key={category.title}>
                                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                                                {category.title}
                                            </h3>
                                            <div className="space-y-3">
                                                {category.shortcuts.map((shortcut, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <span className="text-sm text-zinc-300">
                                                            {shortcut.description}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            {shortcut.keys.map((key, i) => (
                                                                <kbd
                                                                    key={i}
                                                                    className="min-w-[24px] h-6 px-1.5 flex items-center justify-center rounded bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-400"
                                                                >
                                                                    {key}
                                                                </kbd>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-white/5 bg-zinc-900/50">
                                <p className="text-xs text-zinc-500 text-center">
                                    Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-zinc-400">?</kbd> to toggle this overlay
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
