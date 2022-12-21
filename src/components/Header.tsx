import { Button, Flex, Heading, useColorModeValue } from '@chakra-ui/react';

import { VerticalEllipsisIconSVG } from '@/assets';

const Header = () => {
  const borderColor = useColorModeValue('lightGray', 'lightGrayAlpha25');
  const backgroundColor = useColorModeValue('white', 'darkerGray');
  const headingColor = useColorModeValue('black', 'white');

  return (
    <Flex
      as='header'
      backgroundColor={backgroundColor}
      justifyContent='space-between'
      height='97px'
      alignItems='center'
      padding={5}
      borderBottomColor={borderColor}
      borderBottomWidth='thin'
    >
      <Heading as='h1' size='md' color={headingColor}>
        Platform Launch
      </Heading>
      <Flex alignItems='center' columnGap={6}>
        <Button variant='primary' backgroundColor='customPurple.500' size='lg'>
          + Add New Task
        </Button>
        <VerticalEllipsisIconSVG />
      </Flex>
    </Flex>
  );
};

export default Header;
