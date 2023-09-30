import { Box, HStack, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import CompletedProjectTaskList from "../components/CompletedProjectTaskList";
import UncompletedTaskContainer from "../components/UncompletedTaskContainer";

type Props = {};


function ProjectAdminPage({}: Props): ReactElement {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <UncompletedTaskContainer />
      <CompletedProjectTaskList />
    </Box>
  );
}

export default ProjectAdminPage;
