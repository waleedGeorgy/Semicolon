"use client"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useAuth } from "@clerk/nextjs"
import { Loader, Star } from "lucide-react"

const StarSnippetButton = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
    const { isSignedIn } = useAuth();
    const starCodeSnippet = useMutation(api.snippets.starCodeSnippet);

    const snippetStarCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
    const isSnippetStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });

    const handleStarSnippet = async () => {
        if (!isSignedIn) return;
        await starCodeSnippet({ snippetId });
    }

    return (
        <button
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${isSnippetStarred
                ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
                }`}
            onClick={handleStarSnippet}
        >
            {snippetStarCount === undefined && isSnippetStarred === undefined ?
                (<Loader className="size-4 animate-spin" />)
                :
                (<>
                    <Star className={`size-4 ${isSnippetStarred ? "fill-yellow-500" : "fill-none"}`} />
                    <span className={`text-xs font-medium ${isSnippetStarred ? "text-yellow-500" : "text-gray-400"}`}>
                        {snippetStarCount}
                    </span>
                </>)
            }
        </button >
    )
}

export default StarSnippetButton;