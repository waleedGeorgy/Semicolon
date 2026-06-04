"use client"
import { Loader, Star } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useEffect, useState } from "react"

const StarSnippetButton = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
    const { isSignedIn } = useAuth();
    const starCodeSnippet = useMutation(api.snippets.starCodeSnippet);

    const getSnippetStarCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
    const isSnippetStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });

    const [snippetStarCount, setSnippetStarCount] = useState(getSnippetStarCount);

    useEffect(() => {
        if (getSnippetStarCount !== undefined) {
            setSnippetStarCount(getSnippetStarCount);
        }
    }, [getSnippetStarCount]);

    const handleStarSnippet = async () => {
        if (!isSignedIn) return;

        setSnippetStarCount(prev => (prev ?? 0) + 1);

        try {
            await starCodeSnippet({ snippetId });
        } catch (error) {
            console.error(error);
            setSnippetStarCount(getSnippetStarCount ?? 0);
        }
    }

    return (
        <button
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer text-yellow-500
                 ${isSnippetStarred ? "bg-yellow-500/20 hover:bg-gray-500/20" : "bg-gray-500/20 hover:bg-yellow-500/20"} disabled:opacity-60 disabled:pointer-events-none`}
            onClick={handleStarSnippet}
            disabled={snippetStarCount === undefined || isSnippetStarred === undefined}
        >
            {snippetStarCount === undefined && isSnippetStarred === undefined ?
                <>
                    <Star className={`size-3.5 ${isSnippetStarred ? "fill-yellow-500" : "fill-none"}`} />
                    <Loader className="size-3.5 animate-spin" />
                </>
                :
                <>
                    <Star className={`size-3.5 ${isSnippetStarred ? "fill-yellow-500" : "fill-none"}`} />
                    <span className={`text-xs font-medium ${isSnippetStarred ? "text-yellow-500" : "text-gray-400"}`}>
                        {snippetStarCount}
                    </span>
                </>
            }
        </button >
    )
}

export default StarSnippetButton;