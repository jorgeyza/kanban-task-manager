import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  columnId: z.string(),
  subtasks: z
    .array(z.object({ title: z.string(), isDone: z.boolean() }))
    .max(10, { message: "You can only have 10 subtasks per board" }),
});

export const getAllTasksByColumnIdSchema = z.object({ columnId: z.string() });

export const deleteTaskSchema = z.object({ id: z.string() });
