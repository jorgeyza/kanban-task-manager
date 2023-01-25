import { defineStyleConfig } from "@chakra-ui/react";

export const Heading = defineStyleConfig({
  baseStyle: {
    textAlign: "left",
  },
  variants: {
    "board-title": {
      size: "md",
      fontWeight: "bold",
    },
    "board-column-title": {
      fontSize: "12px",
      fontWeight: "bold",
      lineHeight: "15px",
      letterSpacing: "2.4px",
      textTransform: "uppercase",
    },
    "task-heading": {
      fontSize: "15px",
      fontWeight: "bold",
      color: "black",
      _dark: {
        color: "white",
      },
    },
    "modal-title": {
      fontSize: "18px",
      fontWeight: "bold",
      color: "black",
      _dark: {
        color: "white",
      },
    },
    "modal-subtitle": {
      fontSize: "12px",
      fontWeight: "bold",
      color: "black",
      _dark: {
        color: "white",
      },
    },
  },
  sizes: {
    md: {
      fontSize: { base: "16px", md: "20px", lg: "24px" },
    },
  },
});
