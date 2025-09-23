import { create } from "zustand";
import { CodeEditorState } from "../types";
import type { editor } from "monaco-editor";

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
  output: "",
  editor: null,
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

  runCode: async () => {},
}));
