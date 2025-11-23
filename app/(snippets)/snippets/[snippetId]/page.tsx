"use client"
import Image from "next/image";
import { useParams } from "next/navigation"
import { Calendar1, Code, MessageCircleCodeIcon, User2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(main)/_constants";
import Header from "@/app/components/Header";
import SnippetDetailsPageSkeleton from "./_components/SnippetDetailsPageSkeleton";
import CopyButton from "./_components/CopyButton";
import SnippetComments from "./_components/SnippetComments";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const SnippetDetailsPage = () => {
    const { snippetId } = useParams();

    const snippetDetails = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
    const snippetComments = useQuery(api.snippets.getSnippetComments, { snippetId: snippetId as Id<"snippets"> });

    if (snippetDetails === undefined) {
        return <SnippetDetailsPageSkeleton />
    }

    return (
        <div className="min-h-screen bg-[#0e0e13]">
            <Header />
            <div className="p-4">
                <div className="xl:block hidden">
                    <ResizablePanelGroup direction="horizontal">
                        {/* Snippet details and comments */}
                        <ResizablePanel defaultSize={50} minSize={35}>
                            <section className="flex flex-col gap-2.5">
                                {/* Snippet details header */}
                                <div className="bg-[#1b1b27] border border-gray-700/50 rounded-lg px-4 py-5">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3.5">
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
                                                        className="size-10 object-contain relative z-10 flex-shrink-0"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                            </div>
                                            {/* Snippet details */}
                                            <div className="truncate">
                                                <h1 className="text-xl sm:text-2xl font-roboto-condensed mb-1 text-gray-300 truncate">
                                                    {snippetDetails.title}
                                                </h1>
                                                <div className="flex items-center gap-x-4 gap-y-2 text-sm">
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
                        </ResizablePanel>
                        <ResizableHandle className="bg-gray-600 hover:bg-indigo-400 duration-150 transition-all ease-in-out rounded-full mx-1.5 w-1.5 h-auto" />
                        <ResizablePanel defaultSize={50} minSize={30}>
                            {/* Code editor */}
                            {/* TODO: Add font size slider */}
                            <section className="rounded-lg overflow-hidden border border-gray-700/50 bg-[#1b1b27] h-fit">
                                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-700/50">
                                    <div className="flex items-center gap-1.5 text-gray-300">
                                        <Code className="size-4" />
                                        <span className="text-sm">Source Code</span>
                                    </div>
                                    <CopyButton code={snippetDetails.code} />
                                </div>
                                <Editor
                                    height="580px"
                                    language={LANGUAGE_CONFIG[snippetDetails.language].monacoLanguage}
                                    value={snippetDetails.code}
                                    theme="vs-dark"
                                    beforeMount={defineMonacoThemes}
                                    options={{
                                        minimap: { enabled: true },
                                        fontSize: 14,
                                        readOnly: true,
                                        automaticLayout: true,
                                        scrollBeyondLastLine: true,
                                        padding: { top: 12, bottom: 12 },
                                        renderWhitespace: "selection",
                                        fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                                        fontLigatures: true,
                                        scrollbar: {
                                            verticalScrollbarSize: 8,
                                            horizontalScrollbarSize: 8,
                                        },
                                        smoothScrolling: true,
                                        lineHeight: 1.6
                                    }}
                                />
                            </section>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
                <div className="grid grid-cols-1 gap-3 xl:hidden">
                    {/* Snippet details header */}
                    <div className="bg-[#1b1b27] border border-gray-700/50 rounded-lg px-4 py-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                {/* Snippet language icon */}
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur-sm opacity-50"
                                        area-hidden="true"
                                    />
                                    <div className="relative p-1.5 rounded-lg outline outline-gray-700/50 bg-gray-900">
                                        <Image
                                            src={`/${snippetDetails.language}.png`}
                                            alt={`${snippetDetails.language} logo`}
                                            className="size-10 object-contain relative z-10 flex-shrink-0"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                </div>
                                {/* Snippet details */}
                                <div className="relative min-w-0 flex-1">
                                    <h1 className="text-2xl font-roboto-condensed mb-1 text-gray-300 truncate">
                                        {snippetDetails.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <div className="flex items-center gap-1 text-gray-400 truncate">
                                            <User2 className="size-4 text-indigo-400" />
                                            <span className="truncate">{snippetDetails.username}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-400 truncate">
                                            <Calendar1 className="size-4 text-indigo-400" />
                                            <span className="truncate">{new Date(snippetDetails._creationTime).toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-400 truncate">
                                            <MessageCircleCodeIcon className="size-4 text-indigo-400" />
                                            <span className="truncate">{snippetComments?.length === 1 ? (<span>1 comment</span>) : (<span>{snippetComments?.length} comments</span>)} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="rounded-lg overflow-hidden border border-gray-700/50 bg-[#1b1b27] h-fit">
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-700/50">
                            <div className="flex items-center gap-1.5 text-gray-300">
                                <Code className="size-4" />
                                <span className="text-sm">Source Code</span>
                            </div>
                            <CopyButton code={snippetDetails.code} />
                        </div>
                        <Editor
                            height="580px"
                            language={LANGUAGE_CONFIG[snippetDetails.language].monacoLanguage}
                            value={snippetDetails.code}
                            theme="vs-dark"
                            beforeMount={defineMonacoThemes}
                            options={{
                                minimap: { enabled: true },
                                fontSize: 14,
                                readOnly: true,
                                automaticLayout: true,
                                scrollBeyondLastLine: true,
                                padding: { top: 12, bottom: 12 },
                                renderWhitespace: "selection",
                                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                                fontLigatures: true,
                                scrollbar: {
                                    verticalScrollbarSize: 8,
                                    horizontalScrollbarSize: 8,
                                },
                                smoothScrolling: true,
                                lineHeight: 1.6
                            }}
                        />
                    </section>
                    <SnippetComments snippetId={snippetDetails._id} />
                </div>
            </div>
        </div>
    )
}

export default SnippetDetailsPage