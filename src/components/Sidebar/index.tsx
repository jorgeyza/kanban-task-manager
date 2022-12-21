import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { HideSidebarIconSVG, Logo } from '@/assets';

import AllBoards from './AllBoards';
import ColorToggle from './ColorToggle';

const Sidebar = () => {
  const sidebarBackgroundColor = useColorModeValue('white', 'darkerGray');
  const sidebarBorderColor = useColorModeValue('lightGray', 'lightGrayAlpha25');
  const LogoColor = useColorModeValue('black', 'white');

  return (
    <Flex
      as='aside'
      flexDirection='column'
      flexBasis={300}
      flexShrink={0}
      height='100vh'
      paddingY={8}
      borderRight='1px solid'
      borderColor={sidebarBorderColor}
      backgroundColor={sidebarBackgroundColor}
    >
      <Box marginBottom={54} paddingX={6} color={LogoColor}>
        <Logo />
      </Box>
      <AllBoards />
      <ColorToggle />
      <HideSidebarButton />
    </Flex>
  );
};

export default Sidebar;

const HideSidebarButton = () => {
  const hoverBackgroundColor = useColorModeValue('purpleAlpha25', 'white');
  return (
    <Flex
      display='flex'
      position='relative'
      alignItems='center'
      height='48px'
      columnGap={4}
      paddingX={6}
      marginRight={6}
      borderRightRadius='full'
      cursor='pointer'
      _hover={{ backgroundColor: hoverBackgroundColor, color: 'customPurple.500' }}
    >
      <HideSidebarIconSVG />
      <Text variant='boards-list'>Hide Sidebar</Text>
    </Flex>
  );
};
