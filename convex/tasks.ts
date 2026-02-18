import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { getCurrentUser, isUserAuthorized } from './auth';

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Check if user is authorized
    if (!(await isUserAuthorized(ctx))) {
      throw new Error('User is not authorized');
    }

    const currentUser = await getCurrentUser(ctx);
    if (!currentUser) {
      throw new Error('User not found');
    }

    // Get tasks for the current user
    return await ctx.db
      .query('tasks')
      .withIndex('by_userId', (q) => q.eq('userId', currentUser._id))
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user is authorized
    if (!(await isUserAuthorized(ctx))) {
      throw new Error('User is not authorized');
    }

    const currentUser = await getCurrentUser(ctx);
    if (!currentUser) {
      throw new Error('User not found');
    }

    return await ctx.db.insert('tasks', {
      title: args.title,
      description: args.description,
      completed: false,
      userId: currentUser._id,
    });
  },
});
