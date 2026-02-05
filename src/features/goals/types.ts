import { z } from "zod";

export const GoalSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  goalSeconds: z.number(),
  completedSeconds: z.number(),
  createdAt: z.iso.datetime(),
  completedAt: z.iso.datetime().optional(),
});

// Derive type from schema (auto-updates when schema changes!)
export type Goal = z.infer<typeof GoalSchema>;

export type Goals = Goal[];
