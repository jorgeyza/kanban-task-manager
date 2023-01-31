import {
  Center,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import Column from "./Column";
import CreateOrEditBoardModal from "../Sidebar/CreateOrEditBoardModal";

const Board = () => {
  const newColumnBackgroundColor = useColorModeValue("lightGray", "darkerGray");
  const newColumnHoverBackgroundColor = useColorModeValue(
    "purpleAlpha25",
    "darkGray"
  );

  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();
  const createOrEditBoardButtonProps = getButtonProps();

  return (
    <Flex
      columnGap={6}
      paddingBottom={8}
      overflow="auto"
      flexGrow={1}
      data-test="board"
    >
      <Column />
      <Column />
      <Column />
      <Center
        as="button"
        minWidth="280px"
        height="90%"
        marginTop="34px"
        borderRadius={8}
        fontSize="24px"
        fontWeight="bold"
        color="customPurple.500"
        backgroundColor={newColumnBackgroundColor}
        _hover={{ backgroundColor: newColumnHoverBackgroundColor }}
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
