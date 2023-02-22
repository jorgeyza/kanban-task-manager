import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const boardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        columns: z.array(z.object({ title: z.string() })),
      })
    )
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

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        columns: z.array(z.object({ id: z.string(), title: z.string() })),
      })
    )
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
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.board.delete({
        where: { id: input.id },
      });
    }),
});
