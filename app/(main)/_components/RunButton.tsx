"use client"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Play } from "lucide-react"
import { getCodeRunResults, useCodeEditorStore } from "@/app/store/useCodeEditorStore";

const RunButton = () => {
  const user = useUser();

  const { runCode, isRunning, language } = useCodeEditorStore();

  const saveCodeRun = useMutation(api.codeRuns.saveCodeRun);

  const handleCodeRun = async () => {
    await runCode();

    const runResult = getCodeRunResults();

    if (user && runResult) {
      await saveCodeRun({
        language,
        code: runResult.code,
        output: runResult.output || undefined,
        error: runResult.error || undefined
      })
    }
  }

  return (
    <>
      <button disabled={isRunning} className="group flex flex-row items-center gap-1.5 border border-emerald-500/50 bg-emerald-400/20 px-3 py-1.5 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-emerald-400/25 transition-colors duration-300" onClick={handleCodeRun}>
        {isRunning ?
          (<>
            <Loader2 className="size-4 animate-spin" />
            <span className="text-sm">Running</span>
          </>) : (
            <>
              <Play className="size-4 text-emerald-400/60 group-hover:text-emerald-500 transition-colors duration-300" />
              <span className="text-sm">Run</span>
            </>
          )
        }
      </button>
    </>
  )
}

export default RunButton