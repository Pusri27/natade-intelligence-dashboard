// ============================================
// NATADE INTELLIGENCE - Type Definitions
// ============================================

// Product Types
export interface Product {
    id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    cost: number;
    margin: number;
    sales: number;
    trend: number;
    rating: number;
    reviews: number;
    supplier: string;
    region: string;
    status: "trending" | "stable" | "declining" | "new";
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

// Analytics Types
export interface KPIData {
    id: string;
    title: string;
    value: number;
    previousValue: number;
    change: number;
    changeType: "increase" | "decrease" | "neutral";
    format: "number" | "currency" | "percentage";
    icon: string;
    color: "primary" | "success" | "warning" | "error" | "info";
    sparklineData?: number[];
}

export interface ChartDataPoint {
    date: string;
    value: number;
    label?: string;
}

export interface RevenueData {
    date: string;
    revenue: number;
    orders: number;
    profit: number;
}

export interface CategoryData {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

// AI Insight Types
export interface AIInsight {
    id: string;
    type: "opportunity" | "warning" | "trend" | "recommendation";
    title: string;
    description: string;
    confidence: number;
    impact: "high" | "medium" | "low";
    actionable: boolean;
    action?: string;
    createdAt: string;
    product?: Product;
    metrics?: {
        label: string;
        value: string | number;
    }[];
}

// Geographic Data
export interface GeoPoint {
    id: string;
    lat: number;
    lng: number;
    name: string;
    country: string;
    value: number;
    products: number;
    growth: number;
}

export interface ShippingRoute {
    id: string;
    from: GeoPoint;
    to: GeoPoint;
    volume: number;
    duration: number;
}

// Activity/Feed Types
export interface ActivityItem {
    id: string;
    type: "sale" | "alert" | "insight" | "update" | "milestone";
    title: string;
    description: string;
    timestamp: string;
    icon: string;
    color: string;
    read: boolean;
}

// Supplier Types
export interface Supplier {
    id: string;
    name: string;
    logo: string;
    country: string;
    rating: number;
    products: number;
    responseTime: string;
    reliability: number;
    tags: string[];
}

// Network Graph Types
export interface NetworkNode {
    id: string;
    label: string;
    type: "product" | "supplier" | "category" | "region";
    value: number;
    color: string;
}

export interface NetworkLink {
    source: string;
    target: string;
    value: number;
}

// Heatmap Types
export interface HeatmapCell {
    date: string;
    value: number;
    level: 0 | 1 | 2 | 3 | 4;
}

// Command Palette Types
export interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    shortcut?: string;
    category: string;
    action: () => void;
}

// Table Types
export interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}

export interface FilterConfig {
    key: string;
    value: string | number | boolean;
    operator: "equals" | "contains" | "gt" | "lt" | "gte" | "lte";
}

// Theme Types
export type Theme = "dark" | "light" | "system";

// Navigation Types
export interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: string;
    badge?: number;
    children?: NavItem[];
}

// Store Types (Zustand)
export interface AppState {
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

    // Filters
    dateRange: { start: string; end: string };
    setDateRange: (range: { start: string; end: string }) => void;
}
