import { Box, HStack, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import CompletedProjectTaskListForTester from "../components/CompletedProjectTaskListForTester";

type Props = {};

// rome-ignore lint/correctness/noEmptyPattern: <explanation>
function TestBoardPage({}: Props): ReactElement {
  return (
    <VStack gap={1}>
      <CompletedProjectTaskListForTester />
    </VStack>
  );
}

export default TestBoardPage;

