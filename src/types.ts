import type { UseModalProps } from "@chakra-ui/react";
import { type DYNAMIC_CHAKRA_MODAL_ACTION } from "./constants";
import { type RouterOutputs } from "./utils/api";

type ObjectValues<T> = T[keyof T];

type Board = RouterOutputs["board"]["getOne"];
export type Task = RouterOutputs["task"]["getInfiniteByColumnId"]["tasks"][0];
export type Subtask = RouterOutputs["subtask"]["getAllByTaskId"][0];

export type HTMLProps = React.HTMLAttributes<HTMLElement>;
export interface ChakraModalProps extends UseModalProps {
  getDisclosureProps: (props?: HTMLProps) => HTMLProps;
}
export interface DynamicChakraModalProps extends ChakraModalProps {
  action: ObjectValues<typeof DYNAMIC_CHAKRA_MODAL_ACTION>;
  task?: Task;
  subtasks?: Subtask[];
  board?: Board;
}

// export interface DynamicChakraModalProps<
//   Action extends keyof typeof DYNAMIC_CHAKRA_MODAL_ACTION
// > extends ChakraModalProps {
//   action: Action;
//   task: Action extends "EDIT" ? Task : undefined;
// }
