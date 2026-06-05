'use client'
import { useState } from "react";
import { createToast } from "./Toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Trash2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

const DeleteSnippetButton = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
    const [isSnippetDeleting, setIsSnippetDeleting] = useState(false);

    const deleteCodeSnippet = useMutation(api.snippets.deleteCodeSnippet);

    const router = useRouter();

    const handleDeleteSnippet = async () => {
        setIsSnippetDeleting(true);

        if (window.location.pathname.includes('/snippets/')) router.push("/snippets");

        try {
            await deleteCodeSnippet({ snippetId: snippetId });
            createToast("success", "Snippet deleted successfully");

        } catch (error) {
            console.log(error);
            createToast("error", "Failed to delete the snippet");
            if (window.location.pathname.includes('/snippets/')) router.back();
        } finally {
            setIsSnippetDeleting(false);
        }
    }

    return (
        <div
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
        >
            <button
                onClick={handleDeleteSnippet}
                disabled={isSnippetDeleting}
                className={`group px-3 py-1.5 rounded-md transition-all duration-200 ${isSnippetDeleting ? "bg-red-500/20 text-red-400 cursor-not-allowed" : "bg-gray-500/20 text-gray-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"}`}
            >
                {isSnippetDeleting ?
                    <div className="size-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                    :
                    <Trash2 className="size-4" />
                }
            </button>
        </div>
    )
}

export default DeleteSnippetButton