import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import Link from "next/link";
import { ShowSidebarIcon } from "~/assets";
import { drawerAtom } from "./_app";
export default function Custom404() {
  const [isDrawerOpen, setIsDrawerOpen] = useAtom(drawerAtom);

  function handleOpenDrawer() {
    setIsDrawerOpen(true);
  }
  return (
    <>
      <Center columnGap={10} w="100%" h="100%">
        <Box w="30%">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 26"
            fill="none"
          >
            <g clip-path="url(#clip0_3_38)">
              <path
                d="M4 0.5H2C0.89543 0.5 0 1.39543 0 2.5V23.5C0 24.6046 0.89543 25.5 2 25.5H4C5.10457 25.5 6 24.6046 6 23.5V2.5C6 1.39543 5.10457 0.5 4 0.5Z"
                fill="#635FC7"
              />
              <path
                opacity="0.75"
                d="M13 0.5H11C9.89543 0.5 9 1.39543 9 2.5V23.5C9 24.6046 9.89543 25.5 11 25.5H13C14.1046 25.5 15 24.6046 15 23.5V2.5C15 1.39543 14.1046 0.5 13 0.5Z"
                fill="#635FC7"
              />
              <path
                opacity="0.5"
                d="M22 0.5H20C18.8954 0.5 18 1.39543 18 2.5V23.5C18 24.6046 18.8954 25.5 20 25.5H22C23.1046 25.5 24 24.6046 24 23.5V2.5C24 1.39543 23.1046 0.5 22 0.5Z"
                fill="#635FC7"
              />
            </g>
            <defs>
              <clipPath id="clip0_3_38">
                <rect
                  width="24"
                  height="25"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </Box>
        <Flex align="center" direction="column">
          <Heading>404</Heading>
          <Text fontSize={20}>Uh oh! 😮 This does not look like a board </Text>
          <Button as={Link} mt={8} href="/" size="lg">
            Take me back home
          </Button>
        </Flex>
      </Center>
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
