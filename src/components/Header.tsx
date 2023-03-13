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
  Tooltip,
  Skeleton,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import Link from "next/link";

import { Logo, LogoMobile, VerticalEllipsisIcon } from "~/assets";
import { drawerAtom } from "~/pages/_app";

import CreateOrEditTaskModal from "./CreateOrEditTaskModal";
import CreateOrEditBoardModal from "./CreateOrEditBoardModal";

import { type HTMLProps } from "~/types";
import { api } from "~/utils/api";
import { ROUTE_BOARD_ID } from "~/constants";

const Header = () => {
  const router = useRouter();
  const selectedBoardId = router.query.boardId as string;

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

  const utils = api.useContext();

  const { data: selectedBoard } = api.board.getOne.useQuery(
    {
      id: selectedBoardId,
    },
    { enabled: !!selectedBoardId }
  );

  const { data: allBoards } = api.board.getAll.useQuery();

  const headingText =
    router.pathname === "/" ? "Welcome!" : selectedBoard?.title;

  const deleteBoard = api.board.delete.useMutation({
    onSuccess() {
      void utils.board.getAll.invalidate();

      const previousAvailableBoard = allBoards?.at(-2)?.id;
      if (!previousAvailableBoard) return router.replace("/");
      return router.replace({
        pathname: ROUTE_BOARD_ID,
        query: previousAvailableBoard,
      });
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
        data-test="header"
        shrink={0}
      >
        <Flex align="center" columnGap={6} h="100%">
          {!isDrawerOpen && (
            <Center
              as={Link}
              h="100%"
              pr={6}
              pl={1}
              color={logoColor}
              borderColor={logoBorderColor}
              borderRight="1px solid"
              data-test="logo"
              href="/"
            >
              <Box display={{ base: "none", md: "block" }}>
                <Logo />
              </Box>
              <Box display={{ base: "block", md: "none" }} w="30px">
                <LogoMobile />
              </Box>
            </Center>
          )}
          <Heading as="h1" mr={4} color={headingColor} size="md">
            {allBoards ? headingText : <Skeleton w="200px" h="40px" />}
          </Heading>
        </Flex>
        {selectedBoard && (
          <Flex align="center" columnGap={6}>
            <Tooltip
              aria-label="A tooltip"
              label={
                selectedBoard?.columns.length === 0 &&
                "You have to create a column before adding tasks"
              }
            >
              <Button
                bgColor="customPurple.500"
                isDisabled={selectedBoard?.columns.length === 0}
                onClick={createOrEditTaskModalOnOpen}
                size={{ base: "md", md: "lg" }}
                variant="primary"
                {...createOrEditTaskModalButtonProps}
              >
                + Add New Task
              </Button>
            </Tooltip>
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
        )}
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
