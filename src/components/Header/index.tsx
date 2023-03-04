import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

import { Logo, VerticalEllipsisIcon } from "~/assets";
import { drawerAtom } from "~/pages/_app";
import { selectedBoardIdAtom } from "~/pages/_app";

import CreateOrEditTaskModal from "./CreateOrEditTaskModal";
import CreateOrEditBoardModal from "../Sidebar/CreateOrEditBoardModal";

import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";

const Header = () => {
  const borderColor = useColorModeValue("lightGray", "lightGrayAlpha25");
  const backgroundColor = useColorModeValue("white", "darkerGray");
  const headingColor = useColorModeValue("black", "white");
  const logoColor = useColorModeValue("black", "white");
  const logoBorderColor = useColorModeValue("lightGray", "lightGrayAlpha25");

  const {
    isOpen: createOrEditTaskModalIsOpen,
    onOpen: createOrEditTaskModalOnOpen,
    onClose: createOrEditTaskModalOnClose,
    getButtonProps: createOrEditTaskModalGetButtonProps,
    getDisclosureProps: createOrEditTaskModalGetDisclosureProps,
  } = useDisclosure();
  const createOrEditTaskModalButtonProps =
    createOrEditTaskModalGetButtonProps() as HTMLProps;

  const {
    isOpen: createOrEditBoardModalIsOpen,
    onOpen: createOrEditBoardModalOnOpen,
    onClose: createOrEditBoardModalOnClose,
    getButtonProps: createOrEditBoardModalGetButtonProps,
    getDisclosureProps: createOrEditBoardModalGetDisclosureProps,
  } = useDisclosure();
  const createOrEditBoardModalButtonProps =
    createOrEditBoardModalGetButtonProps() as HTMLProps;

  const [isDrawerOpen] = useAtom(drawerAtom);
  const [selectedBoardId, setSelectedBoardId] = useAtom(selectedBoardIdAtom);

  const utils = api.useContext();

  const { data: selectedBoard } = api.board.getOne.useQuery({
    id: selectedBoardId,
  });

  const { data: allBoards } = api.board.getAll.useQuery();

  const deleteBoard = api.board.delete.useMutation({
    onSuccess() {
      void utils.board.getAll.invalidate();
      setSelectedBoardId(allBoards?.at(-2)?.id ?? "");
    },
  });

  const handleDeleteBoard = () => {
    deleteBoard.mutate({ id: selectedBoardId });
  };

  return (
    <>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        h="97px"
        px={5}
        borderBottomWidth="thin"
        borderBottomColor={borderColor}
        bgColor={backgroundColor}
      >
        <Flex align="center" columnGap={6} h="100%">
          {!isDrawerOpen && (
            <Center
              h="100%"
              pr={6}
              pl={1}
              color={logoColor}
              borderColor={logoBorderColor}
              borderRight="1px solid"
            >
              <Logo />
            </Center>
          )}
          <Heading as="h1" color={headingColor} size="md">
            {selectedBoard?.title}
          </Heading>
        </Flex>
        <Flex align="center" columnGap={6}>
          <Button
            bgColor="customPurple.500"
            onClick={createOrEditTaskModalOnOpen}
            size="lg"
            variant="primary"
            {...createOrEditTaskModalButtonProps}
          >
            + Add New Task
          </Button>
          <Menu>
            <MenuButton as={Box} cursor="pointer">
              <VerticalEllipsisIcon />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={createOrEditBoardModalOnOpen}
                {...createOrEditBoardModalButtonProps}
              >
                Edit Board
              </MenuItem>
              <MenuItem color="customRed" onClick={handleDeleteBoard}>
                Delete Board
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <CreateOrEditTaskModal
        isOpen={createOrEditTaskModalIsOpen}
        onClose={createOrEditTaskModalOnClose}
        getDisclosureProps={createOrEditTaskModalGetDisclosureProps}
        action="CREATE"
      />
      {selectedBoard && createOrEditBoardModalIsOpen && (
        <CreateOrEditBoardModal
          isOpen={createOrEditBoardModalIsOpen}
          onClose={createOrEditBoardModalOnClose}
          getDisclosureProps={createOrEditBoardModalGetDisclosureProps}
          action="EDIT"
          board={selectedBoard}
        />
      )}
    </>
  );
};

export default Header;
