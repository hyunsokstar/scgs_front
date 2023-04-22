import { Box, Text } from "@chakra-ui/react";
import React from "react";
import UncompletedProjectTaskList from "../components/UncompletedProjectTaskList";
import UncompletedProjectTaskListForCashPrize from "../components/UncompletedProjectTaskListForCashPrize";

interface Props {}

const WantedPage = (props: Props) => {
  return (
    <Box>
      <UncompletedProjectTaskListForCashPrize />
    </Box>
  );
};

export default WantedPage;
