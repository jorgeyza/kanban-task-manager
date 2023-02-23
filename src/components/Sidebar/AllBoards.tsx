import {
  Heading,
  List,
  ListItem,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import { BoardIcon } from "~/assets";
import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";
import CreateOrEditBoardModal from "./CreateOrEditBoardModal";

const AllBoards = () => {
  const hoverBackgroundColor = useColorModeValue("purpleAlpha25", "white");

  const { isOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();
  const createNewBoardButtonProps = getButtonProps() as HTMLProps;

  const [selectedBoard, setSelectedBoard] = useState("");
  console.log(
    "🚀 ~ file: AllBoards.tsx:24 ~ AllBoards ~ selectedBoard:",
    selectedBoard
  );

  const { data: allBoards } = api.board.getAll.useQuery();

  return (
    <div>
      <Heading mb={5} pl={6} variant="board-column-title">
        all boards {`(${8})`}
      </Heading>
      <List as="nav" role="navigation">
        {allBoards?.map((board) => {
          return (
            <ListItem
              key={board.id}
              pos="relative"
              alignItems="center"
              columnGap={4}
              display="flex"
              h="48px"
              mr={6}
              px={6}
              borderRightRadius="full"
              _hover={{
                backgroundColor: hoverBackgroundColor,
                color: "customPurple.500",
              }}
              cursor="pointer"
              onClick={() => setSelectedBoard(board.id)}
            >
              <BoardIcon />
              <Text variant="boards-list">{board.title}</Text>
            </ListItem>
          );
        })}
        <ListItem
          pos="relative"
          alignItems="center"
          columnGap={4}
          display="flex"
          h="48px"
          mr={6}
          px={6}
          color="customPurple.500"
          borderRightRadius="full"
          _hover={{ backgroundColor: hoverBackgroundColor }}
          cursor="pointer"
          {...createNewBoardButtonProps}
        >
          <BoardIcon />
          <Text variant="boards-list">+ Create New Board</Text>
        </ListItem>
      </List>
      <CreateOrEditBoardModal
        isOpen={isOpen}
        onClose={onClose}
        getDisclosureProps={getDisclosureProps}
        action="CREATE"
      />
    </div>
  );
};

export default AllBoards;
