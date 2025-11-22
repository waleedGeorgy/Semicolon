import Image from "next/image";
import { motion } from "framer-motion"
import { Terminal, Timer, Star, Trophy, Code, TrendingUp, Mail } from "lucide-react";
import { UserResource } from "@clerk/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserData, UserStats } from "@/app/types"

const ProfileHero = ({ user, userStats, userData }: { userStats: UserStats, userData: UserData, user: UserResource }) => {
    const starredSnippets = useQuery(api.snippets.getStarredSnippets);

    const STATS = [
        {
            label: "Total code runs",
            value: userStats?.totalCodeRuns ?? 0,
            icon: Terminal,
            color: "from-emerald-500 to-green-500",
            gradient: "group-hover:via-emerald-400",
            metric: {
                label: "Last 24h",
                value: userStats?.codeRunsLast24Hours ?? 0,
                icon: Timer,
            },
        },
        {
            label: "Total snippets starred",
            value: starredSnippets?.length ?? 0,
            icon: Star,
            color: "from-yellow-500 to-orange-500",
            gradient: "group-hover:via-yellow-400",
            metric: {
                label: "Most starred",
                value: userStats?.mostStarredLanguage ?? "N/A",
                icon: Trophy,
            },
        },
        {
            label: "Total languages used",
            value: userStats?.languagesCount ?? 0,
            icon: Code,
            color: "from-purple-500 to-indigo-500",
            gradient: "group-hover:via-purple-400",
            metric: {
                label: "Most used",
                value: userStats?.favoriteLanguage ?? "N/A",
                icon: TrendingUp,
            },
        },
    ];

    return (
        <div className="relative mb-8 bg-[#1b1b27] font-sans rounded-2xl p-7 border border-gray-700/50 overflow-hidden">
            {/* User profile info */}
            <div className="relative flex items-center gap-5">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-lg opacity-60" />
                    <Image
                        src={user.imageUrl}
                        alt="Profile"
                        className="size-32 rounded-full border border-gray-700/50 relative z-10"
                        width={120}
                        height={120}
                    />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-5xl font-roboto-condensed text-gray-300">{userData.name}</h1>
                        {userData.isPro && (
                            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                                Pro Member
                            </span>
                        )}
                    </div>
                    <div className="flex flex-row items-center gap-3 text-base font-light text-gray-300">
                        <p className="flex items-center gap-1.5">
                            <Mail className="size-4 text-indigo-400" />
                            {userData.email}
                        </p>
                        <span className="text-xl font-bold text-gray-300">•</span>
                        <p>
                            <span className="text-indigo-400">Member since:</span> {new Date(userData._creationTime).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                    </div>
                </div>
            </div>
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {STATS.map((stat, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        key={index}
                        className="group relative bg-neutral-950 rounded-xl overflow-hidden shadow-black shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-all duration-500 ${stat.gradient}`} />
                        {/* Contents */}
                        <div className="relative px-5 py-4">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-300">
                                        {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                                </div>
                                <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                    <stat.icon className="size-5 text-white" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 pt-3 border-t border-gray-700/50">
                                <stat.metric.icon className="size-4 text-gray-400" />
                                <span className="text-sm text-gray-400">{stat.metric.label}:</span>
                                <span className="text-sm font-medium text-gray-300">
                                    {typeof stat.metric.value === "string" && stat.metric.value === "C++" && ("C++")}
                                    {typeof stat.metric.value === "string" && stat.metric.value !== "C++" && (stat.metric.value[0].toUpperCase() + stat.metric.value.slice(1,))}
                                    {typeof stat.metric.value === "number" && (stat.metric.value)}
                                </span>
                            </div>
                        </div>
                        {/* Reflection hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform" />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ProfileHero