import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllSubtasksByTaskIdSchema } from "~/schema/subtask.schema";

export const subtaskRouter = createTRPCRouter({
  getAllByTaskId: publicProcedure
    .input(getAllSubtasksByTaskIdSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.subtask.findMany({
        where: { taskId: input.taskId },
      });
    }),
});
