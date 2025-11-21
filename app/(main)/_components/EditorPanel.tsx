"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { RotateCcw, Share, Type } from "lucide-react";
import { motion } from "framer-motion"
import { Editor } from "@monaco-editor/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore"
import useMounted from "@/app/hooks/useMounted";
import ShareCodeSnippetDialog from "./ShareCodeSnippetDialog";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import RunButton from "./RunButton";

const EditorPanel = () => {
  const { editor, fontSize, theme, language, setFontSize, setEditor } = useCodeEditorStore();

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  }

  const handleFontSizeChange = (newFontSize: number) => {
    const currentFontSize = Math.min(Math.max(newFontSize, 12), 24);
    setFontSize(currentFontSize);
    localStorage.setItem("editor-font-size", currentFontSize.toString());
  }

  const handleResetEditor = () => {
    if (editor) editor.setValue(LANGUAGE_CONFIG[language].defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  }

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;

    if (editor) editor.setValue(newCode)
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  if (!mounted) return null;

  return (
    <section className="bg-[#1b1b27] rounded-md p-2.5 relative overflow-hidden">
      {/* Code editor header */}
      <div className="flex items-center gap-2 pb-2.5 truncate">
        <Image src={"/" + language + ".png"} alt={`Logo of ${language}`} width={30} height={30} className="flex-shrink-0" />
        {/* Font size slider */}
        <div className="flex items-center gap-3 px-3 py-1 bg-[#1e1e2e] rounded-md outline outline-gray-700">
          <Type className="size-4 text-gray-400" />
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
              className="w-24 h-1 cursor-grab"
            />
            <span className="text-sm text-gray-300">
              {fontSize}
            </span>
          </div>
        </div>
        {/* Code reset button */}
        <motion.button
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetEditor}
          className="py-1.5 px-3 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-md outline outline-gray-700 transition-colors cursor-pointer"
          aria-label="Reset to default code button"
        >
          <RotateCcw className="size-4 text-gray-300" />
        </motion.button>
        {/* Run button */}
        <SignedIn>
          <RunButton />
        </SignedIn>
        {/* Share code snippet button */}
        <SignedIn>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsShareDialogOpen(true)}
            className="inline-flex ml-auto items-center gap-1.5 px-3 py-1 rounded-md overflow-hidden text-gray-300 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-colors duration-300 cursor-pointer"
          >
            <Share className="size-3.5 flex-shrink-0" />
            <span className="text-sm hidden md:inline-block">Share</span>
          </motion.button>
        </SignedIn>
        <SignedOut>
          <p className="text-xs font-light opacity-50 ml-auto">Sign in to run and share your snippets</p>
        </SignedOut>
      </div>
      {/* Code editor body  */}
      <div className="group rounded overflow-hidden outline outline-slate-700">
        <Editor
          height="586px"
          language={LANGUAGE_CONFIG[language].monacoLanguage}
          onChange={handleEditorChange}
          theme={theme}
          beforeMount={defineMonacoThemes}
          onMount={(editor) => setEditor(editor)}
          options={{
            minimap: { enabled: true },
            fontSize,
            automaticLayout: true,
            scrollBeyondLastLine: true,
            padding: { top: 12, bottom: 12 },
            fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
            fontLigatures: true,
            cursorBlinking: "smooth",
            smoothScrolling: true,
            contextmenu: true,
            renderLineHighlight: "all",
            lineHeight: 1.6,
            roundedSelection: false,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>
      {isShareDialogOpen && <ShareCodeSnippetDialog closeDialog={() => setIsShareDialogOpen(false)} />}
    </section>
  )
}

export default EditorPanel