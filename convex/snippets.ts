import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCodeSnippet = mutation({
  args: {
    title: v.string(),
    code: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User is not authorized");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!currentUser) throw new ConvexError("User does not exist");

    const snippetId = await ctx.db.insert("snippets", {
      userId: identity.subject,
      username: currentUser?.name,
      title: args.title,
      code: args.code,
      language: args.language,
    });

    return snippetId;
  },
});

export const deleteCodeSnippet = mutation({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authorized");

    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new ConvexError("Snippet not found");
    if (snippet.userId !== identity.subject)
      throw new ConvexError("You are not allowed to delete this snippet");

    const snippetComments = await ctx.db
      .query("snippetComments")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const comment of snippetComments) await ctx.db.delete(comment._id);

    const snippetStars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const star of snippetStars) await ctx.db.delete(star._id);

    await ctx.db.delete(args.snippetId);
  },
});

export const getAllSnippets = query({
  handler: async (ctx) => {
    const snippets = await ctx.db.query("snippets").order("desc").collect();
    return snippets;
  },
});

export const getSnippetById = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new ConvexError("Snippet not found");
    return snippet;
  },
});

export const getSnippetComments = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("snippetComments")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .order("desc")
      .collect();

    return comments;
  },
});

export const addComment = mutation({
  args: { snippetId: v.id("snippets"), contents: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authorized");

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();
    if (!existingUser) throw new ConvexError("User does not exist");

    return await ctx.db.insert("snippetComments", {
      userId: identity.subject,
      snippetId: args.snippetId,
      contents: args.contents,
      username: existingUser.name,
    });
  },
});

export const deleteComment = mutation({
  args: { commentId: v.id("snippetComments") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authorized");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new ConvexError("Comment does not exist");

    if (comment.userId !== identity.subject)
      throw new ConvexError("Not allowed to delete this comment");

    await ctx.db.delete(args.commentId);
  },
});

export const starCodeSnippet = mutation({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authorized");

    const starredSnippet = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    if (starredSnippet) {
      await ctx.db.delete(starredSnippet._id);
    } else {
      await ctx.db.insert("stars", {
        userId: identity.subject,
        snippetId: args.snippetId,
      });
    }
  },
});

export const isSnippetStarred = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const hasStar = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    return !!hasStar;
  },
});

export const getSnippetStarCount = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const snippetStars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    return snippetStars.length;
  },
});
