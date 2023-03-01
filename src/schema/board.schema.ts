import * as z from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(1),
  columns: z
    .array(z.object({ title: z.string() }))
    .max(10, { message: "You can only have 10 columns per board" }),
});

export const updateBoardSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  columns: z
    .array(z.object({ id: z.string().optional(), title: z.string() }))
    .max(10, { message: "You can only have 10 columns per board" }),
  columnsIdsToDelete: z.array(z.string()),
});

export const deleteBoardSchema = z.object({ id: z.string() });
