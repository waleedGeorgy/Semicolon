"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface ExpandableCodeBlockProps {
    code: string;
    language: string;
}

const ExpandableCodeBlock = ({ code, language }: ExpandableCodeBlockProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const lines = code.split("\n");
    const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

    return (
        <div className="relative">
            <SyntaxHighlighter
                language={language.toLowerCase()}
                style={atomOneDark}
                customStyle={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: '#171717',
                    border: "1px solid rgba(54, 65, 83, 0.5)",
                    margin: 0,
                }}
            >
                {displayCode}
            </SyntaxHighlighter>
            {lines.length > 6 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute bottom-2 right-2 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs hover:bg-indigo-500/30 transition-colors cursor-pointer"
                >
                    {isExpanded ?
                        (<span className="flex flex-row items-center gap-1">Show Less <ChevronUp className="size-3" /></span>)
                        :
                        (<span className="flex flex-row items-center gap-1">Show More <ChevronDown className="size-3" /></span>)
                    }
                </button>
            )}
        </div>
    );
};

export default ExpandableCodeBlock;
