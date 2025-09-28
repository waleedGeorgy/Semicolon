"use client"
import Header from "@/app/components/Header";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs"
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileHeroSkeleton from "../_components/ProfileHeroSkeleton";
import ProfileHero from "../_components/ProfileHero";
import { AnimatePresence, motion } from "framer-motion"
import { Calendar1, ChevronRight, Clock, Code, Loader2, MoreHorizontal, Star, TerminalSquare, UserPlus2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StarSnippetButton from "@/app/components/StarSnippetButton";
import ExpandableCodeBlock from "../_components/ExpandableCodeBlock";

const ProfilePage = () => {
    const { user, isLoaded } = useUser();

    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"codeRuns" | "userSnippets" | "starred">("codeRuns");

    const userStats = useQuery(api.users.getUserStats, {
        userId: user?.id ?? ""
    });

    const starredSnippets = useQuery(api.snippets.getStarredSnippets);

    const userSnippets = useQuery(api.snippets.getUserSnippets);
    console.log(userSnippets)

    const { results: codeRuns, status: codeRunsStatus, loadMore, isLoading: isLoadingCodeRuns } = usePaginatedQuery(api.codeRuns.getUserCodeRuns, {
        userId: user?.id ?? ""
    }, {
        initialNumItems: 4
    });

    const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

    const handleLoadMore = async () => {
        if (codeRunsStatus === "CanLoadMore") loadMore(4);
    };

    const TABS = [
        {
            id: "codeRuns",
            label: "Code Runs",
            icon: <TerminalSquare className="size-4" />,
        },
        {
            id: "userSnippets",
            label: "User Snippets",
            icon: <UserPlus2 className="size-4" />,
        },
        {
            id: "starred",
            label: "Starred Snippets",
            icon: <Star className="size-4" />,
        },
    ];

    if (!user && isLoaded) return router.push("/");

    return (
        <div className="min-h-screen bg-[#141414] font-sans">
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Profile hero */}
                {userStats && userData && (
                    <ProfileHero userStats={userStats} userData={userData} user={user!} />
                )}
                {(userStats === undefined || !isLoaded) && <ProfileHeroSkeleton />}
                {/* Code related section */}
                <div className="overflow-hidden">
                    {/* Switch tabs header */}
                    <div className="bg-[#1b1b27] rounded-xl border border-gray-700/50 w-fit mx-auto">
                        <div className="flex items-center justify-center gap-4 px-4 py-2.5">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as "codeRuns" | "starred")}
                                    className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all duration-200 relative overflow-hidden cursor-pointer ${activeTab === tab.id ? "text-indigo-400" : "text-gray-400 hover:text-gray-300"
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-indigo-500/10 rounded-lg"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.5,
                                            }}
                                        />
                                    )}
                                    {tab.icon}
                                    <span className="text-sm font-semibold relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Tab contents */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="py-5"
                        >
                            {/* Code runs tab */}
                            {activeTab === "codeRuns" && (
                                <div className="space-y-5">
                                    {codeRuns?.map((codeRun) => (
                                        /* Individual code run */
                                        <div key={codeRun._id} className="group rounded-xl overflow-hidden border border-gray-700/50">
                                            {/* Individual code run header */}
                                            <div className="flex items-center justify-between px-4 py-3 bg-[#1b1b27] rounded-t-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div
                                                            className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur-sm opacity-50"
                                                            area-hidden="true"
                                                        />
                                                        <div className="relative p-1.5 rounded-lg outline outline-gray-700/50 bg-gray-900">
                                                            <Image
                                                                src={`/${codeRun.language}.png`}
                                                                alt={`${codeRun.language} logo`}
                                                                className="size-10 object-contain relative z-10"
                                                                width={30}
                                                                height={30}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-roboto-condensed">
                                                                {codeRun.language[0].toUpperCase() + codeRun.language.slice(1,)}
                                                            </span>
                                                            <span className="text-xs text-gray-400">•</span>
                                                            <span className="text-xs text-gray-400 flex flex-row items-center gap-1.5">
                                                                <Calendar1 className="size-3.5" />
                                                                {new Date(codeRun._creationTime).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <span
                                                            className={`text-sm px-2.5 py-0.5 rounded-full ${codeRun.error
                                                                ? "bg-red-500/10 text-red-400"
                                                                : "bg-emerald-500/20 text-emerald-400"
                                                                }`}
                                                        >
                                                            {codeRun.error ? "Error" : "Success"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Individual code run body */}
                                            <div className="p-4 bg-neutral-950 rounded-b-xl">
                                                <ExpandableCodeBlock code={codeRun.code} language={codeRun.language} />
                                                {(codeRun.output || codeRun.error) && (
                                                    <div className="mt-4 p-4 rounded-lg bg-neutral-900 outline outline-gray-700/50">
                                                        <h4 className="text-sm font-medium text-gray-400 mb-2">Output</h4>
                                                        <pre className={`text-sm ${codeRun.error ? "text-red-400" : "text-green-400"}`}>
                                                            {codeRun.error || codeRun.output}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {/* Loading code runs fallback */}
                                    {isLoadingCodeRuns ? (
                                        <div className="text-center py-10">
                                            <Loader2 className="size-12 text-gray-600 mx-auto mb-4 animate-spin" />
                                            <h3 className="text-lg font-medium text-gray-400 mb-2">
                                                Loading code runs...
                                            </h3>
                                        </div>
                                    ) : (
                                        codeRuns.length === 0 && (
                                            <div className="text-center py-10">
                                                <Code className="size-12 text-gray-600 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-400 mb-2">
                                                    No code runs yet
                                                </h3>
                                            </div>
                                        )
                                    )}
                                    {/* Load more paginated code runs */}
                                    {codeRunsStatus === "CanLoadMore" && (
                                        <div className="flex justify-center mt-8">
                                            <button
                                                onClick={handleLoadMore}
                                                className="px-5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                                            >
                                                Load More
                                                <MoreHorizontal className="size-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* User snippets tab */}
                            {activeTab === "userSnippets" && (
                                <div>User snippets</div>
                            )}
                            {/* Starred snippets tab */}
                            {activeTab === "starred" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {starredSnippets?.map((snippet) => (
                                        <div key={snippet._id} className="group relative">
                                            <Link href={`/snippets/${snippet._id}`}>
                                                <div
                                                    className="bg-black/20 rounded-xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 overflow-hidden h-full group-hover:transform group-hover:scale-[1.02]"
                                                >
                                                    <div className="p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                                                    <Image
                                                                        src={`/${snippet.language}.png`}
                                                                        alt={`${snippet.language} logo`}
                                                                        className="relative z-10"
                                                                        width={40}
                                                                        height={40}
                                                                    />
                                                                </div>
                                                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm">
                                                                    {snippet.language}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="absolute top-6 right-6 z-10"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                <StarSnippetButton snippetId={snippet._id} />
                                                            </div>
                                                        </div>
                                                        <h2 className="text-xl font-semibold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                                                            {snippet.title}
                                                        </h2>
                                                        <div className="flex items-center justify-between text-sm text-gray-400">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                    <div className="px-6 pb-6">
                                                        <div className="bg-black/30 rounded-lg p-4 overflow-hidden">
                                                            <pre className="text-sm text-gray-300 font-mono line-clamp-3">
                                                                {snippet.code}
                                                            </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                    {(!starredSnippets || starredSnippets.length === 0) && (
                                        <div className="col-span-full text-center py-12">
                                            <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-400 mb-2">
                                                No starred snippets yet
                                            </h3>
                                            <p className="text-gray-500">
                                                Start exploring and star the snippets you find useful!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;