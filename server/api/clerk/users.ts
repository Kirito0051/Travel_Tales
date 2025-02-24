import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const CLERK_SECRET_KEY = process.env.NUXT_CLERK_SECRET_KEY;

  if (!CLERK_SECRET_KEY) {
    return { error: "Missing Clerk API key" };
  }

  try {
    const res = await fetch("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`, // ✅ Fixed
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Clerk API error: ${JSON.stringify(errorData)}`); // ✅ Fixed
    }

    const users = await res.json();

    // Format user data by month
    const userStats: Record<string, number> = {};

    users.forEach((user: any) => {
      const createdAt = new Date(user.created_at);
      const month = createdAt.toLocaleString("default", { month: "short" });

      userStats[month] = (userStats[month] || 0) + 1;
    });

    return { userStats };
  } catch (error) {
    return { error: `Failed to fetch users: ${error.message}` }; // ✅ Fixed
  }
});
