import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

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

    if (!currentUser?.isPro && args.language !== "javascript")
      throw new ConvexError("Only pro users are allowed to use this language");

    await ctx.db.insert("codeRuns", {
      ...args,
      userId: userIdentity.subject,
    });
  },
});
