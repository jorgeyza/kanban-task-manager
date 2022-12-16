import { type ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 'full'
  },
  sizes: {
    lg: {
      fontSize: 'md',
      px: '25px',
      py: '15px'
    },
    md: {
      fontSize: 'sm',
      px: '23px',
      py: '8px'
    }
  },
  variants: {
    primary: {
      bg: 'purple',
      _hover: {
        bg: 'lightPurple'
      }
    },
    secondary: {
      bg: 'lightGray',
      color: 'purple',
      _hover: {
        bg: 'lightPurple'
      }
    },
    destructive: {
      bg: 'error',
      _hover: {
        bg: 'lightRed'
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
    colorScheme: ''
  }
};
