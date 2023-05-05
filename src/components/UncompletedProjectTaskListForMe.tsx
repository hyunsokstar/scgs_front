import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import {
  getUncompletedTaskList,
  getUncompletedTaskListForMe,
} from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRowForMe from "./UncompletedTaskRowForMe";
import ButtonForShowCountForTaskStatus from "./Button/ButtonForShowCountForTaskStatus";
import ButtonForFilteringTaskForDueDate from "./Button/ButtonForFilteringTaskForDueDate";

interface Props {}



// 1122
function UncompletedProjectTaskListForMe({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");

  const [due_date_option_for_filtering, set_due_date_option_for_filtering] =
    useState<string>("");

  // const queryClient = useQueryClient();

  const {
    isLoading,
    data: taskListDataForMe,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    ["getUncompletedTaskListForMe", currentPageNum, task_status_for_search, due_date_option_for_filtering],
    getUncompletedTaskListForMe,
    {
      enabled: true,
    }
  );
  console.log("taskListDataForMe : ", taskListDataForMe);

  if (!taskListDataForMe) {
    return <Box>Loading..</Box>;
  }

  return (
    <Box w={"100%"} border={"1px solid purple"} p={0} mt={0}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={0}
        py={2}
        px={2.5}
        bg={"green.200"}
        border={"1px solid green"}
      >
        <Box>
          <Box mb={1} fontSize={"20px"}>
            My Task 비완료 리스트 (총: {taskListDataForMe?.totalPageCount} per
            page: {taskListDataForMe?.task_number_for_one_page} )
          </Box>
          <Box display={"flex"} gap={2}>
            <ButtonForShowCountForTaskStatus
              task_status={"ready"}
              status_imoge={"⚪"}
              status_count={taskListDataForMe?.count_for_ready}
              button_size={"md"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
            <ButtonForShowCountForTaskStatus
              task_status={"in_progress"}
              status_imoge={"🟡"}
              status_count={taskListDataForMe?.count_for_in_progress}
              button_size={"md"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
            <ButtonForShowCountForTaskStatus
              task_status={"testing"}
              status_imoge={"🟠"}
              status_count={taskListDataForMe?.count_for_in_testing}
              button_size={"md"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
          </Box>
        </Box>

        <Box>
          마감 기한:
          <Box display={"flex"} gap={2}>
          <ButtonForFilteringTaskForDueDate
              button_text="미정"
              due_date_option="undecided"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="정오"
              due_date_option="until-noon"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="오후"
              due_date_option="until-evening"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="내일"
              due_date_option="until-tomorrow"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="내일 모레"
              due_date_option="until-the-day-after-tomorrow"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="이번주"
              due_date_option="until-this-week"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="이번달"
              due_date_option="until-this-month"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            {/* <ButtonForFilteringTaskForDueDate button_text="오후" />
            <ButtonForFilteringTaskForDueDate button_text="내일" />
            <ButtonForFilteringTaskForDueDate button_text="내일 모레" />
            <ButtonForFilteringTaskForDueDate button_text="이번주" />
            <ButtonForFilteringTaskForDueDate button_text="이번달" /> */}
          </Box>
        </Box>

        <Box textAlign={"right"} m={0}>
          <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          />
        </Box>
      </Box>
      <Box>
        {taskListDataForMe ? (
          <Box>
            <UncompletedTaskRowForMe
              ProjectProgressList={taskListDataForMe.ProjectProgressList}
              task_number_for_one_page={
                taskListDataForMe.task_number_for_one_page
              }
              totalPageCount={taskListDataForMe.totalPageCount}
              currentPageNum={currentPageNum}
              setCurrentPageNum={setCurrentPageNum}
              projectTaskListRefatch={projectTaskListRefatch}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default UncompletedProjectTaskListForMe;
