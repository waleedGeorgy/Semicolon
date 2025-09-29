"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"
import { Editor } from "@monaco-editor/react";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore"
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import useMounted from "@/app/hooks/useMounted";
import ShareCodeSnippetDialog from "./ShareCodeSnippetDialog";

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
    <div className="bg-[#1b1b27] rounded-xl px-5 py-4 relative">
      {/* Code editor header */}
      <div className="flex items-center gap-3 mb-4">
        <Image src={"/" + language + ".png"} alt={`Logo of ${language}`} width={32} height={32} />
        {/* Font Size Slider */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-[#1e1e2e] rounded-lg outline outline-gray-700">
          <TypeIcon className="size-4 text-gray-400" />
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
              className="w-20 h-1 cursor-grab"
            />
            <span className="text-sm">
              {fontSize}
            </span>
          </div>
        </div>
        {/* Code reset button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetEditor}
          className="py-2 px-4 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg outline outline-gray-700 transition-colors cursor-pointer"
          aria-label="Reset to default code button"
        >
          <RotateCcwIcon className="size-4" />
        </motion.button>
        {/* Share code snippet button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsShareDialogOpen(true)}
          className="inline-flex ml-auto items-center gap-1.5 px-3.5 py-1.5 rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500/75 to-indigo-600/75 hover:from-indigo-400/75 hover:to-indigo-700/75 transition-colors duration-300 cursor-pointer"
        >
          <ShareIcon className="size-4" />
          <span className="text-sm">Share snippet</span>
        </motion.button>
      </div>
      {/* Code editor body  */}
      <div className="group rounded-sm overflow-hidden outline outline-slate-700">
        <Editor
          height="588px"
          language={LANGUAGE_CONFIG[language].monacoLanguage}
          onChange={handleEditorChange}
          theme={theme}
          beforeMount={defineMonacoThemes}
          onMount={(editor) => setEditor(editor)}
          options={{
            minimap: { enabled: false },
            fontSize,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
            fontLigatures: true,
            cursorBlinking: "smooth",
            smoothScrolling: true,
            contextmenu: true,
            renderLineHighlight: "all",
            lineHeight: 1.7,
            roundedSelection: false,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>
      {isShareDialogOpen && <ShareCodeSnippetDialog closeDialog={() => setIsShareDialogOpen(false)} />}
    </div>
  )
}

export default EditorPanel