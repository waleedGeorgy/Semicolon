"use client"
import { useState } from "react";
import { useUser } from "@clerk/nextjs"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion"
import { Calendar1, Code, Loader2, MoreHorizontal, Star, TerminalSquare, Trash2, User2, UserPlus2 } from "lucide-react";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ProfileHeroSkeleton from "../_components/ProfileHeroSkeleton";
import ProfileHero from "../_components/ProfileHero";
import ExpandableCodeBlock from "../_components/ExpandableCodeBlock";
import Header from "@/app/components/Header";
import StarSnippetButton from "@/app/components/StarSnippetButton";
import { createToast } from "@/app/components/Toast";

const ProfilePage = () => {
    const { user, isLoaded } = useUser();

    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"codeRuns" | "userSnippets" | "starred">("codeRuns");
    const [isSnippetDeleting, setIsSnippetDeleting] = useState(false);

    const deleteCodeSnippet = useMutation(api.snippets.deleteCodeSnippet);

    const userStats = useQuery(api.users.getUserStats, {
        userId: user?.id ?? ""
    });

    const starredSnippets = useQuery(api.snippets.getStarredSnippets);

    const userSnippets = useQuery(api.snippets.getUserSnippets);

    const { results: codeRuns, status: codeRunsStatus, loadMore, isLoading: isLoadingCodeRuns } = usePaginatedQuery(api.codeRuns.getUserCodeRuns, {
        userId: user?.id ?? ""
    }, {
        initialNumItems: 4
    });

    const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

    const handleLoadMore = async () => {
        if (codeRunsStatus === "CanLoadMore") loadMore(4);
    };

    const handleDeleteSnippet = async (snippetId: Id<"snippets">) => {
        setIsSnippetDeleting(true);

        try {
            await deleteCodeSnippet({ snippetId: snippetId });
            createToast("success", "Snippet deleted successfully");
        } catch (error) {
            console.log(error);
            createToast("error", "Failed to delete the snippet")
        } finally {
            setIsSnippetDeleting(false);
        }
    }

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
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Profile hero */}
                {userStats && userData && (<ProfileHero userStats={userStats} userData={userData} user={user!} />)}
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
                            className="py-6"
                        >
                            {/* Code runs tab */}
                            {activeTab === "codeRuns" && (
                                <div className="space-y-6 bg-[#1b1b27]">
                                    {codeRuns?.map((codeRun) => (
                                        /* Individual code run */
                                        <div key={codeRun._id} className="group rounded-xl overflow-hidden border border-gray-700/50 hover:border-2 hover:border-gray-700/80">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {userSnippets?.map((snippet) => (
                                        <motion.div
                                            layout
                                            className="group relative"
                                            whileHover={{ y: -3 }}
                                            transition={{ duration: 0.2 }}
                                            key={snippet._id}
                                        >
                                            <Link href={`/snippets/${snippet._id}`}>
                                                <div
                                                    className="relative h-full bg-[#1b1b27] rounded-xl border border-gray-700/50 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className="px-5 py-4">
                                                        {/* Card header */}
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative">
                                                                    <div
                                                                        className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-all duration-300"
                                                                        area-hidden="true"
                                                                    />
                                                                    <div
                                                                        className="relative p-1.5 rounded-lg outline outline-gray-700/50 hover:outline-gray-700 bg-gray-900 transition-all duration-300"
                                                                    >
                                                                        <Image
                                                                            src={`/${snippet.language}.png`}
                                                                            alt={`${snippet.language} logo`}
                                                                            className="size-8 object-contain relative z-10"
                                                                            width={20}
                                                                            height={20}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 outline outline-gray-700/50 rounded-lg text-sm w-fit">
                                                                        {snippet.language === "cpp" ? ("C++") : (snippet.language[0].toUpperCase() + snippet.language.slice(1,))}
                                                                    </span>
                                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                                        <Calendar1 className="size-3" />
                                                                        {new Date(snippet._creationTime).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute top-4 right-4 z-10 flex gap-2 items-center" onClick={(e) => e.preventDefault()}>
                                                                <StarSnippetButton snippetId={snippet._id} />
                                                                {user?.id === snippet.userId && (
                                                                    <div className="z-10" onClick={(e) => e.preventDefault()}>
                                                                        <button
                                                                            onClick={() => handleDeleteSnippet(snippet._id)}
                                                                            disabled={isSnippetDeleting}
                                                                            className={`group px-3 py-1.5 rounded-lg transition-all duration-200 ${isSnippetDeleting ? "bg-red-500/20 text-red-400 cursor-not-allowed" : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"}`}
                                                                        >
                                                                            {isSnippetDeleting ? (
                                                                                <div className="size-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />) : (<Trash2 className="size-4" />)
                                                                            }
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Card contents */}
                                                        <div className="space-y-4">
                                                            <div>
                                                                {/* Snippet title */}
                                                                <h2 className="text-2xl font-semibold font-roboto-condensed mb-1.5 line-clamp-1 group-hover:text-indigo-400 transition-colors duration-200">
                                                                    {snippet.title}
                                                                </h2>
                                                                {/* Snippet user */}
                                                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <User2 className="size-4" />
                                                                        <span className="truncate max-w-40">{snippet.username}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Snippet code */}
                                                            <div className="relative group/code">
                                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                                                                <pre className="relative bg-black/30 rounded-lg px-3 py-2 overflow-hidden text-sm text-gray-300 font-mono line-clamp-7 outline outline-gray-700/50">
                                                                    {snippet.code}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                    {userSnippets === undefined ? (
                                        <div className="col-span-full text-center py-10">
                                            <Loader2 className="size-12 text-gray-600 mx-auto mb-4 animate-spin" />
                                            <h3 className="text-lg font-medium text-gray-400 mb-2">
                                                Loading your snippets...
                                            </h3>
                                        </div>
                                    ) : (
                                        !userSnippets || userSnippets.length === 0 && (
                                            <div className="col-span-full text-center py-10">
                                                <Code className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-400 mb-2">
                                                    You haven't published any snippets yet
                                                </h3>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                            {/* Starred snippets tab */}
                            {activeTab === "starred" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {starredSnippets?.map((snippet) => (
                                        <motion.div
                                            layout
                                            className="group relative"
                                            whileHover={{ y: -3 }}
                                            transition={{ duration: 0.2 }}
                                            key={snippet._id}
                                        >
                                            <Link href={`/snippets/${snippet._id}`}>
                                                <div
                                                    className="relative h-full bg-[#1b1b27] rounded-xl border border-gray-700/50 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className="px-5 py-4">
                                                        {/* Card header */}
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative">
                                                                    <div
                                                                        className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-all duration-300"
                                                                        area-hidden="true"
                                                                    />
                                                                    <div
                                                                        className="relative p-1.5 rounded-lg outline outline-gray-700/50 hover:outline-gray-700 bg-gray-900 transition-all duration-300"
                                                                    >
                                                                        <Image
                                                                            src={`/${snippet.language}.png`}
                                                                            alt={`${snippet.language} logo`}
                                                                            className="size-8 object-contain relative z-10"
                                                                            width={20}
                                                                            height={20}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 outline outline-gray-700/50 rounded-lg text-sm w-fit">
                                                                        {snippet.language === "cpp" ? ("C++") : (snippet.language[0].toUpperCase() + snippet.language.slice(1,))}
                                                                    </span>
                                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                                        <Calendar1 className="size-3" />
                                                                        {new Date(snippet._creationTime).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute top-4 right-4 z-10 flex gap-2 items-center" onClick={(e) => e.preventDefault()}>
                                                                <StarSnippetButton snippetId={snippet._id} />
                                                                {user?.id === snippet.userId && (
                                                                    <div className="z-10" onClick={(e) => e.preventDefault()}>
                                                                        <button
                                                                            onClick={() => handleDeleteSnippet(snippet._id)}
                                                                            disabled={isSnippetDeleting}
                                                                            className={`group px-3 py-1.5 rounded-lg transition-all duration-200 ${isSnippetDeleting ? "bg-red-500/20 text-red-400 cursor-not-allowed" : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"}`}
                                                                        >
                                                                            {isSnippetDeleting ? (
                                                                                <div className="size-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />) : (<Trash2 className="size-4" />)
                                                                            }
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Card contents */}
                                                        <div className="space-y-4">
                                                            <div>
                                                                {/* Snippet title */}
                                                                <h2 className="text-2xl font-semibold font-roboto-condensed mb-1.5 line-clamp-1 group-hover:text-indigo-400 transition-colors duration-200">
                                                                    {snippet.title}
                                                                </h2>
                                                                {/* Snippet user */}
                                                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <User2 className="size-4" />
                                                                        <span className="truncate max-w-40">{snippet.username}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Snippet code */}
                                                            <div className="relative group/code">
                                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                                                                <pre className="relative bg-black/30 rounded-lg px-3 py-2 overflow-hidden text-sm text-gray-300 font-mono line-clamp-7 outline outline-gray-700/50">
                                                                    {snippet.code}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                    {starredSnippets === undefined ? (
                                        <div className="col-span-full text-center py-10">
                                            <Loader2 className="size-12 text-gray-600 mx-auto mb-4 animate-spin" />
                                            <h3 className="text-lg font-medium text-gray-400 mb-2">
                                                Loading starred snippets...
                                            </h3>
                                        </div>
                                    ) : (
                                        !starredSnippets || starredSnippets.length === 0 && (
                                            <div className="col-span-full text-center py-10">
                                                <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-400 mb-2">
                                                    You haven't starred any snippet yet.
                                                </h3>
                                            </div>
                                        )
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