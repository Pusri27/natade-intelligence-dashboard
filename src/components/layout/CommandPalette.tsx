"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    LayoutDashboard,
    Package,
    Lightbulb,
    TrendingUp,
    Globe,
    Settings,
    Moon,
    Sun,
    FileText,
    Users,
    BarChart3,
    Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon: React.ReactNode;
    shortcut?: string;
    category: string;
    action: () => void;
}

const categories = [
    { id: "navigation", label: "Navigation" },
    { id: "actions", label: "Actions" },
    { id: "settings", label: "Settings" },
];

export function CommandPalette() {
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const { isCommandPaletteOpen, closeCommandPalette, theme, setTheme } = useStore();

    const commands: CommandItem[] = [
        // Navigation
        {
            id: "dashboard",
            label: "Go to Dashboard",
            description: "View your analytics dashboard",
            icon: <LayoutDashboard className="w-4 h-4" />,
            shortcut: "G D",
            category: "navigation",
            action: () => {
                window.location.href = "/dashboard";
                closeCommandPalette();
            },
        },
        {
            id: "products",
            label: "Go to Products",
            description: "Browse all products",
            icon: <Package className="w-4 h-4" />,
            shortcut: "G P",
            category: "navigation",
            action: () => {
                window.location.href = "/products";
                closeCommandPalette();
            },
        },
        {
            id: "insights",
            label: "Go to Insights",
            description: "View AI-powered insights",
            icon: <Lightbulb className="w-4 h-4" />,
            shortcut: "G I",
            category: "navigation",
            action: () => {
                window.location.href = "/insights";
                closeCommandPalette();
            },
        },
        {
            id: "trends",
            label: "View Trends",
            description: "Analyze market trends",
            icon: <TrendingUp className="w-4 h-4" />,
            category: "navigation",
            action: () => {
                window.location.href = "/dashboard#trends";
                closeCommandPalette();
            },
        },
        {
            id: "globe",
            label: "Global Analytics",
            description: "View geographic insights",
            icon: <Globe className="w-4 h-4" />,
            category: "navigation",
            action: () => {
                window.location.href = "/dashboard#globe";
                closeCommandPalette();
            },
        },
        // Actions
        {
            id: "new-report",
            label: "Generate Report",
            description: "Create a new analytics report",
            icon: <FileText className="w-4 h-4" />,
            category: "actions",
            action: () => {
                console.log("Generate report");
                closeCommandPalette();
            },
        },
        {
            id: "analytics",
            label: "View Analytics",
            description: "Deep dive into metrics",
            icon: <BarChart3 className="w-4 h-4" />,
            category: "actions",
            action: () => {
                window.location.href = "/dashboard";
                closeCommandPalette();
            },
        },
        {
            id: "team",
            label: "Team Settings",
            description: "Manage team members",
            icon: <Users className="w-4 h-4" />,
            category: "actions",
            action: () => {
                console.log("Team settings");
                closeCommandPalette();
            },
        },
        // Settings
        {
            id: "toggle-theme",
            label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
            description: "Toggle between light and dark theme",
            icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
            shortcut: "T",
            category: "settings",
            action: () => {
                setTheme(theme === "dark" ? "light" : "dark");
                closeCommandPalette();
            },
        },
        {
            id: "settings",
            label: "Open Settings",
            description: "Configure your preferences",
            icon: <Settings className="w-4 h-4" />,
            shortcut: ",",
            category: "settings",
            action: () => {
                console.log("Open settings");
                closeCommandPalette();
            },
        },
    ];

    const filteredCommands = commands.filter(
        (cmd) =>
            cmd.label.toLowerCase().includes(search.toLowerCase()) ||
            cmd.description?.toLowerCase().includes(search.toLowerCase())
    );

    const groupedCommands = categories
        .map((cat) => ({
            ...cat,
            commands: filteredCommands.filter((cmd) => cmd.category === cat.id),
        }))
        .filter((group) => group.commands.length > 0);

    const allFilteredCommands = groupedCommands.flatMap((g) => g.commands);

    useEffect(() => {
        if (isCommandPaletteOpen) {
            inputRef.current?.focus();
            setSearch("");
            setSelectedIndex(0);
        }
    }, [isCommandPaletteOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isCommandPaletteOpen) return;

            if (e.key === "Escape") {
                closeCommandPalette();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < allFilteredCommands.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : allFilteredCommands.length - 1
                );
            } else if (e.key === "Enter") {
                e.preventDefault();
                const selected = allFilteredCommands[selectedIndex];
                if (selected) {
                    selected.action();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isCommandPaletteOpen, selectedIndex, allFilteredCommands, closeCommandPalette]);

    return (
        <AnimatePresence>
            {isCommandPaletteOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={closeCommandPalette}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
                    >
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 border-b border-white/5">
                                <Search className="w-5 h-5 text-zinc-500" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Type a command or search..."
                                    className="flex-1 py-4 bg-transparent text-white placeholder-zinc-500 outline-none text-base"
                                />
                                <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-400 border border-white/5">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-80 overflow-y-auto py-2">
                                {groupedCommands.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-zinc-500">
                                        <Command className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <p>No commands found</p>
                                    </div>
                                ) : (
                                    groupedCommands.map((group) => (
                                        <div key={group.id}>
                                            <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                                {group.label}
                                            </div>
                                            {group.commands.map((cmd) => {
                                                const index = allFilteredCommands.findIndex(
                                                    (c) => c.id === cmd.id
                                                );
                                                const isSelected = index === selectedIndex;

                                                return (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={cmd.action}
                                                        onMouseEnter={() => setSelectedIndex(index)}
                                                        className={cn(
                                                            "w-full flex items-center gap-3 px-4 py-3 text-left transition-all",
                                                            isSelected
                                                                ? "bg-indigo-600/10 border-l-2 border-indigo-500"
                                                                : "border-l-2 border-transparent hover:bg-zinc-800/50"
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                                                isSelected
                                                                    ? "bg-indigo-600 text-white"
                                                                    : "bg-zinc-800 text-zinc-400"
                                                            )}
                                                        >
                                                            {cmd.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className={cn(
                                                                "font-medium truncate transition-colors",
                                                                isSelected ? "text-indigo-400" : "text-zinc-200"
                                                            )}>
                                                                {cmd.label}
                                                            </p>
                                                            {cmd.description && (
                                                                <p className={cn(
                                                                    "text-xs truncate transition-colors",
                                                                    isSelected ? "text-indigo-500/80" : "text-zinc-500"
                                                                )}>
                                                                    {cmd.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {cmd.shortcut && (
                                                            <kbd className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-500 border border-white/5">
                                                                {cmd.shortcut}
                                                            </kbd>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 text-xs text-zinc-500 bg-zinc-900/50">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5">
                                            ↑↓
                                        </kbd>
                                        to navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5">
                                            ↵
                                        </kbd>
                                        to select
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-zinc-400">Powered by</span>
                                    <span className="gradient-text font-bold">NATADE</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
