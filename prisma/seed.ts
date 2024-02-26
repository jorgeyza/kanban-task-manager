import { PrismaClient } from "@prisma/client";
import seedData from "./seedData.json";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(
      async (tx) => {
        // Delete all existing records
        await tx.subtask.deleteMany();
        await tx.task.deleteMany();
        await tx.column.deleteMany();
        await tx.board.deleteMany();

        // Create new records
        for (const board of seedData.boards) {
          const createdBoard = await tx.board.create({
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
      },
      {
        timeout: 60000,
      }
    );
  } catch (error) {
    console.log("🚀 ~ file: seed.ts:69 ~ main ~ error:", error);
  }
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
