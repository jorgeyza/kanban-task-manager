import {
  Switch,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { DarkThemeIcon, LightThemeIcon } from "@/assets";

const ColorToggle = () => {
  const { toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("lighterGray", "lightBlack");

  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      gap={2}
      paddingY={3}
      marginTop="auto"
      marginX={6}
      marginBottom={2}
      rounded={8}
      backgroundColor={backgroundColor}
    >
      <LightThemeIcon />
      <Switch onChange={toggleColorMode} />
      <DarkThemeIcon />
    </HStack>
  );
};

export default ColorToggle;
