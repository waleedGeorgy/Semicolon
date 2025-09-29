"use client";
import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

function CopyButton({ code }: { code: string }) {
    const [isOutputCopied, setIsOutputCopied] = useState(false);

    const handleOutputCopy = async () => {
        await navigator.clipboard.writeText(code);
        setIsOutputCopied(true);
        setTimeout(() => setIsOutputCopied(false), 4000);
    };

    return (
        <button
            onClick={handleOutputCopy}
            className={`group flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-gray-300 hover:text-gray-200 
            rounded-lg outline transition-all cursor-pointer ${isOutputCopied ? ("outline-emerald-500 hover:outline-emerald-500") : ("outline-gray-600 hover:outline-gray-500")}`}
        >
            {isOutputCopied ? (
                <>
                    <CopyCheck className="size-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                </>
            ) : (
                <>
                    <Copy className="size-3.5 text-gray-300 group-hover:text-gray-200" />
                    Copy
                </>
            )}
        </button>
    );
}

export default CopyButton;
