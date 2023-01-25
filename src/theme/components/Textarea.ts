import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  fontSize: "12px",
});

export const Textarea = defineStyleConfig({
  variants: { outline },
});
