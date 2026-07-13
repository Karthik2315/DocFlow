import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

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
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx,args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const removeById = mutation({
  args: {id:v.id("documents")},
  handler : async (ctx,args) => {
      const user = await ctx.auth.getUserIdentity();
      if(!user){
        throw new ConvexError("unAuthorized");
      }
      const document = await ctx.db.get(args.id);
      if(!document){
        throw new ConvexError("Document not found")
      }
      if(user.subject !== document.ownerId) {
        throw new ConvexError("unAuthorized")
      }
      return await ctx.db.delete(args.id);
  }
})