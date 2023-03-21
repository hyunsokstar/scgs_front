import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import CompletedProjectTaskListForMe from "../components/CompletedProjectTaskListForMe";
import UncompletedProjectTaskListForMe from "../components/UncompletedProjectTaskListForMe";

interface Props {}

function MyTaskPage({}: Props): ReactElement {
  return (
    <Box width={"100%"}>
      <Flex direction={"column"} gap={5} mt={0} border={"1px solid blue"}>
        <UncompletedProjectTaskListForMe />
        <CompletedProjectTaskListForMe />
      </Flex>
    </Box>
  );
}

export default MyTaskPage;
