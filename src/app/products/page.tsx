"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Package,
    Star,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Grid3X3,
    List,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const categoryEmojis: Record<string, string> = {
    Electronics: "🎧",
    Accessories: "👜",
    Photography: "📸",
    Office: "💼",
    Health: "💪",
    Kitchen: "🍳",
    Automotive: "🚗",
    Travel: "✈️",
};

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const products = productsData.products as Product[];
    const categories = ["all", ...new Set(products.map((p) => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#09090b]">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.03]" />
                <div className="absolute top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            Products
                        </h1>
                    </div>
                    <p className="text-zinc-400 ml-[52px]">
                        Discover and analyze trending products across all categories
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Search */}
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-72 pl-10 pr-4 py-2.5 text-sm bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="pl-10 pr-8 py-2.5 text-sm bg-zinc-900 border border-white/10 rounded-xl text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === "all" ? "All Categories" : cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-white/10">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-md transition-all ${viewMode === "grid"
                                    ? "bg-indigo-600 text-white"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-md transition-all ${viewMode === "list"
                                    ? "bg-indigo-600 text-white"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <div
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                            : "space-y-3"
                    }
                >
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * index }}
                            className={`group p-5 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/10 transition-all hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 cursor-pointer ${viewMode === "list" ? "flex items-center gap-6" : ""
                                }`}
                        >
                            {/* Product Icon */}
                            <div
                                className={`rounded-xl bg-zinc-800 flex items-center justify-center text-3xl ${viewMode === "grid" ? "w-full h-32 mb-4" : "w-16 h-16 shrink-0"
                                    }`}
                            >
                                {categoryEmojis[product.category] || "📦"}
                            </div>

                            <div className={viewMode === "list" ? "flex-1 min-w-0" : ""}>
                                {/* Category & Rating */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-zinc-500 font-medium">
                                        {product.category}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        <span className="text-xs text-zinc-400">{product.rating}</span>
                                    </div>
                                </div>

                                {/* Name */}
                                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                                    {product.name}
                                </h3>

                                {/* Price & Trend */}
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-white">
                                        {formatCurrency(product.price)}
                                    </span>
                                    <div
                                        className={`flex items-center gap-1 text-xs font-medium ${product.trend > 0 ? "text-emerald-500" : "text-red-500"
                                            }`}
                                    >
                                        {product.trend > 0 ? (
                                            <TrendingUp className="w-3 h-3" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3" />
                                        )}
                                        {product.trend > 0 ? "+" : ""}
                                        {product.trend}%
                                    </div>
                                </div>

                                {/* Sales */}
                                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-zinc-500">
                                        {formatNumber(product.sales)} sales
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full capitalize ${product.status === "trending"
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : product.status === "stable"
                                                    ? "bg-sky-500/10 text-sky-500"
                                                    : "bg-amber-500/10 text-amber-500"
                                            }`}
                                    >
                                        {product.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <Package className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                        <p className="text-zinc-400">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
