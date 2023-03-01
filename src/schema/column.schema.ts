import { z } from "zod";

export const updateColumnSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  boardId: z.string().min(1),
});
