import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

console.log("### Connecting to database...");

export const db = process.env.VERCEL
  ? drizzleNeon({
      client: neon(process.env.DATABASE_URL!),
      schema,
      casing: "snake_case",
    })
  : drizzlePostgres(process.env.DATABASE_URL!, {
      schema,
      casing: "snake_case",
    });
