import type { UseModalProps } from "@chakra-ui/react";

export type HTMLProps = React.HTMLAttributes<HTMLElement>;
export interface ChakraModalProps extends UseModalProps {
  getDisclosureProps: (props?: HTMLProps) => HTMLProps;
}

export interface DynamicChakraModalProps extends ChakraModalProps {
  action: "CREATE" | "EDIT";
}
