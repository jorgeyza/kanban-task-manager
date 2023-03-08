import {
  Heading,
  List,
  ListItem,
  Text,
  useColorModeValue,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

import { BoardIcon } from "~/assets";
import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";
import { selectedBoardIdAtom } from "~/pages/_app";

import CreateOrEditBoardModal from "../CreateOrEditBoardModal";
import { ROUTE_BOARD_ID } from "~/constants";

const AllBoards = () => {
  const router = useRouter();
  const routerQuery = router.query;

  const hoverBackgroundColor = useColorModeValue("purpleAlpha25", "white");

  const { isOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();
  const createNewBoardButtonProps = getButtonProps() as HTMLProps;

  const [, setSelectedBoardId] = useAtom(selectedBoardIdAtom);

  const { data: allBoards } = api.board.getAll.useQuery();

  useEffect(() => {
    if (!routerQuery?.boardId && allBoards?.[0]) {
      setSelectedBoardId(allBoards[0].id);
    }
  }, [allBoards, routerQuery?.boardId, setSelectedBoardId]);
  return (
    <div>
      <Heading mb={5} pl={6} variant="board-column-title">
        all boards ({allBoards?.length ?? 0})
      </Heading>
      <List as="nav" role="navigation">
        {allBoards?.map((board) => {
          return (
            <ListItem
              key={board.id}
              pos="relative"
              alignItems="center"
              display="flex"
              h="48px"
              mr={6}
              color={routerQuery?.boardId === board.id ? "white" : undefined}
              borderRightRadius="full"
              _hover={
                routerQuery?.boardId === board.id
                  ? undefined
                  : {
                      backgroundColor: hoverBackgroundColor,
                      color: "customPurple.500",
                    }
              }
              cursor="pointer"
              bgColor={
                routerQuery?.boardId === board.id
                  ? "customPurple.500"
                  : undefined
              }
              onClick={() => setSelectedBoardId(board.id)}
            >
              <Flex
                as={Link}
                align="center"
                columnGap={4}
                w="100%"
                h="100%"
                px={6}
                href={{
                  pathname: ROUTE_BOARD_ID,
                  query: { boardId: board.id },
                }}
              >
                <BoardIcon />
                <Text variant="boards-list">{board.title}</Text>
              </Flex>
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
