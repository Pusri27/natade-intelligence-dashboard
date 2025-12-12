import { InsightSkeleton } from "@/components/ui/Skeleton";

export default function InsightsLoading() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#09090b]">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.03]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 animate-pulse" />
                        <div className="h-8 w-32 bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-4 w-64 bg-zinc-800/50 rounded-lg animate-pulse ml-[52px]" />
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-white/5">
                            <div className="w-5 h-5 bg-zinc-800 rounded mb-2 animate-pulse" />
                            <div className="h-8 w-16 bg-zinc-800 rounded-lg animate-pulse mb-1" />
                            <div className="h-3 w-24 bg-zinc-800/50 rounded animate-pulse" />
                        </div>
                    ))}
                </div>

                {/* Filter Skeleton */}
                <div className="flex gap-3 mb-6">
                    <div className="h-10 w-64 bg-zinc-900 rounded-lg animate-pulse" />
                    <div className="h-10 w-40 bg-zinc-900 rounded-lg animate-pulse" />
                </div>

                {/* Insights Skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <InsightSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
