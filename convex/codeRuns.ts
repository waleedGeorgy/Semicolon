import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const saveCodeRun = mutation({
  args: {
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) throw new ConvexError("User not authenticated");

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), userIdentity.subject))
      .first();

    if (!currentUser?.isPro && (args.language !== "javascript" && args.language !== "typescript"))
      throw new ConvexError("Only pro users are allowed to use this language");

    await ctx.db.insert("codeRuns", {
      ...args,
      userId: userIdentity.subject,
    });
  },
});

export const getUserCodeRuns = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("codeRuns")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});