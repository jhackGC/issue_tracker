import { InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Enums for issue status and priority
export const statusEnum = pgEnum("status", [
  "backlog",
  "todo",
  "in_progress",
  "done",
]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

// Issues table
export const issuesSchema = pgTable("issues", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: statusEnum("status").default("backlog").notNull(),
  priority: priorityEnum("priority").default("medium").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: text("user_id").notNull(),
});

// Users table
export const usersSchema = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations between tables
export const issuesRelations = relations(issuesSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [issuesSchema.userId],
    references: [usersSchema.id],
  }),
}));

export const usersRelations = relations(usersSchema, ({ many }) => ({
  issues: many(issuesSchema),
}));

// Types
export type Issue = InferSelectModel<typeof issuesSchema>;
export type User = InferSelectModel<typeof usersSchema>;

// Status and priority labels for display
export const ISSUE_STATUS = {
  backlog: { label: "Backlog", value: "backlog" },
  todo: { label: "Todo", value: "todo" },
  in_progress: { label: "In Progress", value: "in_progress" },
  done: { label: "Done", value: "done" },
};

export const ISSUE_PRIORITY = {
  low: { label: "Low", value: "low" },
  medium: { label: "Medium", value: "medium" },
  high: { label: "High", value: "high" },
};
