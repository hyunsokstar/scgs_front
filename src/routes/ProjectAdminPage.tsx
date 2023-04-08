import { Box, HStack, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import CompletedProjectTaskList from "../components/CompletedProjectTaskList";
import UncompletedProjectTaskList from "../components/UncompletedProjectTaskList";

type Props = {};

// rome-ignore lint/correctness/noEmptyPattern: <explanation>
function ProjectAdminPage({}: Props): ReactElement {
  return (
    <VStack gap={1}>
      <UncompletedProjectTaskList />
      <CompletedProjectTaskList />
    </VStack>
  );
}

export default ProjectAdminPage;
