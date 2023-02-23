import { PrismaClient } from "@prisma/client";
import seedData from "./seedData.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (prisma) => {
    // Delete all existing records
    await prisma.subtask.deleteMany();
    await prisma.task.deleteMany();
    await prisma.column.deleteMany();
    await prisma.board.deleteMany();

    // Create new records
    for (const board of seedData.boards) {
      const createdBoard = await prisma.board.create({
        data: {
          title: board.title,
          columns: {
            create: board.columns.map((column) => ({
              title: column.title,
              tasks: {
                create: column.tasks.map((task) => ({
                  title: task.title,
                  description: task.description,
                  subtasks: {
                    create: task.subtasks.map((subtask) => ({
                      title: subtask.title,
                      isDone: subtask.isDone,
                    })),
                  },
                })),
              },
            })),
          },
        },
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subtasks: true,
                },
              },
            },
          },
        },
      });

      console.log(
        `Created board ${createdBoard.title} with ${createdBoard.columns.length} columns`
      );

      for (const column of createdBoard.columns) {
        console.log(
          `Created column ${column.title} with ${column.tasks.length} tasks`
        );

        for (const task of column.tasks) {
          console.log(
            `Created task ${task.title} with ${task.subtasks.length} subtasks`
          );
        }
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
