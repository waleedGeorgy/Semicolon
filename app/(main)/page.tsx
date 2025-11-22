import EditorPanel from "./_components/EditorPanel";
import HeaderWithCodeButtons from "./_components/HeaderWithCodeButtons";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0e0e13] font-sans">
      <div className="w-full p-3">
        <HeaderWithCodeButtons />
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-3">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </main>
  );
}
