import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

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
