import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllsubtasksByTaskIdSchema } from "~/schema/board.schema";

export const subtaskRouter = createTRPCRouter({
  getAllByTaskId: publicProcedure
    .input(getAllsubtasksByTaskIdSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.subtask.findMany({
        where: { taskId: input.taskId },
      });
    }),
});
