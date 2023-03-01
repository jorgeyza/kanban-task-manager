import type { UseModalProps } from "@chakra-ui/react";
import { type Subtask, type Task } from "@prisma/client";
import { type DynamicChakraModalAction } from "./constants";

type ObjectValues<T> = T[keyof T];

export type HTMLProps = React.HTMLAttributes<HTMLElement>;
export interface ChakraModalProps extends UseModalProps {
  getDisclosureProps: (props?: HTMLProps) => HTMLProps;
}
export interface DynamicChakraModalProps extends ChakraModalProps {
  action: ObjectValues<typeof DynamicChakraModalAction>;
  task?: Task;
  subtasks?: Subtask[];
}

// export interface DynamicChakraModalProps<
//   Action extends keyof typeof DynamicChakraModalAction
// > extends ChakraModalProps {
//   action: Action;
//   task: Action extends "EDIT" ? Task : undefined;
// }
