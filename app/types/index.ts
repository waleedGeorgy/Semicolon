import { editor } from "monaco-editor";
import { Id } from "../../convex/_generated/dataModel";

export interface Theme {
  id: string;
  label: string;
  color: string;
}

export interface Language {
  id: string;
  label: string;
  logoPath: string;
  monacoLanguage: string;
  defaultCode: string;
  pistonRuntime: LanguageRuntime;
}

export interface LanguageRuntime {
  language: string;
  version: string;
}

export interface ExecuteCodeResponse {
  compile?: {
    output: string;
  };
  run?: {
    output: string;
    stderr: string;
  };
}

export interface RunResult {
  code: string;
  output: string;
  error: string | null;
}

export interface CodeEditorState {
  language: string;
  output: string;
  isRunning: boolean;
  error: string | null;
  theme: string;
  fontSize: number;
  editor: editor.IStandaloneCodeEditor | null;
  runResult: RunResult | null;

  setEditor: (editor: editor.IStandaloneCodeEditor) => void;
  getCode: () => string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  runCode: () => Promise<void>;
}

export interface Snippet {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  username: string;
}

export interface Comment {
  _id: Id<"snippetComments">;
  _creationTime: number;
  userId: string;
  username: string;
  snippetId: Id<"snippets">;
  contents: string;
}

export interface UserStats {
  totalCodeRuns: number;
  languagesCount: number;
  languages: string[];
  codeRunsLanguageStats: Record<string, number>;
  codeRunsLast24Hours: number;
  favoriteLanguage: string;
  mostStarredLanguage: string;
}

export interface UserData {
  _id: Id<"users">;
  _creationTime: number;
  proSince?: string | undefined;
  lsCustomerId?: string | undefined;
  lsOrderId?: string | undefined;
  userId: string;
  name: string;
  email: string;
  isPro: boolean;
}
