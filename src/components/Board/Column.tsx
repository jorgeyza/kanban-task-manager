import { Box, Flex, Heading } from "@chakra-ui/react";
import { api } from "~/utils/api";

import Task from "./Task";

interface Props {
  id: string;
  title: string;
}

const Column = ({ id, title }: Props) => {
  const { data: allTasks } = api.task.getAllByColumnId.useQuery({
    columnId: id,
  });

  return (
    <Flex direction="column" rowGap={5} w={280}>
      <Flex columnGap={3}>
        <Box w="15px" h="15px" borderRadius="50%" bgColor="#49c4e5" />
        <Heading variant="board-column-title">{title}</Heading>
      </Flex>
      {allTasks?.map((task) => (
        <Task key={task.id} id={task.id} />
      ))}
    </Flex>
  );
};

export default Column;
