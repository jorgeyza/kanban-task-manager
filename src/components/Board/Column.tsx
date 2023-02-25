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
        <Box
          w="15px"
          h="15px"
          borderRadius="50%"
          bgColor={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        />
        <Heading variant="board-column-title">{`${title} (${
          allTasks?.length ?? 0
        })`}</Heading>
      </Flex>
      {allTasks?.map((task) => (
        <Task key={task.id} id={task.id} />
      ))}
    </Flex>
  );
};

export default Column;
