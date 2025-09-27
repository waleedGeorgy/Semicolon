import { createToast } from "@/app/components/Toast";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel"
import { SignInButton, useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react";
import { MessageCircleCode, MessageSquareCode } from "lucide-react";
import { useState } from "react";
import CommentForm from "./CommentForm";
import SingleComment from "./SingleComment";

const SnippetComments = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
    const { user } = useUser();

    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const [commentToBeDeletedId, setCommentToBeDeletedId] = useState<string | null>(null);

    const comments = useQuery(api.snippets.getSnippetComments, { snippetId });

    const addComment = useMutation(api.snippets.addComment);
    const deleteComment = useMutation(api.snippets.deleteComment);

    const handleAddingComment = async (contents: string) => {
        setIsCommenting(true);

        try {
            await addComment({ snippetId, contents });
            createToast("success", "Comment added successfully!");
        } catch (error) {
            console.log(error);
            createToast("error", "Failed to add the comment.")
        } finally {
            setIsCommenting(false);
        }
    }

    const handleDeletingComment = async (commentId: Id<"snippetComments">) => {
        setCommentToBeDeletedId(commentId);

        try {
            await deleteComment({ commentId });
            createToast("success", "Comment deleted successfully!");
        } catch (error) {
            console.log(error);
            createToast("error", "Failed to delete the comment.")
        } finally {
            setCommentToBeDeletedId(null);
        }
    }

    return (
        <div className="bg-[#1b1b27] border border-gray-700/50 rounded-2xl overflow-hidden">
            {/* Comments header */}
            <div className="px-5 py-4 border-b border-gray-700/50">
                <h2 className="text-xl font-roboto-condensed flex items-center gap-2">
                    <MessageCircleCode className="size-5" />
                    Discussion ({comments?.length})
                </h2>
            </div>
            {/* Sign in button in case user is not authenticated */}
            <div className="p-4">
                {user ? (
                    <CommentForm addComment={handleAddingComment} isSubmitting={isCommenting} />
                ) : (
                    <div className="bg-gray-950 rounded-xl p-6 text-center mb-4">
                        <p className="text-gray-400 mb-4">Sign in to join the discussion</p>
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/50 text-gray-300 hover:text-gray-200 outline outline-indigo-500/50 hover:outline-indigo-500/80 rounded-lg transition-colors duration-300 cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                )}
                {/* Comments */}
                <div className="space-y-4">
                    {comments?.map((comment) => (
                        <SingleComment
                            key={comment._id}
                            comment={comment}
                            onDelete={handleDeletingComment}
                            isDeleting={commentToBeDeletedId === comment._id}
                            currentUserId={user?.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SnippetComments