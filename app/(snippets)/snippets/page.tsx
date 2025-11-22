"use client"
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"
import { Code2, Grid, Layers, Search, Tag, X } from "lucide-react";
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Header from "@/app/components/Header";
import SnippetCard from "@/app/components/SnippetCard";
import SnippetsSkeleton from "../_components/SnippetsSkeleton";

const SnippetsPage = () => {
    const snippets = useQuery(api.snippets.getAllSnippets);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    if (snippets === undefined) {
        return (
            <div className="min-h-screen font-sans">
                <Header />
                <SnippetsSkeleton />
            </div>
        )
    }

    const snippetLanguages = [...new Set(snippets.map((s) => s.language))];
    const popularSnippetLanguages = snippetLanguages.slice(0, 4);

    const filteredSnippets = snippets.filter((snippet) => {
        const searchMatches =
            snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snippet.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snippet.language.toLowerCase().includes(searchQuery.toLowerCase());

        const languageMatches = !selectedLanguage || snippet.language === selectedLanguage;

        return searchMatches && languageMatches;
    })

    return (
        <div className="min-h-screen bg-[#0e0e13] font-sans">
            <Header />
            <div className="relative max-w-7xl mx-auto px-4 py-12">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-10 space-y-5">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/35 to-indigo-500/35 text-sm"
                    >
                        <Code2 className="size-4 animate-wiggle text-gray-300" />
                        <span className="text-gray-300">Code Snippets Library</span>
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 to-indigo-400/50 opacity-50 blur-lg" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-roboto-condensed text-gray-300"
                    >
                        Discover Code Snippets Shared By The Community
                    </motion.h1>
                </div>
                {/* Filters section */}
                <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
                    {/* Search bar */}
                    <div className="relative group mb-3">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 to-indigo-500/25 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 size-5 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, language, or author..."
                                className="w-full pl-12 pr-4 py-3.5 bg-[#1b1b27]/70 hover:bg-[#1b1b27] rounded-xl border border-gray-700/60 hover:border-gray-700 transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                            />
                        </div>
                    </div>
                    {/* Filters bar */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <div className="flex items-center gap-2">
                            <Tag className="size-3.5 text-gray-400" />
                            <span className="text-sm text-gray-400">Filter by language:</span>
                        </div>
                        {popularSnippetLanguages.map((language) => (
                            <button
                                key={language}
                                onClick={() => setSelectedLanguage(language === selectedLanguage ? null : language)}
                                className={`group relative hover:scale-105 px-2.5 py-1 rounded-md transition-all duration-200 ${selectedLanguage === language ? "text-indigo-400 bg-indigo-500/10 ring-2 ring-indigo-500/50" : "text-gray-400 hover:text-gray-300 bg-[#1b1b27] hover:bg-[#262637] cursor-pointer outline outline-gray-700"}`}
                            >
                                <div className="flex items-center gap-2">
                                    <Image src={`/${language}.png`} alt={language} width={16} height={16} className="size-5 object-contain" />
                                    <span className="text-sm font-light">{language === "cpp" ? ("C++") : (language[0].toUpperCase() + language.slice(1,))}</span>
                                </div>
                            </button>
                        ))}
                        {/* Clear selected language button */}
                        {selectedLanguage && (
                            <button
                                onClick={() => setSelectedLanguage(null)}
                                className="flex items-center gap-1 px-2 py-1.5 text-xs transition-colors duration-300 bg-gray-500/20 text-gray-400 hover:bg-red-500/20 hover:text-red-400 cursor-pointer rounded-lg"
                            >
                                <X className="size-3.5" />
                                Clear
                            </button>
                        )}
                        <div className="ml-auto flex items-center gap-3">
                            {/* Snippets found message */}
                            <span className="text-sm font-semibold text-gray-400">
                                {filteredSnippets.length} {filteredSnippets.length > 1 ? ("snippets found") : ("snippet found")}
                            </span>
                            {/* View Toggle */}
                            <div className="flex items-center gap-0.5 px-2 py-1 bg-[#1b1b27] rounded-lg outline outline-gray-700">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md transition-all cursor-pointer ${viewMode === "grid"
                                        ? "bg-indigo-500/20 text-indigo-400"
                                        : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                                        }`}
                                >
                                    <Grid className="size-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-all cursor-pointer ${viewMode === "list"
                                        ? "bg-indigo-500/20 text-indigo-400"
                                        : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                                        }`}
                                >
                                    <Layers className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Snippets Grid */}
                <motion.div
                    className={`grid gap-6 ${viewMode === "grid"
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1 max-w-3xl mx-auto"
                        }`}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSnippets.map((snippet) => (
                            <SnippetCard key={snippet._id} snippet={snippet} />
                        ))}
                    </AnimatePresence>
                </motion.div>
                {/* In case no snippets were found during search or fetch */}
                {filteredSnippets.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-md mx-auto p-4 rounded-2xl overflow-hidden"
                    >
                        <div className="text-center">
                            <div
                                className="inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 outline outline-gray-700/50 mb-4"
                            >
                                <Code2 className="size-8 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-roboto-condensed mb-2">No Results</h3>
                            <p className="text-gray-400 mb-4">
                                {searchQuery || selectedLanguage
                                    ? "Try searching for something else"
                                    : "No snippets have been shared yet. It seems you will be the first!"}
                            </p>
                            {(searchQuery || selectedLanguage) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedLanguage(null);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b1b27] text-gray-300 hover:text-white rounded-lg transition-colors outline outline-gray-700/50 cursor-pointer"
                                >
                                    <X className="size-4" />
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default SnippetsPage