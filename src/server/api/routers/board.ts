import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createBoardSchema,
  updateBoardSchema,
  deleteBoardSchema,
} from "~/schema/board.schema";

export const boardRouter = createTRPCRouter({
  create: publicProcedure
    .input(createBoardSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.board.create({
        data: {
          title: input.title,
          columns: {
            createMany: {
              data: input.columns,
            },
          },
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany();
  }),

  getOne: publicProcedure.input(deleteBoardSchema).query(({ ctx, input }) => {
    return ctx.prisma.board.findFirst({
      where: { id: input.id },
      include: {
        columns: true,
      },
    });
  }),

  update: publicProcedure
    .input(updateBoardSchema)
    .mutation(({ ctx, input }) => {
      const updateBoardName = ctx.prisma.board.update({
        where: { id: input.id },
        data: { title: input.title },
      });

      const updateColumns = input.columns.map((column) => {
        return ctx.prisma.column.update({
          where: { id: column.id },
          data: { title: column.title },
        });
      });

      return ctx.prisma.$transaction([updateBoardName, ...updateColumns]);
    }),

  delete: publicProcedure
    .input(deleteBoardSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.board.delete({
        where: { id: input.id },
      });
    }),
});
