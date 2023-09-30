import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";
import { typeForTaskListForChecked } from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetTaskListForCheckedPks } from "../../apis/project_progress_api";

interface IProps {
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
  setIsOpen: any;
}

const ContainerForCheckedTaskForIntergration = ({
  checkedRowPks,
  setCheckedRowPks,
  setIsOpen,
}: IProps) => {
  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<typeForTaskListForChecked>(
    ["getTaskListForCheckedPks", checkedRowPks],
    apiForGetTaskListForCheckedPks,
    {
      enabled: true,
    }
  );

  useEffect(() => {
    if (dataForTaskListForCheckedPks?.ProjectProgressList.length === 0) {
      setIsOpen(false);
    }
  }, [dataForTaskListForCheckedPks]);

  return (
    <Box>
      <Box fontSize={"2xl"} textAlign={"center"}>
        Checked Tasks
      </Box>
      <Box>
        {dataForTaskListForCheckedPks ? (
          <TableForTaskListForChecked
            data={dataForTaskListForCheckedPks?.ProjectProgressList}
            checkedRowPks={checkedRowPks}
            setCheckedRowPks={setCheckedRowPks}
          />
        ) : (
          "no data"
        )}
      </Box>
    </Box>
  );
};

export default ContainerForCheckedTaskForIntergration;
