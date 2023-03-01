import type { UseModalProps } from "@chakra-ui/react";
import { type DynamicChakraModalAction } from "./constants";
import { type RouterOutputs } from "./utils/api";

type ObjectValues<T> = T[keyof T];

type Board = RouterOutputs["board"]["getOne"];
type Task = RouterOutputs["task"]["getAllByColumnId"][0];
type Subtask = RouterOutputs["subtask"]["getAllByTaskId"][0];

export type HTMLProps = React.HTMLAttributes<HTMLElement>;
export interface ChakraModalProps extends UseModalProps {
  getDisclosureProps: (props?: HTMLProps) => HTMLProps;
}
export interface DynamicChakraModalProps extends ChakraModalProps {
  action: ObjectValues<typeof DynamicChakraModalAction>;
  task?: Task;
  subtasks?: Subtask[];
  board?: Board;
}

// export interface DynamicChakraModalProps<
//   Action extends keyof typeof DynamicChakraModalAction
// > extends ChakraModalProps {
//   action: Action;
//   task: Action extends "EDIT" ? Task : undefined;
// }
