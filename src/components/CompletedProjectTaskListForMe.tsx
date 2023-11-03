import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Text,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteTasksForChecked, getCompletedTaskListForMe } from "../apis/project_progress_api";
import { ITypeForProjectProgressForCompleted } from "../types/project_progress/project_progress_type";
import CompletedTaskRowForMe from "./CompletedTaskRowForMe";
import SlideForUncompletedTaskList from "./Slide/SlideForUncompletedTaskList";

interface Props {}

// 1122
function CompletedProjectTaskListForMe({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);

  const {
    isLoading,
    data: pageProgressListData,
    refetch: projectTaskListRefatch,
  } = useQuery<any>(
    ["getCompletedTaskListForMe", currentPageNum],
    getCompletedTaskListForMe,
    {
      enabled: true,
    }
  );

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks =
      pageProgressListData?.ProjectProgressList.map((item:any) => item.id) || [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  const mutationForDeleteTasksForChecked = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteTasksForChecked(checkedRowPks);
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        toast({
          title: "Delete Task For Checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const deleteTaskForChecked = () => {
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    mutationForDeleteTasksForChecked.mutate(checkedRowPks);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const id = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, id]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== id));
    }
  };

  const is_show_for_mobile = useBreakpointValue({
    base: false, // for mobile and small screens
    md: true, // for medium-sized screens and up
    lg: true, // for large screens and up
  });

  // 2244
  return (
    <Box w={"100%"} border={"1px solid black"} p={0} mt={"0px"}>
      <Box mx={0} p={2} bg={"orange.200"}>
        <Text mb={1} fontSize={"16px"}>
          완료 리스트
        </Text>
        <Text>
          (total: {pageProgressListData?.totalPageCount} per page:
          {pageProgressListData?.task_number_for_one_page})
        </Text>
        <Box textAlign={"right"} m={0}></Box>
      </Box>{" "}
      <Box>
        <Box display={"flex"} gap={2} alignItems={"center"} p={2}>
          <Checkbox
            size={"lg"}
            onChange={handleChangeForAllCheckBox}
            checked={
              checkedRowPks.length ===
              pageProgressListData?.ProjectProgressList.length
            }
            border={"2px solid black"}
          />

          <Button
            variant="outline"
            size="xs"
            backgroundColor="red.50"
            _hover={{ backgroundColor: "red.100" }}
            onClick={deleteTaskForChecked}
          >
            delete for Check
          </Button>
        </Box>
        {is_show_for_mobile ? (
          <Box>
            {pageProgressListData ? (
              <Box>
                <CompletedTaskRowForMe
                  ProjectProgressList={pageProgressListData.ProjectProgressList}
                  task_number_for_one_page={
                    pageProgressListData.task_number_for_one_page
                  }
                  totalPageCount={pageProgressListData.totalPageCount}
                  projectTaskListRefatch={projectTaskListRefatch}
                  currentPageNum={currentPageNum}
                  setCurrentPageNum={setCurrentPageNum}
                  checkedRowPks={checkedRowPks}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
        ) : (
          <Box>
            {pageProgressListData ? (
              <SlideForUncompletedTaskList
                listData={pageProgressListData.ProjectProgressList}
                handleCheckboxChange={handleCheckboxChange}
                checkedRowPks={checkedRowPks}
              />
            ) : (
              ""
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CompletedProjectTaskListForMe;
