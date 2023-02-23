import { PrismaClient } from "@prisma/client";
import seedData from "./seedData.json";

const prisma = new PrismaClient();

async function main() {
  // Delete all existing records
  await prisma.subtask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.column.deleteMany();
  await prisma.board.deleteMany();

  // Create new records
  for (let board of seedData.boards) {
    const createdBoard = await prisma.board.create({
      data: { title: board.title },
    });

    for (let column of board.columns) {
      const createdColumn = await prisma.column.create({
        data: {
          title: column.title,
          board: { connect: { id: createdBoard.id } },
        },
      });

      for (let task of column.tasks) {
        const createdTask = await prisma.task.create({
          data: {
            title: task.title,
            description: task.description,
            column: { connect: { id: createdColumn.id } },
          },
        });

        for (let subtask of task.subtasks) {
          await prisma.subtask.create({
            data: {
              title: subtask.title,
              isDone: subtask.isDone,
              task: { connect: { id: createdTask.id } },
            },
          });
        }
      }
    }
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
