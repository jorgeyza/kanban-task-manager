import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { globalStyles as styles } from './styles';
import components from './components';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const colors = {
  black: '#000112',
  gray: '#828FA3',
  white: '#FFFFFF',
  whiteSoft: '#eff6ff',
  lightGray: '#E4EBFA',
  lightGrayAlpha25: 'rgba(130, 143, 163, .25)',
  lighterGray: '#F4F7FD',
  darkGray: '#3E3F4E',
  darkerGray: '#2B2C37',
  purple: '#635FC7',
  purpleAlpha25: 'rgba(99, 95, 199, .25)',
  lightPurple: '#A8A4FF',
  red: '#EA5555',
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
