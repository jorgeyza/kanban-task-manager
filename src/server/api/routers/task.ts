import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createTaskSchema,
  deleteTaskSchema,
  getAllTasksByColumnIdSchema,
  updateTaskSchema,
} from "~/schema/task.schema";

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

  getOne: publicProcedure.input(deleteTaskSchema).query(({ ctx, input }) => {
    return ctx.prisma.task.findFirst({
      where: { id: input.id },
    });
  }),

  update: publicProcedure.input(updateTaskSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.task.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        description: input.description ?? "",
        column: { connect: { id: input.columnId } },
        subtasks: {
          deleteMany: {},
          createMany: {
            data: input.subtasks,
          },
        },
      },
    });
  }),

  delete: publicProcedure.input(deleteTaskSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.task.delete({
      where: { id: input.id },
    });
  }),
});
