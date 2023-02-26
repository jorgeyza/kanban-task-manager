import { z } from "zod";

export const getAllSubtasksByTaskIdSchema = z.object({ taskId: z.string() });
