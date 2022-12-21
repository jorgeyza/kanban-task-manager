import { baseTheme as base, extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { globalStyles as styles } from './styles';
import components from './components';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const colors = {
  black: '#000112',
  customGray: '#828FA3',
  white: '#FFFFFF',
  whiteSoft: '#EFF6FF',
  lightGray: '#E4EBFA',
  lightGrayAlpha25: 'rgba(130, 143, 163, .25)',
  lighterGray: '#F4F7FD',
  darkGray: '#3E3F4E',
  darkerGray: '#2B2C37',
  customPurple: {
    ...base.colors.purple,
    200: '#9895DA',
    500: '#635FC7',
    600: '#5D59C5'
  },
  purpleAlpha25: 'rgba(99, 95, 199, .25)',
  lightPurple: '#A8A4FF',
  customRed: '#EA5555',
  lightRed: '#FF9898',
  lightBlack: '#20212C'
};

const fonts = {
  heading: `Plus Jakarta Sans, sans-serif`,
  body: `Plus Jakarta Sans, sans-serif`
};

const theme = extendTheme({
  config,
  components,
  colors,
  fonts,
  semanticTokens: {
    colors: {
      mainBackgroundColor: {
        default: 'lighterGray',
        _dark: 'lightBlack'
      }
    }
  },
  styles
});

export default theme;
