import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import { VerticalEllipsisIcon } from "~/assets";
import { TASK_STATUS_ENUM } from "~/constants";
import type { ChakraModalProps } from "~/types";

const TaskModal = ({
  isOpen,
  onClose,
  getDisclosureProps,
}: ChakraModalProps) => {
  const taskBackgroundColor = useColorModeValue("white", "darkerGray");
  const checkboxBackgroundColor = useColorModeValue(
    "lighterGray",
    "lightBlack"
  );

  const taskModalDisclosureProps = getDisclosureProps();

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...taskModalDisclosureProps}>
      <ModalOverlay />
      <ModalContent
        rowGap={6}
        p={8}
        bgColor={taskBackgroundColor}
      >
        <ModalHeader p={0}>
          <Flex justify="space-between">
            <Heading as="h4" variant="modal-title">
              Create paper prototypes and conduct 10 usability tests with
              potential customers
            </Heading>
            <Box flexShrink={0} cursor="pointer">
              <VerticalEllipsisIcon />
            </Box>
          </Flex>
        </ModalHeader>
        <ModalBody flexDir="column" rowGap={6} display="flex" p={0}>
          <Text as="p" variant="basic-text">
            some description goes here lalala alala alalalalalala allalaa al
            allaa some-tlaas-dfdfssd
          </Text>
          <Flex direction="column" rowGap={4}>
            <Heading as="h5" variant="modal-subtitle">
              Subtasks (2 of 2)
            </Heading>
            <CheckboxGroup
              colorScheme="customPurple"
              defaultValue={["naruto", "kakashi"]}
            >
              <VStack alignItems="start" spacing={2}>
                <Checkbox
                  w="full"
                  p={3}
                  borderRadius={4}
                  bgColor={checkboxBackgroundColor}
                  value="naruto"
                >
                  <Text variant="modal-checkbox">
                    Meet to review notes from previous tests and plan changes
                  </Text>
                </Checkbox>
                <Checkbox
                  w="full"
                  p={3}
                  borderRadius={4}
                  bgColor={checkboxBackgroundColor}
                  value="sasuke"
                >
                  <Text variant="modal-checkbox">
                    Make changes to paper prototypes
                  </Text>
                </Checkbox>
                <Checkbox
                  w="full"
                  p={3}
                  borderRadius={4}
                  bgColor={checkboxBackgroundColor}
                  value="kakashi"
                >
                  <Text variant="modal-checkbox">
                    Conduct 5 usability tests
                  </Text>
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </Flex>
          <Flex direction="column" rowGap={2}>
            <Heading as="h5" variant="modal-subtitle">
              Status
            </Heading>
            <Select
              fontSize="13px"
              borderColor="lightGrayAlpha25"
              iconColor="customPurple.500"
              placeholder="Select option"
            >
              {TASK_STATUS_ENUM.map((taskStatus) => {
                return (
                  <option key={taskStatus} value={taskStatus}>
                    {taskStatus}
                  </option>
                );
              })}
            </Select>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
