import {
  Box,
  Text,
  Button,
  Checkbox,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";
import {
  apiForDeleteTasksForChecked,
  getUncompletedTaskListForMe,
} from "../apis/project_progress_api";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRowForMe from "./UncompletedTaskRowForMe";
import ButtonForShowCountForTaskStatus from "./Button/ButtonForShowCountForTaskStatus";
import ButtonForFilteringTaskForDueDate from "./Button/ButtonForFilteringTaskForDueDate";
import SlideForUncompletedTaskList from "./Slide/SlideForUncompletedTaskList";

interface Props {}

// 1122
function UncompletedProjectTaskListForMe({}: Props): ReactElement {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");

  const [due_date_option_for_filtering, set_due_date_option_for_filtering] =
    useState<string | undefined>("");
  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);
  // const queryClient = useQueryClient();

  const {
    isLoading,
    data: taskListDataForMe,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    [
      "getUncompletedTaskListForMe",
      currentPageNum,
      task_status_for_search,
      due_date_option_for_filtering,
    ],
    getUncompletedTaskListForMe,
    {
      enabled: true,
    }
  );

  const flex_direction_option_for_responsive = useBreakpointValue({
    base: "column", // for mobile and small screens
    md: "row", // for medium-sized screens and up
    lg: "row", // for large screens and up
  });

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks =
      taskListDataForMe?.ProjectProgressList.map((item) => item.id) || [];

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
  if (!taskListDataForMe) {
    return <Box>Loading..</Box>;
  }

  return (
    <Box w={"100%"} border={"1px solid purple"} p={0} mt={0}>
      <Box
        border={"0px solid green"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={flex_direction_option_for_responsive}
        alignItems={"center"}
        bg={"green.200"}
        gap={5}
        p={3}
      >
        <Box flex={1}>
          <Box mb={1} fontSize={"16px"}>
            <Text>My Task 비완료 리스트</Text>
            <Text>
              total: {taskListDataForMe?.totalPageCount} per page:{" "}
              {taskListDataForMe?.task_number_for_one_page}
            </Text>
          </Box>
          <Box display={"flex"} gap={2}>
            <ButtonForShowCountForTaskStatus
              task_status={"ready"}
              status_imoge={"⚪"}
              status_count={taskListDataForMe?.count_for_ready}
              button_size={"xs"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
            <ButtonForShowCountForTaskStatus
              task_status={"in_progress"}
              status_imoge={"🟡"}
              status_count={taskListDataForMe?.count_for_in_progress}
              button_size={"xs"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
            <ButtonForShowCountForTaskStatus
              task_status={"testing"}
              status_imoge={"🟠"}
              status_count={taskListDataForMe?.count_for_in_testing}
              button_size={"xs"}
              task_status_for_search={task_status_for_search}
              set_task_status_for_search={set_task_status_for_search}
            />
          </Box>
        </Box>

        <Box flex={1} mt={-2}>
          due_date:
          <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={2}>
            <ButtonForFilteringTaskForDueDate
              button_text="empty"
              due_date_option="undecided"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="noon"
              due_date_option="until-noon"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="evening"
              due_date_option="until-evening"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="night"
              due_date_option="until-night"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="tomorrow"
              due_date_option="until-tomorrow"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="tomorrow"
              due_date_option="until-the-day-after-tomorrow"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="this week"
              due_date_option="until-this-week"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
            <ButtonForFilteringTaskForDueDate
              button_text="this month"
              due_date_option="until-this-month"
              due_date_option_for_filtering={due_date_option_for_filtering}
              set_due_date_option_for_filtering={
                set_due_date_option_for_filtering
              }
            />
          </Box>
        </Box>

        <Box textAlign={"right"} flex={1}>
          <ModalButtonForAddProjectTask
            button_text="task 추가"
            projectTaskListRefatch={projectTaskListRefatch}
          />
        </Box>
      </Box>
      <Box display={"flex"} gap={2} alignItems={"center"} p={2}>
        <Checkbox
          size={"lg"}
          onChange={handleChangeForAllCheckBox}
          checked={
            checkedRowPks.length ===
            taskListDataForMe?.ProjectProgressList.length
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
                checkedRowPks={checkedRowPks}
                handleCheckboxChange={handleCheckboxChange}
              />
            </Box>
          ) : (
            "no data"
          )}
        </Box>
      ) : (
        <Box>
          {taskListDataForMe ? (
            <SlideForUncompletedTaskList
              listData={taskListDataForMe.ProjectProgressList}
              handleCheckboxChange={handleCheckboxChange}
              checkedRowPks={checkedRowPks}
            />
          ) : (
            ""
          )}
        </Box>
      )}
    </Box>
  );
}

export default UncompletedProjectTaskListForMe;
