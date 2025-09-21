import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 font-sans">
      <div className="w-full p-3">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EditorPanel />
            <OutputPanel />
        </div>
      </div>
    </main>
  );
}
