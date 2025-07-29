// regular functions for data access, do not use "use server" here.
// remember "use server" is only to expose server actions.
// if you use "use server" here, it will not be a regular function, it will be converted to a route as it will be
// compiled as a server action.
// Mostly used to get data, only to be used on the server side (server components)

// This file will inherit, thanks to NextJS, the context of the server,
// because its been called from a server component (action, route, etc. )so you can access headers, request, cookies , etc.
import { eq } from "drizzle-orm";
import { mockDelay } from "../../lib/utils";
import { db } from "../db";
import { usersSchema } from "../db/schema";
import { getSession } from "./auth";

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
      .from(usersSchema)
      .where(eq(usersSchema.id, session.userId));

    return results[0] || null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    console.log("### Get user by email:", email);
    const user = await db.query.usersSchema.findFirst({
      where: eq(usersSchema.email, email),
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
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const result = await db.query.issuesSchema.findMany({
      with: {
        user: true,
      },
      where: (issuesSchema, { eq }) => eq(issuesSchema.userId, user.id),
      orderBy: (issuesSchema, { desc }) => [desc(issuesSchema.createdAt)],
    });
    return result;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw new Error("Failed to fetch issues");
  }
}
