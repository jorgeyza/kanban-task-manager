import {
  Switch,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { DarkThemeIcon, LightThemeIcon } from "~/assets";

const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("lighterGray", "lightBlack");

  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      gap={2}
      mt="auto"
      mb={2}
      py={3}
      bgColor={backgroundColor}
      marginX={6}
      rounded={8}
    >
      <LightThemeIcon />
      <Switch onChange={toggleColorMode} />
      <DarkThemeIcon />
    </HStack>
  );
};

export default ColorModeToggle;
