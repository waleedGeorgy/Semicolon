import { create } from "zustand";
import { CodeEditorState } from "../types";
import type { editor } from "monaco-editor";
import { LANGUAGE_CONFIG } from "../(main)/_constants";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 14,
      theme: "vs-dark",
    };
  }

  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedFontSize = localStorage.getItem("editor-font-size") || 14;
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";

  return {
    language: savedLanguage,
    fontSize: Number(savedFontSize),
    theme: savedTheme,
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => ({
  ...getInitialState(),
  editor: null,
  output: "",
  error: null,
  runResult: null,
  isRunning: false,

  getCode: () => {
    const editorInstance = get().editor;
    return editorInstance?.getValue() || "";
  },

  setEditor: (editorInstance: editor.IStandaloneCodeEditor) => {
    const savedCode = localStorage.getItem(`editor-code-${get().language}`);
    if (savedCode) {
      editorInstance.setValue(savedCode);
    }

    set({ editor: editorInstance });
  },

  setTheme: (theme: string) => {
    localStorage.setItem("editor-theme", theme);
    set({ theme });
  },

  setFontSize: (fontSize: number) => {
    localStorage.setItem("editor-font-size", fontSize.toString());
    set({ fontSize });
  },

  setLanguage: (language: string) => {
    const currentEditor = get().editor;
    const currentCode = currentEditor?.getValue();

    if (currentCode) {
      localStorage.setItem(`editor-code-${get().language}`, currentCode);
    }

    localStorage.setItem("editor-language", language);

    set({
      language,
      output: "",
      error: null,
    });
  },

  runCode: async () => {
    const { language, getCode } = get();
    const code = getCode();

    if (!code) {
      set({ error: "No code to run." });
      return;
    }

    set({ output: "", error: null, isRunning: true });

    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{ content: code }],
        }),
      });

      const data = await res.json();
      if (data.message) {
        set({
          error: data.message,
          runResult: { code, output: "", error: data.message },
        });
        return;
      }

      if (data.compile && data.compile.code !== 0) {
        const compilationError = data.compile.stderr || data.compile.output;
        set({
          error: compilationError,
          runResult: { output: "", code, error: compilationError },
        });
        return;
      }

      if (data.run && data.run.code !== 0) {
        const interpretationError = data.run.stderr || data.run.output;
        set({
          error: interpretationError,
          runResult: { output: "", code, error: interpretationError },
        });
        return;
      }

      const output = data.run.output;

      set({
        output: output.trim(),
        error: null,
        runResult: { output: output.trim(), code, error: null },
      });
    } catch (error) {
      console.log(error);
      set({
        error: "Failed to run the code",
        runResult: { error: "Failed to run the code", output: "", code },
      });
    } finally {
      set({ isRunning: false });
    }
  },
}));

export const getCodeRunResults = () => useCodeEditorStore.getState().runResult;
