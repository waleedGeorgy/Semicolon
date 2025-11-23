"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";

export default function ResponsiveResizableGroup() {
    const isXlScreen = useMediaQuery("(min-width: 1280px)");

    return (
        <ResizablePanelGroup
            direction={isXlScreen ? "horizontal" : "vertical"}
            className={isXlScreen ? "min-h-full" : "min-h-screen"}
        >
            <ResizablePanel defaultSize={50} minSize={isXlScreen ? 0 : 6.5}>
                <EditorPanel />
            </ResizablePanel>
            <ResizableHandle className={`${isXlScreen ? "mx-1.5 w-1.5 h-auto" : "my-1.5 min-h-1.5"} bg-gray-600 hover:bg-indigo-400 duration-150 transition-all ease-in-out rounded-full`} />
            <ResizablePanel defaultSize={50} minSize={isXlScreen ? 0 : 6.5}>
                <OutputPanel />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}