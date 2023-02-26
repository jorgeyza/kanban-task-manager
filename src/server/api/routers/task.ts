import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createTaskSchema,
  getAllTasksByColumnIdSchema,
} from "~/schema/board.schema";

export const taskRouter = createTRPCRouter({
  create: publicProcedure.input(createTaskSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.task.create({
      data: {
        title: input.title,
        description: input.description ?? "",
        column: { connect: { id: input.columnId } },
        subtasks: {
          createMany: {
            data: input.subtasks,
          },
        },
      },
    });
  }),

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
