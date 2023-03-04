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
