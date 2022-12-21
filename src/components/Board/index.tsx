import { Flex } from '@chakra-ui/react';

import Column from './Column';

const Board = () => {
  return (
    <Flex columnGap={6} paddingBottom={8} overflow='auto' data-test='board'>
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </Flex>
  );
};

export default Board;
