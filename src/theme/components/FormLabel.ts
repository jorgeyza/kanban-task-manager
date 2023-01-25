import { defineStyleConfig } from "@chakra-ui/react";

export const FormLabel = defineStyleConfig({
  variants: {
    "modal-subtitle": {
      fontSize: "12px",
      fontWeight: "bold",
      color: "black",
      _dark: {
        color: "white",
      },
    },
  },
});
