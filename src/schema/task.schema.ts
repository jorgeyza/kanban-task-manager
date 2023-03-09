import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  columnId: z.string().min(1),
  subtasks: z
    .array(z.object({ title: z.string(), isDone: z.boolean() }))
    .max(10, { message: "You can only have 10 subtasks per board" }),
});

export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  columnId: z.string().min(1),
  subtasks: z
    .array(z.object({ id: z.string(), title: z.string(), isDone: z.boolean() }))
    .max(10, { message: "You can only have 10 subtasks per board" }),
  subtasksIdsToDelete: z.array(z.string()),
});

export const getInfiniteByColumnIdSchema = z.object({
  columnId: z.string(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
});

export const deleteTaskSchema = z.object({ id: z.string() });
