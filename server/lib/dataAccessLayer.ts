// regular functions for data access, do not use "use server" here.
// remember "use server" is only to expose server actions.
// if you use "use server" here, it will not be a regular function, it will be converted to a route as it will be
// compiled as a server action.
// Mostly used to get data, only to be used on the server side (server components)

// This file will inherit, thanks to NextJS, the context of the server,
// because its been called from a server component (action, route, etc. )so you can access headers, request, cookies , etc.
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "./auth";
import { mockDelay } from "./utils";

export const getCurrentUser = async () => {
  await mockDelay(1000); // Simulate a delay for demonstration purposes

  // if no session, return null, because we cannot access
  // the database without a session that has the userId (session.userId)
  const session = await getSession();
  if (!session) {
    return null;
  }

  try {
    const results = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId));

    return results[0] || null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    console.log("### Get user by email:", email);
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    console.log("### User found:", !!user);
    return user || null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export async function getIssues() {
  try {
    await mockDelay(1000); // Simulate a delay for demonstration purposes
    const result = await db.query.issues.findMany({
      with: {
        user: true,
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    });
    return result;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw new Error("Failed to fetch issues");
  }
}
