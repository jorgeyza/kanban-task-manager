import {
  Center,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

import { selectedBoardIdAtom } from "~/pages/_app";

import Column from "./Column";
import CreateOrEditBoardModal from "../Sidebar/CreateOrEditBoardModal";

import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";

const Board = () => {
  const newColumnBackgroundColor = useColorModeValue("lightGray", "darkerGray");
  const newColumnHoverBackgroundColor = useColorModeValue(
    "purpleAlpha25",
    "darkGray"
  );

  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } =
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
        onClick={onOpen}
        {...createOrEditBoardButtonProps}
      >
        + New Column
      </Center>
      <CreateOrEditBoardModal
        isOpen={isOpen}
        onClose={onClose}
        getDisclosureProps={getDisclosureProps}
        action="EDIT"
      />
    </Flex>
  );
};

export default Board;
