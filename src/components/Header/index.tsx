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

import AddNewTaskModal from "./AddNewTaskModal";
import CreateOrEditBoardModal from "../Sidebar/CreateOrEditBoardModal";

import { type HTMLProps } from "~/types";

const Header = () => {
  const borderColor = useColorModeValue("lightGray", "lightGrayAlpha25");
  const backgroundColor = useColorModeValue("white", "darkerGray");
  const headingColor = useColorModeValue("black", "white");
  const logoColor = useColorModeValue("black", "white");
  const logoBorderColor = useColorModeValue("lightGray", "lightGrayAlpha25");

  const [isDrawerOpen] = useAtom(drawerAtom);

  const {
    isOpen: addNewTaskModalIsOpen,
    onOpen: addNewTaskModalOnOpen,
    onClose: addNewTaskModalOnClose,
    getButtonProps: addNewTaskModalGetButtonProps,
    getDisclosureProps: addNewTaskModalGetDisclosureProps,
  } = useDisclosure();
  const addNewTaskModalButtonProps =
    addNewTaskModalGetButtonProps() as HTMLProps;

  const {
    isOpen: createOrEditBoardModalIsOpen,
    onOpen: createOrEditBoardModalOnOpen,
    onClose: createOrEditBoardModalOnClose,
    getButtonProps: createOrEditBoardModalGetButtonProps,
    getDisclosureProps: createOrEditBoardModalGetDisclosureProps,
  } = useDisclosure();
  const createOrEditBoardModalButtonProps =
    createOrEditBoardModalGetButtonProps() as HTMLProps;

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
            Platform Launch
          </Heading>
        </Flex>
        <Flex align="center" columnGap={6}>
          <Button
            bgColor="customPurple.500"
            onClick={addNewTaskModalOnOpen}
            size="lg"
            variant="primary"
            {...addNewTaskModalButtonProps}
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
              <MenuItem color="customRed">Delete Board</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <AddNewTaskModal
        isOpen={addNewTaskModalIsOpen}
        onClose={addNewTaskModalOnClose}
        getDisclosureProps={addNewTaskModalGetDisclosureProps}
      />
      <CreateOrEditBoardModal
        isOpen={createOrEditBoardModalIsOpen}
        onClose={createOrEditBoardModalOnClose}
        getDisclosureProps={createOrEditBoardModalGetDisclosureProps}
        action="EDIT"
      />
    </>
  );
};

export default Header;
