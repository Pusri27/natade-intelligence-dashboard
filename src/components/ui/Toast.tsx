"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };

        setToasts((prev) => [...prev, newToast]);

        // Auto remove after duration
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.duration || 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
}

const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const styles = {
    success: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: "text-emerald-500",
        progress: "bg-emerald-500",
    },
    error: {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        icon: "text-red-500",
        progress: "bg-red-500",
    },
    warning: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: "text-amber-500",
        progress: "bg-amber-500",
    },
    info: {
        bg: "bg-sky-500/10",
        border: "border-sky-500/20",
        icon: "text-sky-500",
        progress: "bg-sky-500",
    },
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const Icon = icons[toast.type];
    const style = styles[toast.type];
    const duration = toast.duration || 5000;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`
        relative pointer-events-auto overflow-hidden
        rounded-xl border backdrop-blur-xl
        ${style.bg} ${style.border}
      `}
        >
            <div className="flex items-start gap-3 p-4">
                <div className={`shrink-0 ${style.icon}`}>
                    <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">{toast.title}</p>
                    {toast.description && (
                        <p className="text-zinc-400 text-sm mt-0.5">{toast.description}</p>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="shrink-0 p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Progress bar */}
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-0.5 ${style.progress}`}
            />
        </motion.div>
    );
}

// Convenience functions
export function toast(options: Omit<Toast, "id">) {
    // This is a simplified version - in real app, you'd use a global event emitter
    console.log("Toast:", options);
}
