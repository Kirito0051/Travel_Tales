export default defineEventHandler(async () => {
  try {
    const response = await fetch("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.NUXT_CLERK_SECRET_KEY}`,
      },
    });

    const users = await response.json();

    if (!Array.isArray(users)) {
      return { error: "Failed to fetch users" };
    }

    // Sort users by last active date (most recent first)
    const sortedUsers = users
      .filter((user) => user.last_active_at) // Only users with activity
      .sort((a, b) => b.last_active_at - a.last_active_at) // Descending order
      .slice(0, 5); // Get top 5 active users

    return { activeUsers: sortedUsers };
  } catch (error) {
    return { error: "Failed to fetch active users" };
  }
});
