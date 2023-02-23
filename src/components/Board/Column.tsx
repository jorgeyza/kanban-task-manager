import { Box, Flex, Heading } from "@chakra-ui/react";

import Task from "./Task";

const Column = () => {
  return (
    <Flex direction="column" rowGap={5} w={280}>
      <Flex columnGap={3}>
        <Box
          w="15px"
          h="15px"
          borderRadius="50%"
          bgColor="#49c4e5"
        />
        <Heading variant="board-column-title">TO DO</Heading>
      </Flex>
      <Task />
    </Flex>
  );
};

export default Column;
