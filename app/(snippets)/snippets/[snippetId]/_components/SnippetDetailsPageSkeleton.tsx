import Header from "@/app/components/Header"

const SnippetDetailsPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#0e0e13]">
            <Header />
            <div className="p-5">
                <div className="grid grid-col-1 lg:grid-cols-[0.9fr_1.1fr] gap-5">
                    <section className="flex flex-col gap-3.5">
                        {/* Snippet details header */}
                        <div className="bg-[#1b1b27] border border-gray-700/50 rounded-2xl px-4 py-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    {/* Snippet language skeleton */}
                                    <div className="relative p-1.5 rounded-lg outline outline-gray-700/50 bg-gray-800 animate-pulse">
                                        <div className="size-11 object-contain relative z-10 bg-gray-800" />
                                    </div>
                                    {/* Snippet details skeleton */}
                                    <div>
                                        <div className="bg-gray-800 w-40 h-7 mb-2 animate-pulse rounded-full" />
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                            <div className="bg-gray-800 w-32 h-5 animate-pulse rounded-full" />
                                            <div className="bg-gray-800 w-32 h-5 animate-pulse rounded-full" />
                                            <div className="bg-gray-800 w-32 h-5 animate-pulse rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Snippet comments skeleton */}
                        <div className="bg-[#1b1b27] border border-gray-700/50 rounded-2xl overflow-hidden">
                            {/* Comments header skelton */}
                            <div className="px-5 py-4 border-b border-gray-700/50">
                                <div className="bg-gray-800 w-52 h-8 rounded-full" />
                            </div>
                            <div className="p-4">
                                {/* Comments skelton */}
                                <div className="space-y-4">
                                    {[...Array(4)].map((_, id) => (
                                        <div className="group" key={id}>
                                            <div className="bg-neutral-950 rounded-xl px-4 py-5 outline outline-gray-700/50">
                                                {/* Comment header skelton */}
                                                <div className="flex items-start sm:items-center justify-between gap-2 mb-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="size-9 bg-gray-800 rounded-full animate-pulse" />
                                                        <div className="min-w-0 space-y-1.5">
                                                            <div className="bg-gray-800 w-28 h-4 animate-pulse rounded-full" />
                                                            <div className="bg-gray-800 w-32 h-4 animate-pulse rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-800 animate-pulse w-full h-20 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Code editor skelton */}
                    <section className="rounded-2xl overflow-hidden border border-gray-700/50 bg-[#1b1b27]">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50">
                            <div className="bg-gray-800 animate-pulse w-28 h-6 rounded-full" />
                            <div className="bg-gray-800 animate-pulse w-28 h-6 rounded-full" />
                        </div>
                        <div className="bg-gray-800 animate-pulse w-full h-full" />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default SnippetDetailsPageSkeleton;