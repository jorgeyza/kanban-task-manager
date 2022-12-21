import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  variants: {
    'basic-text': {
      fontSize: '13px'
    },
    'boards-list': {
      fontSize: '15px',
      fontWeight: 'bold'
    },
    'modal-checkbox': {
      fontSize: '12px',
      fontWeight: 'bold'
    }
  }
});
