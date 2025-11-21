import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import CommentFormatter from "./CommentFormatter";

const CommentForm = ({ addComment, isSubmitting }: { isSubmitting: boolean, addComment: (contents: string) => Promise<void> }) => {
    const [comment, setComment] = useState<string>("");
    const [isPreview, setIsPreview] = useState<boolean>(false);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment || comment.trim().length === 0) return;

        await addComment(comment);

        setComment("");
        setIsPreview(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const newComment = comment.substring(0, start) + "  " + comment.substring(end);
            setComment(newComment);
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 3;
        }
    };

    return (
        <form onSubmit={handleAddComment} className="mb-6">
            <div className="bg-gray-950 rounded-xl overflow-hidden">
                {/* Comment form header */}
                <div className="flex items-center justify-end px-3 pt-1.5">
                    <button
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                        className={`text-sm px-3.5 py-1 cursor-pointer rounded-md transition-colors ${isPreview ? "bg-indigo-500/10 text-indigo-400" : "hover:bg-[#ffffff08] text-gray-400 hover:text-gray-300"}`}
                    >
                        {isPreview ? "Edit" : "Preview"}
                    </button>
                </div>
                {/* Comment form body */}
                {isPreview ? (
                    <div className="min-h-32 p-3">
                        <CommentFormatter contents={comment} />
                    </div>
                ) : (
                    <textarea
                        id="snippet-comment"
                        value={comment}
                        autoFocus
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add comment..."
                        className="w-full bg-transparent border-0 text-gray-200 placeholder:text-gray-400 outline-none resize-none min-h-32 px-4 py-2 font-mono text-sm"
                    />
                )}
                {/* Comment form footer */}
                <div className="flex items-center justify-between gap-4 px-4 py-3 bg-neutral-950 border-t border-gray-700/50">
                    <div className="hidden sm:block text-xs text-gray-400 space-y-0.5">
                        <div className="space-y-0.5">
                            <p>Format code with <span className="italic text-indigo-400">```language</span>.</p>
                            <p>Click on <span className="italic text-indigo-400">Preview</span> to check comment formatting.</p>
                            <p>Press <span className="italic text-indigo-400">Tab</span> to insert spaces or indentation.</p>
                        </div>
                    </div>
                    {/* Add comment button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !comment.trim()}
                        className="flex items-center gap-2 px-4 py-1.5 bg-indigo-800 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="size-3.5 animate-spin text-gray-300" />
                                <span className="text-sm text-gray-300">Commenting</span>
                            </>
                        ) : (
                            <>
                                <Send className="size-3.5 text-gray-300" />
                                <span className="text-sm text-gray-300">Comment</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CommentForm;