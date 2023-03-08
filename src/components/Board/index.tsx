import {
  Center,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

import Column from "./Column";
import CreateOrEditBoardModal from "../CreateOrEditBoardModal";

import { selectedBoardIdAtom } from "~/pages/_app";
import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";
import { DYNAMIC_CHAKRA_MODAL_ACTION } from "~/constants";

const Board = () => {
  const newColumnBackgroundColor = useColorModeValue("lightGray", "darkerGray");
  const newColumnHoverBackgroundColor = useColorModeValue(
    "purpleAlpha25",
    "darkGray"
  );

  const { isOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();
  const createOrEditBoardButtonProps = getButtonProps() as HTMLProps;

  const [selectedBoardId] = useAtom(selectedBoardIdAtom);

  const { data: selectedBoard } = api.board.getOne.useQuery({
    id: selectedBoardId,
  });

  return (
    <Flex flexGrow={1} columnGap={6} overflow="auto" pb={8} data-test="board">
      {selectedBoard?.columns.map((columnData) => (
        <Column
          key={columnData.id}
          id={columnData.id}
          title={columnData.title}
        />
      ))}
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
};

export default Board;
