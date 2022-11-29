import { theme as base, extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { globalStyles as styles } from './styles';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const colors = {
  black: 'hsla(237, 100%, 4%, 1)',
  gray: 'hsla(216, 15%, 57%, 1)',
  white: 'hsla(0, 0%, 100%, 1)',
  whiteSoft: 'hsla(214, 100%, 97%, 1)',
  lightGray: 'hsla(221, 69%, 94%, 1)',
  lightGrayAlpha25: 'hsla(221, 69%, 94%, 0.25)',
  lighterGray: 'hsla(220, 69%, 97%, 1)',
  darkGray: 'hsla(236, 11%, 27%, 1)',
  darkerGray: 'hsla(235, 12%, 19%, 1)',
  purple: 'hsla(242, 48%, 58%, 1)',
  purpleAlpha25: 'hsla(242, 48%, 58%, 0.25)',
  lightPurple: 'hsla(243, 100%, 82%, 1)',
  red: 'hsla(0, 78%, 63%, 1)',
  lightRed: 'hsla(0, 100%, 80%, 1)',
  lightBlack: 'hsla(235, 16%, 15%, 1)'
};

const fonts = {
  heading: `Plus Jakarta Sans, sans-serif, ${base.fonts?.heading}`,
  body: `Plus Jakarta Sans, sans-serif, ${base.fonts?.body}`
};

const theme = extendTheme({
  config,
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
