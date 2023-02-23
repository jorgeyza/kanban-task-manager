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

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Flex
        as="aside"
        flexDirection="column"
        height="100vh"
        minWidth={isDrawerOpen ? 300 : 0}
        width={0}
        paddingY={8}
        borderRight="1px solid"
        borderColor={sidebarBorderColor}
        backgroundColor={sidebarBackgroundColor}
        overflow="hidden"
        transition="all .5s cubic-bezier(0.820, 0.085, 0.395, 0.895)"
        data-test="sidebar"
      >
        <Box marginBottom={54} paddingX={6} color={LogoColor}>
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
      display="flex"
      position="relative"
      alignItems="center"
      height="48px"
      columnGap={4}
      paddingX={6}
      marginRight={6}
      borderRightRadius="full"
      cursor="pointer"
      _hover={{
        backgroundColor: hoverBackgroundColor,
        color: "customPurple.500",
      }}
      onClick={onHideSidebar}
    >
      <HideSidebarIcon />
      <Text variant="boards-list">Hide Sidebar</Text>
    </Flex>
  );
};
