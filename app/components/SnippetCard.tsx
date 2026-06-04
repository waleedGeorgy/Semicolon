import { Calendar1, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { Snippet } from "@/app/types"
import StarSnippetButton from "@/app/components/StarSnippetButton";
import DeleteSnippetButton from "./DeleteSnippetButton";

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
    const { user } = useUser();

    return (
        <motion.div
            layout
            className="group relative"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
        >
            <Link href={`/snippets/${snippet._id}`}>
                <div className="relative h-full bg-[#1b1b27] rounded-xl outline outline-gray-700/50 hover:outline-2 hover:outline-gray-700/80 transition-colors duration-300 overflow-hidden">
                    <div className="p-4 space-y-4">
                        {/* Card header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div
                                        className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-lg blur-sm opacity-30 group-hover:opacity-55 transition-all duration-300"
                                        area-hidden="true"
                                    />
                                    <div className="relative p-1.5 rounded-lg outline outline-gray-700/50 hover:outline-gray-700 bg-gray-900 transition-all duration-300">
                                        <Image
                                            src={`/${snippet.language}.png`}
                                            alt={`${snippet.language} logo`}
                                            className="size-8 object-contain relative z-10"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 outline outline-gray-700/50 rounded text-sm w-fit font-mono">
                                        {snippet.language === "cpp" || snippet.language === "php" ?
                                            snippet.language === "cpp" ? ("C++") : ("PHP")
                                            :
                                            snippet.language[0].toUpperCase() + snippet.language.slice(1,)
                                        }
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Calendar1 className="size-3" />
                                        {new Date(snippet._creationTime).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 z-10 flex gap-2 items-center" onClick={(e) => e.preventDefault()}>
                                <StarSnippetButton snippetId={snippet._id} />
                                {user?.id === snippet.userId &&
                                    <DeleteSnippetButton snippetId={snippet._id} />
                                }
                            </div>
                        </div>
                        {/* Card contents */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                {/* Snippet title */}
                                <h2 className="text-2xl font-semibold font-roboto-condensed line-clamp-1 group-hover:text-indigo-400 transition-colors duration-200 text-gray-300">
                                    {snippet.title}
                                </h2>
                                {/* Snippet user */}
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <User2 className="size-4" />
                                        <span className="truncate">{snippet.username}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Snippet code */}
                            <div className="relative group/code">
                                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-indigo-500/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                                <pre className="relative bg-black/30 rounded-md px-3 py-2 overflow-hidden text-xs text-gray-300 font-mono line-clamp-8 outline outline-gray-700/50">
                                    {snippet.code}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div >
    )
}

export default SnippetCard;