import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Calendar1, Trash2, User2 } from "lucide-react";
import { Snippet } from "@/app/types"
import { createToast } from "@/app/components/Toast";
import StarSnippetButton from "@/app/components/StarSnippetButton";

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
    const { user } = useUser();

    const deleteCodeSnippet = useMutation(api.snippets.deleteCodeSnippet);

    const [isSnippetDeleting, setIsSnippetDeleting] = useState(false);

    const handleDeleteSnippet = async () => {
        setIsSnippetDeleting(true);

        try {
            await deleteCodeSnippet({ snippetId: snippet._id });
            createToast("success", "Snippet deleted successfully");
        } catch (error) {
            console.log(error);
            createToast("error", "Failed to delete the snippet")
        } finally {
            setIsSnippetDeleting(false);
        }
    }

    return (
        <motion.div
            layout
            className="group relative"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
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
                                            onClick={handleDeleteSnippet}
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
    )
}

export default SnippetCard;