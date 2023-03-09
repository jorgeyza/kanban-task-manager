import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createTaskSchema,
  deleteTaskSchema,
  getInfiniteByColumnIdSchema,
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

  getInfiniteByColumnId: publicProcedure
    .input(getInfiniteByColumnIdSchema)
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const tasks = await ctx.prisma.task.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          columnId: input.columnId,
        },
        orderBy: {
          id: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (tasks.length > limit) {
        const nextTask = tasks.pop();
        nextCursor = nextTask?.id;
      }

      return {
        tasks,
        nextCursor,
      };
    }),

  getOne: publicProcedure.input(deleteTaskSchema).query(({ ctx, input }) => {
    return ctx.prisma.task.findFirst({
      where: { id: input.id },
    });
  }),

  update: publicProcedure.input(updateTaskSchema).mutation(({ ctx, input }) => {
    const updateTask = ctx.prisma.task.update({
      where: { id: input.id },
      data: {
        title: input.title,
        description: input.description ?? "",
        column: { connect: { id: input.columnId } },
      },
    });

    const deleteSubtasks = ctx.prisma.subtask.deleteMany({
      where: { id: { in: input.subtasksIdsToDelete } },
    });

    const updateSubtasks = input.subtasks.map((subtask) => {
      return ctx.prisma.subtask.upsert({
        where: { id: subtask.id },
        update: { title: subtask.title, isDone: subtask.isDone },
        create: {
          title: subtask.title,
          isDone: subtask.isDone,
          task: { connect: { id: input.id } },
        },
      });
    });

    return ctx.prisma.$transaction([
      updateTask,
      deleteSubtasks,
      ...updateSubtasks,
    ]);
  }),

  delete: publicProcedure.input(deleteTaskSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.task.delete({
      where: { id: input.id },
    });
  }),
});
