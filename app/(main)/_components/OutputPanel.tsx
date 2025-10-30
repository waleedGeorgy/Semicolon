"use client"
import { useState } from "react";
import { AlertTriangle, CheckCheck, Copy, CopyCheck, Hourglass, TerminalSquare } from "lucide-react";
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore"

const OutputPanel = () => {
  const { output, error, isRunning } = useCodeEditorStore();

  const [isOutputCopied, setIsOutputCopied] = useState(false);

  const outputHasContent = output || error;

  const handleOutputCopy = async () => {
    if (!outputHasContent) return;

    await navigator.clipboard.writeText(output || error as string);

    setIsOutputCopied(true);
    setTimeout(() => { setIsOutputCopied(false) }, 4000);
  }

  return (
    <div className="bg-[#1b1b27] rounded-xl px-4 py-3">
      {/* Output header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <TerminalSquare className="size-4 text-indigo-400" />
          <span className="font-light font-roboto-condensed text-gray-300">Output</span>
        </div>
        {/* Copy button */}
        {outputHasContent && (
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
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      {/* Output Area */}
      <div className="relative bg-[#1e1e2e] backdrop-blur-sm outline outline-slate-700 rounded-sm p-4 h-[600px] overflow-auto font-mono">
        {isRunning ? (
          <h2 className="font-mono font-light animate-pulse">Running...</h2>
        ) : error ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <AlertTriangle className="size-6 flex-shrink-0 pb-1" />
              <span className="font-light text-xs">An error occurred...</span>
            </div>
            <pre className="whitespace-pre-wrap text-red-400/75">{error}</pre>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCheck className="size-5 flex-shrink-0" />
              <span className="font-light text-xs">Code ran successfully!</span>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
            <Hourglass className="size-8 animate-spin-with-delay" />
            <p className="text-center text-sm">Waiting for your code...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPanel