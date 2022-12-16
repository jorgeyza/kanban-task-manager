import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { cssVar } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const $width = cssVar('switch-track-width');
const $height = cssVar('switch-track-height');

const sizes = {
  md: definePartsStyle({
    container: {
      [$width.variable]: '2.25rem',
      [$height.variable]: 'sizes.4'
    }
  })
};

const baseStyle = definePartsStyle({
  track: {
    bg: 'purple',
    _checked: {
      bg: 'purple'
    },
    _hover: {
      bg: 'lightPurple'
    }
  }
});

export const Switch = defineMultiStyleConfig({ baseStyle, sizes });
