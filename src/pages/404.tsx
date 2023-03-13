import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import Link from "next/link";
import { LogoMobile, ShowSidebarIcon } from "~/assets";
import { drawerAtom } from "./_app";
export default function Custom404() {
  const [isDrawerOpen, setIsDrawerOpen] = useAtom(drawerAtom);

  function handleOpenDrawer() {
    setIsDrawerOpen(true);
  }
  return (
    <>
      {!isDrawerOpen && (
        <Center
          flexDir={{ base: "column", md: "row" }}
          rowGap={5}
          columnGap={10}
          w="100%"
          h="100%"
        >
          <Box w="30%">
            <LogoMobile />
          </Box>
          <Flex align="center" direction="column">
            <Heading>404</Heading>
            <Text fontSize={20}>
              Uh oh! 😮 This does not look like a board{" "}
            </Text>
            <Button as={Link} mt={8} href="/" size="lg">
              Take me back home
            </Button>
          </Flex>
        </Center>
      )}
      {!isDrawerOpen && (
        <Button transform="auto" onClick={handleOpenDrawer} translateX="-40px">
          <Box pl={3}>
            <ShowSidebarIcon />
          </Box>
        </Button>
      )}
    </>
  );
}
