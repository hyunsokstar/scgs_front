import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetTaskListForTaskIntegration } from "../../apis/project_progress_api";
import { IDataForTaskListForIntegration } from "../../types/project_progress/project_progress_type";

interface Props {}

const ContainerForTargetTask = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<IDataForTaskListForIntegration>(
    ["apiForGetTaskListForTaskIntegration", pageNum],
    apiForGetTaskListForTaskIntegration,
    {
      enabled: true,
    }
  );

  console.log("dataForTaskListForCheckedPks : ", dataForTaskListForCheckedPks);

  return (
    <Box>
      <Box fontSize={"5xl"} textAlign={"center"}>
        Target Tasks
      </Box>

      <Box>
        {dataForTaskListForCheckedPks
          ? dataForTaskListForCheckedPks.listForTask.map((row) => {
              return <Box>{row.task}</Box>;
            })
          : "no data"}
      </Box>
    </Box>
  );
};

export default ContainerForTargetTask;
