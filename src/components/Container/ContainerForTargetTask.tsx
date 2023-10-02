import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
  ITaskRowForIntergration,
} from "../../types/project_progress/project_progress_type";
import TableForTargetTaskListForIntergration from "../Table/TableForTargetTaskListForIntergration";
import PaginationComponent from "../PaginationComponent";
import { apiForSearchSurveyListBySearchWords } from "../../apis/survey_api";

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

  // mutationForSearchTargetTaskListBySearchWords
  const mutationForSurveyListBySearchWords = useMutation(
    apiForSearchTargetTaskListBySearchWords,
    {
      onSuccess: (data: any) => {
        console.log("result for search: ", data);

        toast({
          status: "success",
          title: "search task list for intergration",
          description: data.message,
        });
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
    if(dataForTaskListForCheckedPks){
      setTargetTaskList(dataForTaskListForCheckedPks.listForTask)
    }
  }, [dataForTaskListForCheckedPks]);

  return (
    <Box>
      {/* {checkedRowPks.map((value, index) => (
        <Box key={index} fontSize="lg" textAlign="center">
          {value}
        </Box>
      ))} */}
      <Box fontSize={"2xl"} textAlign={"center"}>
        Target Tasks for Intergration
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

      <TableForTargetTaskListForIntergration
        taskListForCheckedForIntergration={
          dataForTaskListForCheckedPks
            ? dataForTaskListForCheckedPks.listForTask
            : []
        }
        checkedRowPks={checkedRowPks}
        setCheckedRowPks={setCheckedRowPks}
      />

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
