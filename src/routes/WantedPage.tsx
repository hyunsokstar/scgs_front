import { Box, Text } from "@chakra-ui/react";
import React from "react";
import UncompletedProjectTaskList from "../components/UncompletedProjectTaskList";
import UncompletedProjectTaskListForCashPrize from "../components/UncompletedProjectTaskListForCashPrize";

interface Props {}

const WantedPage = (props: Props) => {
  return (
    <Box>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="pink.500"
        textAlign="center"
        textTransform="uppercase"
      >
        Task For Cash Prize
      </Text>

      <UncompletedProjectTaskListForCashPrize />
    </Box>
  );
};

export default WantedPage;
