import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import EditorPanel from "./_components/EditorPanel";
import HeaderWithCodeButtons from "./_components/HeaderWithCodeButtons";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0e0e13] font-sans">
      <div className="w-full p-3">
        <HeaderWithCodeButtons />
        <div className="xl:block hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60}>
              <EditorPanel />
            </ResizablePanel>
            <ResizableHandle className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200 mx-2 w-1.5 rounded-full" />
            <ResizablePanel defaultSize={40}>
              <OutputPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="grid grid-cols-1 gap-3 xl:hidden">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </main>
  );
}
