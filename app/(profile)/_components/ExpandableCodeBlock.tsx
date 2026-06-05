"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ExpandableCodeBlock = ({ code, language }: { code: string; language: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [collapsedHeight, setCollapsedHeight] = useState(0);

    const collapsedRef = useRef<HTMLDivElement>(null);
    const expandedRef = useRef<HTMLDivElement>(null);

    const lines = code.split("\n");
    const collapsedCode = lines.slice(0, 6).join("\n");

    useEffect(() => {
        if (collapsedRef.current) {
            setCollapsedHeight(collapsedRef.current.scrollHeight);
        }
    }, [collapsedCode]);

    const expandedHeight = expandedRef.current?.scrollHeight || 0;

    return (
        <div className="relative">
            <div ref={collapsedRef} className="absolute invisible" aria-hidden="true">
                <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={atomOneDark}
                    customStyle={{
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        backgroundColor: '#171717',
                        border: "1px solid rgba(54, 65, 83, 0.5)",
                        margin: 0,
                        fontSize: "0.875rem",
                    }}
                >
                    {collapsedCode}
                </SyntaxHighlighter>
            </div>
            <div ref={expandedRef} className="absolute invisible" aria-hidden="true">
                <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={atomOneDark}
                    customStyle={{
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        backgroundColor: '#171717',
                        border: "1px solid rgba(54, 65, 83, 0.5)",
                        margin: 0,
                        fontSize: "0.875rem",
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: isExpanded ? `${expandedHeight}px` : `${collapsedHeight}px` }}
            >
                <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={atomOneDark}
                    customStyle={{
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        backgroundColor: '#171717',
                        border: "1px solid rgba(54, 65, 83, 0.5)",
                        margin: 0,
                        fontSize: "0.875rem",
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            {lines.length > 5 &&
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute bottom-2 right-2 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs hover:bg-indigo-500/30 transition-colors cursor-pointer group"
                >
                    <span className="flex flex-row items-center gap-1">
                        {isExpanded ? "Show Less" : "Show More"}
                        <ChevronDown className={`size-3 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`} />
                    </span>
                </button>
            }
        </div>
    );
};

export default ExpandableCodeBlock;