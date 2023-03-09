import {
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import Column from "./Column";
import CreateOrEditBoardModal from "../CreateOrEditBoardModal";

import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";
import { DYNAMIC_CHAKRA_MODAL_ACTION } from "~/constants";

const Board = () => {
  const router = useRouter();
  const selectedBoardId = router.query.boardId as string;

  const newColumnBackgroundColor = useColorModeValue("lightGray", "darkerGray");
  const newColumnHoverBackgroundColor = useColorModeValue(
    "purpleAlpha25",
    "darkGray"
  );

  const { isOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();
  const createOrEditBoardButtonProps = getButtonProps() as HTMLProps;

  const { data: selectedBoard } = api.board.getOne.useQuery(
    {
      id: selectedBoardId,
    },
    { enabled: !!selectedBoardId }
  );

  const { data: allBoards, isLoading } = api.board.getAll.useQuery();

  if (selectedBoardId) {
    return (
      <Flex
        flexGrow={1}
        columnGap={6}
        overflowX='auto'
        maxW="full"
        maxH="calc(100vh - 97px - 24px)"
        pb={8}
        data-test="board"
      >
        {selectedBoard?.columns.map((columnData) => (
          <Column
            key={columnData.id}
            id={columnData.id}
            title={columnData.title}
          />
        ))}
        {selectedBoard && (
          <Center
            as="button"
            minW="280px"
            h="90%"
            mt="34px"
            color="customPurple.500"
            fontSize="24px"
            fontWeight="bold"
            borderRadius={8}
            _hover={{ backgroundColor: newColumnHoverBackgroundColor }}
            bgColor={newColumnBackgroundColor}
            {...createOrEditBoardButtonProps}
          >
            + New Column
          </Center>
        )}
        {selectedBoard && isOpen && (
          <CreateOrEditBoardModal
            isOpen={isOpen}
            onClose={onClose}
            getDisclosureProps={getDisclosureProps}
            action={DYNAMIC_CHAKRA_MODAL_ACTION.EDIT}
            board={selectedBoard}
          />
        )}
      </Flex>
    );
  }

  if (router.pathname === "/") {
    if (!isLoading && allBoards?.length === 0) {
      return (
        <>
          <Center flexDir="column" rowGap={8} w="100%" h="100%">
            <Heading maxW="50%" textAlign="center">
              Looks like you do not have an available board.
            </Heading>
            <Button size="lg" {...createOrEditBoardButtonProps}>
              + Create New Board
            </Button>
          </Center>
          {isOpen && (
            <CreateOrEditBoardModal
              isOpen={isOpen}
              onClose={onClose}
              getDisclosureProps={getDisclosureProps}
              action={DYNAMIC_CHAKRA_MODAL_ACTION.CREATE}
            />
          )}
        </>
      );
    }
    return (
      <Center w="100%" h="100%">
        <Heading maxW="50%" textAlign="center">
          Select one of your boards to manage your tasks.
        </Heading>
      </Center>
    );
  }

  return (
    <Center w="100%" h="100%">
      <Spinner size="xl" />
    </Center>
  );
};

export default Board;
