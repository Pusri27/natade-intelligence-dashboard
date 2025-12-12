"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme, ActivityItem, Product } from "@/types";

interface AppState {
    // Theme
    theme: Theme;
    setTheme: (theme: Theme) => void;

    // Command Palette
    isCommandPaletteOpen: boolean;
    openCommandPalette: () => void;
    closeCommandPalette: () => void;
    toggleCommandPalette: () => void;

    // Sidebar
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    collapseSidebar: () => void;
    expandSidebar: () => void;

    // Notifications
    notifications: ActivityItem[];
    unreadCount: number;
    addNotification: (notification: Omit<ActivityItem, "id" | "read">) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;

    // Selected Product
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;

    // Date Range
    dateRange: { start: string; end: string };
    setDateRange: (range: { start: string; end: string }) => void;

    // Search
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Theme
            theme: "dark",
            setTheme: (theme) => set({ theme }),

            // Command Palette
            isCommandPaletteOpen: false,
            openCommandPalette: () => set({ isCommandPaletteOpen: true }),
            closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
            toggleCommandPalette: () =>
                set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

            // Sidebar
            isSidebarOpen: true,
            isSidebarCollapsed: false,
            toggleSidebar: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            collapseSidebar: () => set({ isSidebarCollapsed: true }),
            expandSidebar: () => set({ isSidebarCollapsed: false }),

            // Notifications
            notifications: [],
            unreadCount: 0,
            addNotification: (notification) =>
                set((state) => {
                    const newNotification: ActivityItem = {
                        ...notification,
                        id: generateId(),
                        read: false,
                    };
                    return {
                        notifications: [newNotification, ...state.notifications].slice(0, 50),
                        unreadCount: state.unreadCount + 1,
                    };
                }),
            markAsRead: (id) =>
                set((state) => ({
                    notifications: state.notifications.map((n) =>
                        n.id === id ? { ...n, read: true } : n
                    ),
                    unreadCount: Math.max(0, state.unreadCount - 1),
                })),
            markAllAsRead: () =>
                set((state) => ({
                    notifications: state.notifications.map((n) => ({ ...n, read: true })),
                    unreadCount: 0,
                })),

            // Selected Product
            selectedProduct: null,
            setSelectedProduct: (product) => set({ selectedProduct: product }),

            // Date Range (default last 30 days)
            dateRange: {
                start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0],
                end: new Date().toISOString().split("T")[0],
            },
            setDateRange: (range) => set({ dateRange: range }),

            // Search
            searchQuery: "",
            setSearchQuery: (query) => set({ searchQuery: query }),
        }),
        {
            name: "natade-store",
            partialize: (state) => ({
                theme: state.theme,
                isSidebarCollapsed: state.isSidebarCollapsed,
            }),
        }
    )
);
