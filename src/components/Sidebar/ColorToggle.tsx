import { Switch, HStack, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { DarkThemeIconSVG, LightThemeIconSVG } from '@/assets';

const ColorToggle = () => {
  const { toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue('lighterGray', 'lightBlack');

  return (
    <HStack
      alignItems='center'
      justifyContent='center'
      gap={2}
      paddingY={3}
      marginX={6}
      marginBottom={1}
      rounded={8}
      backgroundColor={backgroundColor}>
      <LightThemeIconSVG />
      <Switch onChange={toggleColorMode} />
      <DarkThemeIconSVG />
    </HStack>
  );
};

export default ColorToggle;

// const Switchlala: FC<SwitchProps> = ({ onChange }) => {
//   const { isOpen, onToggle } = useDisclosure();
//   const handleOnClick = () => {
//     onToggle();
//     setTimeout(() => onChange(isOpen), 200);
//   };

//   return (
//     <Stack onClick={handleOnClick} width={10} rounded={'full'} backgroundColor={'purple'} p={'3px'} height={5}>
//       <chakra.span
//         transition={'all 200ms ease-in'}
//         ml={isOpen ? 0 : 'calc(100% - 14px)'}
//         rounded={'full'}
//         display={'block'}
//         width={3.5}
//         backgroundColor={'white'}
//         height={3.5}
//       />
//     </Stack>
//   );
// };
