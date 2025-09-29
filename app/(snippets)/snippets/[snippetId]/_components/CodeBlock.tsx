import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "./CopyButton";

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
    const trimmedCode = code
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n");

    const formattedLanguage = language === "cpp" ? "C++" : language[0].toLocaleUpperCase() + language.slice(1,);

    return (
        <div className="mb-3 bg-gray-950 rounded-lg overflow-hidden border border-gray-700/50">
            {/* Code block header */}
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-gray-900">
                <div className="flex items-center gap-1.5">
                    <Image src={`/${language}.png`} alt={language} width={10} height={10} className="size-5 object-contain" />
                    <span className="text-sm text-gray-400">{formattedLanguage || "plaintext"}</span>
                </div>
                <CopyButton code={trimmedCode} />
            </div>
            {/* Code block body with syntax highlighting */}
            <SyntaxHighlighter
                language={language || "plaintext"}
                style={atomOneDark}
                customStyle={{
                    padding: "1rem",
                    background: "transparent",
                }}
                showLineNumbers={true}
                wrapLines={true}
            >
                {trimmedCode}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
