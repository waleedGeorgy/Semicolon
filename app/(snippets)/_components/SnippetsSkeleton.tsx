const CardSkeleton = () => (
    <div className="relative group">
        <div className="bg-[#1b1b27] rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="px-5 py-4 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-11 rounded-lg bg-gray-800 animate-pulse" />
                        <div className="space-y-2">
                            <div className="w-24 h-5 bg-gray-800 rounded-lg animate-pulse" />
                            <div className="w-20 h-3 bg-gray-800 rounded-lg animate-pulse" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-12 h-8 bg-gray-800 rounded-md animate-pulse" />
                        <div className="w-12 h-8 bg-gray-800 rounded-md animate-pulse" />
                    </div>
                </div>
                {/* Title */}
                <div className="space-y-4">
                    <div className="w-1/2 h-7 bg-gray-800 rounded-lg animate-pulse" />
                    <div className="w-1/4 h-5 bg-gray-800 rounded-lg animate-pulse" />
                </div>
                {/* Code block */}
                <div className="space-y-2 bg-black/30 rounded-md p-4">
                    <div className="w-full h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-1/2 h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-1/2 h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="w-1/3 h-4 bg-gray-800 rounded animate-pulse" />
                </div>
            </div>
        </div>
    </div>
);

const SnippetsSkeleton = () => {
    return (
        <>
            {/* Pulsating colored circles on screen sides */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] -left-1/4 sm:w-44 md:w-64 lg:w-96 h-96 bg-blue-500/50 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-[20%] -right-1/4 sm:w-44 md:w-64 lg:w-96 h-96 bg-indigo-500/50 rounded-full blur-3xl animate-pulse" />
            </div>
            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(3)].map((_, i) => (
                    <div key={i}>
                        <CardSkeleton />
                    </div>
                ))}
            </div>
        </>
    )
}

export default SnippetsSkeleton;