import { QueryCtx, MutationCtx } from './_generated/server';
import { query } from './_generated/server';

export const checkUserAuthorization = query({
  args: {},
  handler: async (ctx) => {
    const authorized = await isUserAuthorized(ctx);
    if (!authorized) {
      return { authorized: false };
    }
    const user = await getCurrentUser(ctx);
    return {
      authorized: true,
      user,
    };
  },
});

/**
 * Get the current user from the database using their Clerk ID
 */
export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error('User is not authenticated');
  }

  const user = await ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
    .first();

  return user;
}

/**
 * Check if a user is authorized (exists in the allow-list)
 */
export async function isUserAuthorized(ctx: QueryCtx | MutationCtx) {
  try {
    const user = await getCurrentUser(ctx);
    return user !== null && user.isActive;
  } catch {
    return false;
  }
}

/**
 * Deactivate a user (removes them from allow-list)
 */
export async function deactivateUser(ctx: MutationCtx, userId: string) {
  await ctx.db.patch(userId as any, {
    isActive: false,
    updatedAt: Date.now(),
  });
}

/**
 * Activate a user (adds them back to allow-list)
 */
export async function activateUser(ctx: MutationCtx, userId: string) {
  await ctx.db.patch(userId as any, {
    isActive: true,
    updatedAt: Date.now(),
  });
}
