import { CardSkeleton, ChartSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#09090b]">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.02]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse mb-2" />
                        <div className="h-4 w-64 bg-zinc-800/50 rounded-lg animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-32 bg-zinc-800 rounded-lg animate-pulse" />
                        <div className="h-10 w-24 bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* KPI Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>

                {/* Charts Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ChartSkeleton />
                    <ChartSkeleton />
                </div>

                {/* Table Skeleton */}
                <div className="rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <div className="h-6 w-40 bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <TableRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
