import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args:{ title:v.optional(v.string()), intialContent: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user) {
      throw new ConvexError("UnAuthorized");
    }
    const documentId = await ctx.db.insert("documents",{
      title: args.title ?? "Untitled document",
      ownerId: user.subject,
      intialContent: args.intialContent
    })
    return documentId;
  }
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});