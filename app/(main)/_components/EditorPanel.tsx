"use client"
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore"
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { motion } from "framer-motion"
import { Editor } from "@monaco-editor/react";
import useMounted from "@/app/hooks/useMounted";

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
    <div className="bg-[#12121a]/95 backdrop-blur rounded-xl border border-stone-700/50 px-5 py-4">
      {/* Code editor header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
          <h2 className="font-roboto-condensed font-light text-lg">Code Editor</h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Font Size Slider */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-[#1e1e2e] rounded-lg outline outline-gray-700/50">
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
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetEditor}
            className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg outline outline-gray-700/50 transition-colors cursor-pointer"
            aria-label="Reset to default code"
          >
            <RotateCcwIcon className="size-4" />
          </motion.button>
          {/* Share code snippet button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsShareDialogOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500/75 to-indigo-600/75 opacity-85 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            <ShareIcon className="size-4" />
            <span className="text-sm">Share snippet</span>
          </motion.button>
        </div>
      </div>
      {/* Code editor body  */}
      <div className="group rounded-sm overflow-hidden outline outline-gray-700/50">
        <Editor
          height="582px"
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
    </div>
  )
}

export default EditorPanel