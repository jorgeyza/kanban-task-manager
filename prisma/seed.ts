import { PrismaClient } from "@prisma/client";
import seedData from "./seedData.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.board.deleteMany();

  await prisma.board.createMany({
    data: seedData.boards.map((board) => ({ title: board.title })),
  });

  const allBoards = await prisma.board.findMany();
  console.log("🚀 ~ file: seed.ts:18 ~ main ~ allBoards:", allBoards);

  const createColumns = allBoards.map((board) => {
    return prisma.column.create({
      data: { title: board.title, board: { connect: { id: board.id } } },
    });
  });
  console.log(
    "🚀 ~ file: seed.ts:25 ~ createColumns ~ createColumns:",
    createColumns
  );

  const allColumns = await prisma.$transaction([...createColumns]);
  console.log("🚀 ~ file: seed.ts:26 ~ main ~ allColumns:", allColumns);
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
