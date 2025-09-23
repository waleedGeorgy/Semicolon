"use client"
import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock3, Copy, CopyCheck, TerminalSquare } from "lucide-react";
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore"

const OutputPanel = () => {
  const { output, error, isRunning } = useCodeEditorStore();

  const [isOutputCopied, setIsOutputCopied] = useState(false);

  const handleOutputCopy = async () => {
    if (!output || !error) return;

    await navigator.clipboard.writeText(output || error);

    setIsOutputCopied(true);
    setTimeout(() => { setIsOutputCopied(false) }, 3000);
  }
  return (
    <div className="bg-[#12121a]/95 rounded-xl px-4 py-3 border border-stone-700/50">
      {/* Output header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TerminalSquare className="size-5 text-blue-400" />
          <span className="font-light font-roboto-condensed tracking-wide">Output</span>
        </div>
        {/* Copy button */}
        {output || error && (
          <button
            onClick={handleOutputCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isOutputCopied ? (
              <>
                <CopyCheck className="size-3.5 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
      {/* Output Area */}
      <div
        className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm"
      >
        {isRunning ? (
          <div>Running...</div>
        ) : error ? (
          <div className="flex items-start gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <div className="font-medium">An error occurred...</div>
              <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Code run successfully!</span>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
            <div className="flex items-center justify-center p-2.5 rounded-lg ring-1 ring-gray-700/50 animate-bounce">
              <Clock3 className="size-7" />
            </div>
            <p className="text-center">Waiting for your code...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPanel