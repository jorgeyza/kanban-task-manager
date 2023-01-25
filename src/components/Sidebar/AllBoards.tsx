import {
  Heading,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { BoardIconSVG } from "@/assets";

const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];

const AllBoards = () => {
  const hoverBackgroundColor = useColorModeValue("purpleAlpha25", "white");
  return (
    <div>
      <Heading paddingLeft={6} marginBottom={5} variant="board-column-title">
        all boards {`(${8})`}
      </Heading>
      <List as="nav" role="navigation">
        {boards.map((board) => {
          return (
            <ListItem
              key={board}
              display="flex"
              position="relative"
              alignItems="center"
              height="48px"
              columnGap={4}
              paddingX={6}
              marginRight={6}
              borderRightRadius="full"
              cursor="pointer"
              _hover={{
                backgroundColor: hoverBackgroundColor,
                color: "customPurple.500",
              }}
            >
              <BoardIconSVG />
              <Text variant="boards-list">{board}</Text>
            </ListItem>
          );
        })}
        <ListItem
          display="flex"
          position="relative"
          alignItems="center"
          color="customPurple.500"
          height="48px"
          columnGap={4}
          paddingX={6}
          marginRight={6}
          borderRightRadius="full"
          cursor="pointer"
          _hover={{ backgroundColor: hoverBackgroundColor }}
        >
          <BoardIconSVG />
          <Text variant="boards-list">+ Create New Board</Text>
        </ListItem>
      </List>
    </div>
  );
};

export default AllBoards;
