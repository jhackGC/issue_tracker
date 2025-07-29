"use server";

import { z } from "zod";

// Define Zod schema for issue validation
const IssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z.string().optional().nullable(),

  status: z
    .enum(["backlog", "todo", "in_progress", "done"])
    .refine((val) => ["backlog", "todo", "in_progress", "done"].includes(val), {
      message: "Please select a valid status",
    }),

  priority: z
    .enum(["low", "medium", "high"])
    .refine((val) => ["low", "medium", "high"].includes(val), {
      message: "Please select a valid priority",
    }),
  userId: z.string().min(1, "User ID is required"),
});

export type IssueData = z.infer<typeof IssueSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};
