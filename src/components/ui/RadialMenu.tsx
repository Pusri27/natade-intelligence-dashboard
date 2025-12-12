"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    LayoutDashboard,
    Package,
    Lightbulb,
    Settings,
    Plus,
    X
} from "lucide-react";

interface RadialMenuItem {
    icon: ReactNode;
    label: string;
    action: () => void;
    color?: string;
}

interface RadialMenuProps {
    items?: RadialMenuItem[];
    triggerClassName?: string;
}

const defaultItems: RadialMenuItem[] = [
    { icon: <Home className="w-4 h-4" />, label: "Home", action: () => window.location.href = "/", color: "#6366f1" },
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", action: () => window.location.href = "/dashboard", color: "#8b5cf6" },
    { icon: <Package className="w-4 h-4" />, label: "Products", action: () => window.location.href = "/products", color: "#ec4899" },
    { icon: <Lightbulb className="w-4 h-4" />, label: "Insights", action: () => window.location.href = "/insights", color: "#f59e0b" },
    { icon: <Settings className="w-4 h-4" />, label: "Settings", action: () => console.log("Settings"), color: "#10b981" },
];

export function RadialMenu({ items = defaultItems, triggerClassName = "" }: RadialMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Calculate positions in a circle
    const getItemPosition = (index: number, total: number) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const radius = 80;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    };

    return (
        <div ref={menuRef} className="relative">
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
          w-12 h-12 rounded-full
          bg-gradient-to-br from-indigo-500 to-violet-600
          shadow-lg shadow-indigo-500/30
          flex items-center justify-center
          text-white
          ${triggerClassName}
        `}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </motion.div>
            </motion.button>

            {/* Menu Items */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Items */}
                        {items.map((item, index) => {
                            const pos = getItemPosition(index, items.length);
                            return (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: pos.x,
                                        y: pos.y,
                                        scale: 1,
                                    }}
                                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 20,
                                    }}
                                    onClick={() => {
                                        item.action();
                                        setIsOpen(false);
                                    }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-lg"
                                        style={{
                                            boxShadow: `0 0 20px ${item.color || "#6366f1"}30`,
                                        }}
                                    >
                                        {item.icon}
                                    </motion.div>

                                    {/* Label tooltip */}
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-zinc-800 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {item.label}
                                    </motion.span>
                                </motion.button>
                            );
                        })}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// Floating action button with radial menu
export function FloatingRadialMenu() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <RadialMenu />
        </div>
    );
}
