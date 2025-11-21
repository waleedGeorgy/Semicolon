import { Calendar1, Loader, Trash2, User2 } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { Comment } from "@/app/types"
import CommentFormatter from "./CommentFormatter"

interface singleCommentProps {
    comment: Comment,
    isDeleting: boolean,
    currentUserId?: string
    onDelete: (commentId: Id<"snippetComments">) => Promise<void>,
}

const SingleComment = ({ comment, isDeleting, currentUserId, onDelete }: singleCommentProps) => {
    return (
        <div className="group">
            <div className="bg-neutral-950 rounded-xl px-4 py-5 outline outline-gray-700/50 hover:outline-3 hover:outline-gray-700/80 transition-all">
                {/* Comment header */}
                <div className="flex items-start sm:items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="size-9 rounded-full border-2 border-indigo-400 text-indigo-400 flex items-center justify-center flex-shrink-0">
                            <User2 className="size-5" />
                        </div>
                        <div className="min-w-0 space-y-0.5">
                            <span className="block text-gray-300 font-medium truncate">{comment.username}</span>
                            <span className="text-sm text-gray-500 flex flex-row items-center gap-1.5">
                                <Calendar1 className="size-3.5" />{new Date(comment._creationTime).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    {comment.userId === currentUserId && (
                        <button
                            onClick={() => onDelete(comment._id)}
                            disabled={isDeleting}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                            title="Delete comment"
                        >
                            {isDeleting ? (<Loader className="size-5 animate-spin text-red-400" />) : (<Trash2 className="size-5 text-red-400" />)}
                        </button>
                    )}
                </div>
                <CommentFormatter contents={comment.contents} />
            </div>
        </div>
    )
}

export default SingleComment