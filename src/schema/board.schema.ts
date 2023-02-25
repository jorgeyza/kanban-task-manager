import * as z from "zod";

export const createBoardSchema = z.object({
  title: z.string().default("Untitled"),
  columns: z.array(z.object({ title: z.string() })).max(10),
});

export const updateBoardSchema = z.object({
  id: z.string(),
  title: z.string().default("Untitled"),
  columns: z.array(z.object({ id: z.string(), title: z.string() })).max(10),
});

export const deleteBoardSchema = z.object({ id: z.string() });

export const getAllTasksByColumnIdSchema = z.object({ columnId: z.string() });

export const getAllsubtasksByTaskIdSchema = z.object({ taskId: z.string() });
