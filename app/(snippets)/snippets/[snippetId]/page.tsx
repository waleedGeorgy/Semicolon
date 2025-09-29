"use client"
import Image from "next/image";
import { useParams } from "next/navigation"
import { Calendar1, Code, MessageCircleCodeIcon, User2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(main)/_constants";
import Header from "@/app/components/Header";
import SnippetDetailsPageSkeleton from "./_components/SnippetDetailsPageSkeleton";
import CopyButton from "./_components/CopyButton";
import SnippetComments from "./_components/SnippetComments";

const SnippetDetailsPage = () => {
    const { snippetId } = useParams();

    const snippetDetails = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
    const snippetComments = useQuery(api.snippets.getSnippetComments, { snippetId: snippetId as Id<"snippets"> });

    if (snippetDetails === undefined) {
        return <SnippetDetailsPageSkeleton />
    }

    return (
        <div className="min-h-screen bg-[#141414]">
            <Header />
            <main className="p-5">
                <div className="grid grid-col-1 lg:grid-cols-[0.9fr_1.1fr] gap-5">
                    <section className="flex flex-col gap-3.5">
                        {/* Snippet details header */}
                        <div className="bg-[#1b1b27] border border-gray-700/50 rounded-2xl px-4 py-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    {/* Snippet language icon */}
                                    <div className="relative">
                                        <div
                                            className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur-sm opacity-50"
                                            area-hidden="true"
                                        />
                                        <div className="relative p-1.5 rounded-lg outline outline-gray-700/50 bg-gray-900">
                                            <Image
                                                src={`/${snippetDetails.language}.png`}
                                                alt={`${snippetDetails.language} logo`}
                                                className="size-11 object-contain relative z-10"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                    </div>
                                    {/* Snippet details */}
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-roboto-condensed mb-2">
                                            {snippetDetails.title}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <User2 className="size-4 text-indigo-400" />
                                                <span>{snippetDetails.username}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <Calendar1 className="size-4 text-indigo-400" />
                                                <span>{new Date(snippetDetails._creationTime).toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <MessageCircleCodeIcon className="size-4 text-indigo-400" />
                                                <span>{snippetComments?.length === 1 ? (<span>1 comment</span>) : (<span>{snippetComments?.length} comments</span>)} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SnippetComments snippetId={snippetDetails._id} />
                    </section>
                    {/* Code editor */}
                    <section className="rounded-2xl overflow-hidden border border-gray-700/50 bg-[#1b1b27] h-fit">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50">
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <Code className="size-4" />
                                <span className="text-sm">Source Code</span>
                            </div>
                            <CopyButton code={snippetDetails.code} />
                        </div>
                        <Editor
                            height="650px"
                            language={LANGUAGE_CONFIG[snippetDetails.language].monacoLanguage}
                            value={snippetDetails.code}
                            theme="vs-dark"
                            beforeMount={defineMonacoThemes}
                            options={{
                                minimap: { enabled: true },
                                fontSize: 16,
                                readOnly: true,
                                automaticLayout: true,
                                scrollBeyondLastLine: true,
                                padding: { top: 16 },
                                renderWhitespace: "selection",
                                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                                fontLigatures: true,
                            }}
                        />
                    </section>
                </div>
            </main>
        </div>
    )
}

export default SnippetDetailsPage