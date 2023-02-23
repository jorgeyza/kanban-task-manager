import { ColorModeScript, type ThemeConfig } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "~/theme";

const themeConfig = theme.config as ThemeConfig;

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
