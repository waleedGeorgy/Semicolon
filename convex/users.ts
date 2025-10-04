import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      });
    }
  },
});

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    if (!args.userId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) return null;

    return user;
  },
});

export const getUserStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const userCodeRuns = await ctx.db
      .query("codeRuns")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    const userStarredSnippets = await ctx.db
      .query("stars")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    const starredSnippetsIds = userStarredSnippets.map(
      (starredSnippet) => starredSnippet.snippetId
    );
    const starredSnippetsDetails = await Promise.all(
      starredSnippetsIds.map((snippetId) => ctx.db.get(snippetId))
    );

    const starredSnippetsLanguages = starredSnippetsDetails
      .filter(Boolean)
      .reduce((acc, curr) => {
        if (curr?.language) {
          acc[curr.language] = (acc[curr.language] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

    const mostStarredLanguage =
      Object.entries(starredSnippetsLanguages).sort(
        ([, a], [, b]) => b - a
      )[0]?.[0] ?? "N/A";

    const codeRunsLast24Hours = userCodeRuns.filter(
      (codeRun) => codeRun._creationTime > Date.now() - 24 * 60 * 60 * 1000
    ).length;

    const codeRunsLanguageStats = userCodeRuns.reduce((acc, curr) => {
      acc[curr.language] = (acc[curr.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const languages = Object.keys(codeRunsLanguageStats);
    const favoriteLanguage = languages.length
      ? languages.reduce((a, b) =>
          codeRunsLanguageStats[a] > codeRunsLanguageStats[b] ? a : b
        )
      : "N/A";

    return {
      totalCodeRuns: userCodeRuns.length,
      languagesCount: languages.length,
      languages: languages,
      codeRunsLanguageStats,
      codeRunsLast24Hours,
      favoriteLanguage,
      mostStarredLanguage,
    };
  },
});

export const setPro = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      await ctx.db.patch(user._id, { isPro: true });
    }
  },
});
