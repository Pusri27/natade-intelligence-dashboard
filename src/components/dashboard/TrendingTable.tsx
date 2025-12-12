"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    ArrowDownRight,
    Star,
    ChevronUp,
    ChevronDown,
    Search,
    Filter,
    MoreHorizontal,
} from "lucide-react";
import { formatNumber, formatCurrency } from "@/lib/utils";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

type SortKey = "name" | "sales" | "trend" | "margin" | "price";
type SortDirection = "asc" | "desc";

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

export function TrendingTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("sales");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const products = productsData.products as Product[];
    const categories = ["all", ...new Set(products.map((p) => p.category))];

    // Filter and sort products
    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            const modifier = sortDirection === "asc" ? 1 : -1;
            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * modifier;
            }
            return ((aValue as number) - (bValue as number)) * modifier;
        });

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDirection("desc");
        }
    };

    const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
        if (sortKey !== columnKey)
            return <ChevronUp className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />;
        return sortDirection === "asc" ? (
            <ChevronUp className="w-4 h-4 text-indigo-500" />
        ) : (
            <ChevronDown className="w-4 h-4 text-indigo-500" />
        );
    };

    return (
        <div className="rounded-2xl border border-white/5 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="p-6 border-b border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Trending Products
                        </h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Top performing products across all categories
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm bg-zinc-800/50 border border-white/5 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="pl-9 pr-8 py-2 text-sm bg-zinc-800/50 border border-white/5 rounded-lg text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 appearance-none transition-all hover:bg-zinc-800"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === "all" ? "All Categories" : cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white/[0.02] border-b border-white/5">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th
                                onClick={() => handleSort("price")}
                                className="group cursor-pointer text-left px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
                            >
                                <span className="inline-flex items-center gap-1">
                                    Price
                                    <SortIcon columnKey="price" />
                                </span>
                            </th>
                            <th
                                onClick={() => handleSort("sales")}
                                className="group cursor-pointer text-left px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
                            >
                                <span className="inline-flex items-center gap-1">
                                    Sales
                                    <SortIcon columnKey="sales" />
                                </span>
                            </th>
                            <th
                                onClick={() => handleSort("trend")}
                                className="group cursor-pointer text-left px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
                            >
                                <span className="inline-flex items-center gap-1">
                                    Trend
                                    <SortIcon columnKey="trend" />
                                </span>
                            </th>
                            <th
                                onClick={() => handleSort("margin")}
                                className="group cursor-pointer text-left px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
                            >
                                <span className="inline-flex items-center gap-1">
                                    Margin
                                    <SortIcon columnKey="margin" />
                                </span>
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product, index) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="group hover:bg-white/[0.02] transition-colors"
                                >
                                    {/* Product */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-lg shadow-inner shadow-black/20">
                                                {categoryEmojis[product.category] || "📦"}
                                            </div>
                                            <div>
                                                <p className="font-medium text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                                                    {product.name}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                    <span>{product.category}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-0.5 text-zinc-400">
                                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                        {product.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-zinc-200 tabular-nums">
                                                {formatCurrency(product.price)}
                                            </p>
                                            <p className="text-xs text-zinc-500 tabular-nums">
                                                Cost: {formatCurrency(product.cost)}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Sales */}
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-zinc-200 tabular-nums">
                                            {formatNumber(product.sales)}
                                        </span>
                                    </td>

                                    {/* Trend */}
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium tabular-nums ${product.trend > 0
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-red-500/10 text-red-500"
                                            }`}>
                                            {product.trend > 0 ? (
                                                <ArrowUpRight className="w-3 h-3" />
                                            ) : (
                                                <ArrowDownRight className="w-3 h-3" />
                                            )}
                                            {product.trend > 0 ? "+" : ""}
                                            {product.trend}%
                                        </div>
                                    </td>

                                    {/* Margin */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 w-20 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                                                    style={{ width: `${product.margin}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-zinc-400 tabular-nums w-8">
                                                {product.margin}%
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${product.status === "trending"
                                                    ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10"
                                                    : product.status === "stable"
                                                        ? "bg-sky-500/5 text-sky-500 border-sky-500/10"
                                                        : product.status === "declining"
                                                            ? "bg-red-500/5 text-red-500 border-red-500/10"
                                                            : "bg-amber-500/5 text-amber-500 border-amber-500/10"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between border-t border-white/5 bg-zinc-900">
                <span className="text-sm text-zinc-500">
                    Showing {filteredProducts.length} of {products.length} products
                </span>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white disabled:opacity-50 transition-colors">
                        Previous
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white disabled:opacity-50 transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
