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

import { Logo, VerticalEllipsisIcon } from "@/assets";
import { drawerAtom } from "@/pages/_app";
import AddNewTaskModal from "./AddNewTaskModal";

const Header = () => {
  const borderColor = useColorModeValue("lightGray", "lightGrayAlpha25");
  const backgroundColor = useColorModeValue("white", "darkerGray");
  const headingColor = useColorModeValue("black", "white");
  const logoColor = useColorModeValue("black", "white");
  const logoBorderColor = useColorModeValue("lightGray", "lightGrayAlpha25");

  const [isDrawerOpen] = useAtom(drawerAtom);

  const { isOpen, onOpen, onClose, getButtonProps, getDisclosureProps } =
    useDisclosure();
  const addNewTaskModalButtonProps = getButtonProps();

  return (
    <>
      <Flex
        as="header"
        backgroundColor={backgroundColor}
        justifyContent="space-between"
        height="97px"
        alignItems="center"
        paddingX={5}
        borderBottomColor={borderColor}
        borderBottomWidth="thin"
      >
        <Flex height="100%" columnGap={6} alignItems="center">
          {!isDrawerOpen && (
            <Center
              paddingRight={6}
              height="100%"
              paddingLeft={1}
              borderRight="1px solid"
              borderColor={logoBorderColor}
              color={logoColor}
            >
              <Logo />
            </Center>
          )}
          <Heading as="h1" size="md" color={headingColor}>
            Platform Launch
          </Heading>
        </Flex>
        <Flex alignItems="center" columnGap={6}>
          <Button
            variant="primary"
            size="lg"
            backgroundColor="customPurple.500"
            onClick={onOpen}
            {...addNewTaskModalButtonProps}
          >
            + Add New Task
          </Button>
          <Menu>
            <MenuButton as={Box} cursor="pointer">
              <VerticalEllipsisIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit Board</MenuItem>
              <MenuItem color="customRed">Delete Board</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <AddNewTaskModal
        isOpen={isOpen}
        onClose={onClose}
        getDisclosureProps={getDisclosureProps}
      />
    </>
  );
};

export default Header;
