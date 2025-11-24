import EditorHeader from "./_components/EditorHeader";
import ResponsiveCodeEditor from "./_components/ResponsiveCodeEditor";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0e0e13] font-sans">
      <div className="w-full p-3">
        <EditorHeader />
        <ResponsiveCodeEditor />
      </div>
    </main>
  );
}