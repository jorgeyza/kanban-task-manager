import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  deleteBoardSchema,
  getAllTasksByColumnIdSchema,
} from "~/schema/board.schema";

export const taskRouter = createTRPCRouter({
  getAllByColumnId: publicProcedure
    .input(getAllTasksByColumnIdSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: { columnId: input.columnId },
      });
    }),

  getOne: publicProcedure.input(deleteBoardSchema).query(({ ctx, input }) => {
    return ctx.prisma.task.findFirst({
      where: { id: input.id },
    });
  }),
});
