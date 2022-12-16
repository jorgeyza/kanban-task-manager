import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  variants: {
    'board-title': {
      fontSize: 'xs',
      letterSpacing: '.24rem',
      fontWeight: 'bold',
      lineHeight: 'shorter',
      textTransform: 'uppercase'
    }
  }
});
