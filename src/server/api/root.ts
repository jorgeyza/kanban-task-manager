import { createTRPCRouter } from "~/server/api/trpc";
import { boardRouter } from "~/server/api/routers/board";
import { taskRouter } from "~/server/api/routers/task";
import { subtaskRouter } from "~/server/api/routers/subtask";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  board: boardRouter,
  task: taskRouter,
  subtask: subtaskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
