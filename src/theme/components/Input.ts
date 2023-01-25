import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const sizes = {
  md: definePartsStyle({
    field: {
      fontSize: "12px",
    },
  }),
};

const customOutline = definePartsStyle({
  field: {
    borderColor: "lightGrayAlpha25",
  },
});

export const Input = defineMultiStyleConfig({
  variants: { customOutline },
  sizes,
});
