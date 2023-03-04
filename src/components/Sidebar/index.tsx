import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { HideSidebarIcon, Logo } from "~/assets";

import AllBoards from "./AllBoards";
import ColorModeToggle from "./ColorModeToggle";
import { drawerAtom } from "~/pages/_app";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useAtom(drawerAtom);

  const sidebarBackgroundColor = useColorModeValue("white", "darkerGray");
  const sidebarBorderColor = useColorModeValue("lightGray", "lightGrayAlpha25");
  const LogoColor = useColorModeValue("black", "white");

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
  }

  return (
    <>
      <Flex
        as="aside"
        direction="column"
        overflow="hidden"
        w={0}
        minW={isDrawerOpen ? 300 : 0}
        h="100vh"
        py={8}
        borderColor={sidebarBorderColor}
        borderRight="1px solid"
        transition="all .5s cubic-bezier(0.820, 0.085, 0.395, 0.895)"
        bgColor={sidebarBackgroundColor}
        data-test="sidebar"
      >
        <Box mb={54} px={6} color={LogoColor}>
          <Logo />
        </Box>
        <AllBoards />
        <ColorModeToggle />
        <HideSidebarButton onHideSidebar={handleCloseDrawer} />
      </Flex>
    </>
  );
};

export default Sidebar;

const HideSidebarButton = ({
  onHideSidebar,
}: {
  onHideSidebar: () => void;
}) => {
  const hoverBackgroundColor = useColorModeValue("purpleAlpha25", "white");
  return (
    <Flex
      pos="relative"
      align="center"
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
      onClick={onHideSidebar}
    >
      <HideSidebarIcon />
      <Text variant="boards-list">Hide Sidebar</Text>
    </Flex>
  );
};
