import { BoardIconSVG } from '@/assets';
import { Box, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';

const boards = ['Platform Launch', 'Marketing Plan', 'Roadmap'];

const AllBoards = () => {
  const hoverBackgroundColor = useColorModeValue('purpleAlpha25', 'white');
  return (
    <Box marginBottom='auto'>
      <Text paddingLeft={8} marginBottom={5} variant='board-title'>
        all boards {`(${8})`}
      </Text>
      <List>
        {boards.map((board) => {
          return (
            <ListItem
              key={board}
              display='flex'
              position='relative'
              alignItems='center'
              height='48px'
              columnGap={4}
              paddingX={8}
              marginRight={6}
              borderRightRadius='full'
              cursor='pointer'
              _hover={{ backgroundColor: hoverBackgroundColor, color: 'purple' }}>
              <BoardIconSVG />
              <Text>{board}</Text>
            </ListItem>
          );
        })}
        <ListItem
          display='flex'
          position='relative'
          alignItems='center'
          color='purple'
          height='48px'
          columnGap={4}
          paddingX={8}
          marginRight={6}
          borderRightRadius='full'
          cursor='pointer'
          _hover={{ backgroundColor: hoverBackgroundColor }}>
          <BoardIconSVG />
          <Text>+ Create New Board</Text>
        </ListItem>
      </List>
    </Box>
  );
};

export default AllBoards;
