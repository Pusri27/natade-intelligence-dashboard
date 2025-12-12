import { CardSkeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#09090b]">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.03]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 animate-pulse" />
                        <div className="h-8 w-32 bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-4 w-72 bg-zinc-800/50 rounded-lg animate-pulse ml-[52px]" />
                </div>

                {/* Filters Skeleton */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="h-10 w-72 bg-zinc-900 rounded-xl animate-pulse" />
                    <div className="h-10 w-40 bg-zinc-900 rounded-xl animate-pulse" />
                    <div className="h-10 w-20 bg-zinc-900 rounded-lg animate-pulse ml-auto" />
                </div>

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="p-5 rounded-2xl bg-zinc-900 border border-white/5">
                            {/* Image placeholder */}
                            <div className="w-full h-32 rounded-xl bg-zinc-800 animate-pulse mb-4" />
                            {/* Category & Rating */}
                            <div className="flex justify-between mb-2">
                                <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-4 w-10 bg-zinc-800 rounded animate-pulse" />
                            </div>
                            {/* Name */}
                            <div className="h-5 w-full bg-zinc-800 rounded animate-pulse mb-2" />
                            <div className="h-5 w-2/3 bg-zinc-800 rounded animate-pulse mb-4" />
                            {/* Price & Trend */}
                            <div className="flex justify-between">
                                <div className="h-6 w-16 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-5 w-12 bg-zinc-800 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
