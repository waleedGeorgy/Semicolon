"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";

export default function ResponsiveResizableGroup() {
    const isLgScreen = useMediaQuery("(min-width: 1024px)");

    return (
        <ResizablePanelGroup
            direction={isLgScreen ? "horizontal" : "vertical"}
            className={isLgScreen ? "min-h-full" : "min-h-screen"}
        >
            <ResizablePanel defaultSize={50} minSize={isLgScreen ? 0 : 6.5}>
                <EditorPanel />
            </ResizablePanel>
            <ResizableHandle className={`${isLgScreen ? "mx-1 w-1" : "my-1 min-h-1"} bg-gray-600 hover:bg-indigo-400 duration-75 transition-all ease-in-out rounded-full hid`} />
            <ResizablePanel defaultSize={50} minSize={isLgScreen ? 0 : 6.5}>
                <OutputPanel />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}