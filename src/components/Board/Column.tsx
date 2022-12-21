import { Box, Flex, Heading } from '@chakra-ui/react';

import Task from './Task';

const Column = () => {
  return (
    <Flex flexDirection='column' rowGap={5} width={280}>
      <Flex columnGap={3}>
        <Box height='15px' width='15px' borderRadius='50%' backgroundColor='#49c4e5' />
        <Heading variant='board-column-title'>TO DO</Heading>
      </Flex>
      <Task />
    </Flex>
  );
};

export default Column;
