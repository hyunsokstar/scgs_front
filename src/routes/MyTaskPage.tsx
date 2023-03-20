import { VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import CompletedProjectTaskListForMe from "../components/CompletedProjectTaskListForMe";
import UncompletedProjectTaskListForMe from "../components/UncompletedProjectTaskListForMe";


interface Props {}

function MyTaskPage({}: Props): ReactElement {

  return (
      <VStack gap={2}>
        <UncompletedProjectTaskListForMe />
        <CompletedProjectTaskListForMe />
      </VStack>
  );
}

export default MyTaskPage;
