import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiForGetTargetTaskListForTaskIntegration,
  apiForSearchTargetTaskListBySearchWords,
} from "../../apis/project_progress_api";
import {
  IDataForTaskListForIntegration,
  ITaskManager,
  ITaskRowForIntergration,
} from "../../types/project_progress/project_progress_type";
import TableForTargetTaskListForIntergration from "../Table/TableForTargetTaskListForIntergration";
import PaginationComponent from "../PaginationComponent";

interface ISearchResult {
  message: string;
  searchWords: string;
  results: ITaskRowForIntergration[];
}

interface IProps {
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
}

const ContainerForTargetTask = ({
  checkedRowPks,
  setCheckedRowPks,
}: IProps) => {
  const toast = useToast();
  const [pageNum, setPageNum] = useState(1);
  const [searchWords, setsearchWords] = useState("");
  const [targetTaskList, setTargetTaskList] =
    useState<ITaskRowForIntergration[]>();

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

  const mutationForSurveyListBySearchWords = useMutation(
    apiForSearchTargetTaskListBySearchWords,
    {
      onSuccess: (data: ISearchResult) => {
        console.log("result for search: ", data);

        toast({
          status: "success",
          title: "search task list for intergration",
          description: data.message,
        });

        setTargetTaskList(data.results);
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const handleSearch = () => {
    console.log("handleSearch check : ", searchWords);
    mutationForSurveyListBySearchWords.mutate({
      searchWords,
      checkedRowPks,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchWord = (searchWords: string) => {
    // console.log("handleSearchWord searchWords : ", searchWords);
    setsearchWords(searchWords);
  };

  useEffect(() => {
    if (dataForTaskListForCheckedPks) {
      setTargetTaskList(dataForTaskListForCheckedPks.listForTask);
    }
  }, [dataForTaskListForCheckedPks]);

  // 2244
  return (
    <Box>
      {/* {checkedRowPks.map((value, index) => (
        <Box key={index} fontSize="lg" textAlign="center">
          {value}
        </Box>
      ))} */}
      <Box fontSize={"2xl"} textAlign={"center"}>
        Target Tasks for Intergration2
      </Box>

      <Box my={2}>
        <InputGroup>
          <Input
            placeholder="Search..."
            value={searchWords}
            onChange={(e) => handleSearchWord(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement width="auto" mr={1}>
            <Button
              variant={"outline"}
              border={"1px solid gray"}
              size="sm"
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        {dataForTaskListForCheckedPks
          ? dataForTaskListForCheckedPks.taskManagers.map(
              (manager: ITaskManager) => {
                return (
                  <Button
                    variant={"outline"}
                    border="1px solid gray"
                    size="xs"
                    key={manager.task_manager__username}
                  >
                    {manager.task_manager__username}:{" "}
                    {manager.task_manager_count}
                  </Button>
                );
              }
            )
          : "no users"}
      </Grid>

      <Box mt={2}>
        <TableForTargetTaskListForIntergration
          taskListForCheckedForIntergration={
            targetTaskList ? targetTaskList : []
          }
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
        />
      </Box>

      {dataForTaskListForCheckedPks ? (
        <PaginationComponent
          current_page_num={pageNum}
          setCurrentPageNum={setPageNum}
          total_page_num={dataForTaskListForCheckedPks.totalCountForTaskList}
          task_number_for_one_page={dataForTaskListForCheckedPks.perPage}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default ContainerForTargetTask;
