import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createToast } from "@/app/components/Toast";
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";

const ShareCodeSnippetDialog = ({ closeDialog }: { closeDialog: () => void }) => {
    const [snippetTitle, setSnippetTitle] = useState("");
    const [isSnippetSharing, setIsSnippetSharing] = useState(false);

    const { language, getCode } = useCodeEditorStore();

    const createCodeSnippet = useMutation(api.snippets.createCodeSnippet);

    const handleShareSnippet = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSnippetSharing(true);

        try {
            const code = getCode();
            await createCodeSnippet({ title: snippetTitle, code, language });
            closeDialog();
            setSnippetTitle("");
            createToast("success", "Snippet created successfully!")
        } catch (error) {
            console.log(error);
            createToast("error", "Failed to create snippet")
        } finally {
            setIsSnippetSharing(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1b1b27] outline outline-gray-700 shadow-xl rounded-lg px-5 py-4 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-roboto-condensed text-gray-300">Share Snippet</h2>
                    <button onClick={closeDialog} className="text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-200">
                        <X className="size-5" />
                    </button>
                </div>
                <form onSubmit={handleShareSnippet}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm text-gray-400 mb-1.5">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={snippetTitle}
                            onChange={(e) => setSnippetTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-[#181825] border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={closeDialog}
                            className="px-4 py-1.5 text-gray-300 hover:text-gray-200 rounded-lg cursor-pointer transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSnippetSharing}
                            className="px-4 py-1.5 rounded-lg text-gray-300 hover:text-gray-200 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-colors duration-300 cursor-pointer disabled:opacity-50"
                        >
                            {isSnippetSharing ? <span className="flex flex-row items-center gap-2"><Loader2 className="size-4 animate-spin" />Sharing</span> : <span>Share</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShareCodeSnippetDialog;