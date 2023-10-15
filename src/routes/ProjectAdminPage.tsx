import { Box, HStack, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import CompletedProjectTaskList from "../components/CompletedProjectTaskList";
import UncompletedTaskContainer from "../components/UncompletedTaskContainer";
import InprogressTaskContainer from "../components/InprogressTaskContainer";

type Props = {};

function ProjectAdminPage({}: Props): ReactElement {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <UncompletedTaskContainer />
      <InprogressTaskContainer />
      <CompletedProjectTaskList />
    </Box>
  );
}

export default ProjectAdminPage;
