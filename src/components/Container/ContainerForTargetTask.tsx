import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetTargetTaskListForTaskIntegration } from "../../apis/project_progress_api";
import { IDataForTaskListForIntegration } from "../../types/project_progress/project_progress_type";
import TableForTargetTaskListForIntergration from "../Table/TableForTargetTaskListForIntergration";

interface IProps {
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
}

const ContainerForTargetTask = ({
  checkedRowPks,
  setCheckedRowPks,
}: IProps) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<IDataForTaskListForIntegration>(
    ["apiForGetTargetTaskListForTaskIntegration", pageNum, checkedRowPks],
    apiForGetTargetTaskListForTaskIntegration,
    {
      enabled: true,
    }
  );

  return (
    <Box>
      <Box fontSize={"2xl"} textAlign={"center"}>
        Target Tasks
      </Box>

      {/* {checkedRowPks.map((value, index) => (
        <Box key={index} fontSize="lg" textAlign="center">
          {value}
        </Box>
      ))} */}
      
      <TableForTargetTaskListForIntergration
        taskListForCheckedForIntergration={
          dataForTaskListForCheckedPks
            ? dataForTaskListForCheckedPks.listForTask
            : []
        }
        checkedRowPks={checkedRowPks}
        setCheckedRowPks={setCheckedRowPks}
      />
    </Box>
  );
};

export default ContainerForTargetTask;
