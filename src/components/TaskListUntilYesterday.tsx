import {
  Box,
  Button,
  HStack,
  Text,
  Input,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Progress,
  // useTheme,
} from "@chakra-ui/react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactElement, useState, useEffect } from "react";
import {
  apiForDeleteTasksForChecked,
  apiForUpdateTaskDueDateForChecked,
  getUncompletedTaskList,
} from "../apis/project_progress_api";
import {
  ITypeForProjectProgressList,
  typeForDueDateUpdateForChecked,
} from "../types/project_progress/project_progress_type";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRow from "./UncompletedTaskRow";
import ModalButtonForUpdateTaskManagerForChecked from "./Button/ModalButtonForUpdateTaskManagerForChecked";
import ButtonForShowCountForTaskStatus from "./Button/ButtonForShowCountForTaskStatus";
import ModalButtonForUpdateImortanceForChecked from "./modal/ModalButtonForUpdateImortanceForChecked";
import ButtonForFilteringTaskForDueDate from "./Button/ButtonForFilteringTaskForDueDate";
import StarRatingForSetFilterOptionForTaskList from "./StarRating/StarRatingForSetFilterOptionForTaskList";
import ModalButtonForUpdateTaskClassificationForChecked from "./modal/ModalButtonForUpdateTaskClassificationForChecked";
import RadioButtonForSelectOptionForGropyBy from "./Button/RadioButtonForSelectOptionForGropyBy";
import ModalButtonForAddProjectTaskWithDuedateOption from "./modal/ModalButtonForAddProjectTaskWithDuedateOption";
import RadioButtonForGroupByOptionForTaskListUntilYesterday from "./Button/RadioButtonForGroupByOptionForTaskListUntilYesterday";

interface Props {
  basic_due_date_option?:
    | "undecided"
    | "until-yesterday"
    | "until-noon"
    | "until-evening"
    | "until-tomorrow"
    | "until-the-day-after-tomorrow"
    | "until-this-week"
    | "until-this-month";
}

// 1122
function TaskListUntilYesterday({
  basic_due_date_option,
}: Props): ReactElement {
  // const theme = useTheme();
  const queryClient = useQueryClient();

  const [checkedRowPks, setCheckedRowPks] = useState<number[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");
  const [username_for_search, set_username_for_search] = useState<string>();
  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");
  const [due_date_option_for_filtering, set_due_date_option_for_filtering] =
    useState<string | undefined>(basic_due_date_option);

  const [rating_for_filter_option, set_rating_for_filter_option] =
    useState<number>(0);

  const [isForUrgent, setIsForUrgent] = useState(false);
  const [checkForCashPrize, setCheckForCashPrize] = useState(false);
  const [groupByOption, setGroupByOption] = React.useState<string>("");

  const {
    isLoading,
    data: taskListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    [
      "getUncompletedTaskList",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
      username_for_search,
      task_status_for_search,
      due_date_option_for_filtering,
      rating_for_filter_option,
      isForUrgent,
      checkForCashPrize,
      groupByOption,
    ],
    getUncompletedTaskList,
    {
      enabled: true,
    }
  );

  const [filteredData, setFilteredData] = useState<any>(
    taskListData?.ProjectProgressList
  );

  // filterValueForTask
  const [filterValueForTaskManager, setFilterValueForTaskManager] =
    useState<any>();
  const [filterValueForTask, setFilterValueForTask] = useState<any>();
  const [
    filterValueForTaskClassification,
    setFilterValueForTaskClassification,
  ] = useState<any>();

  const toast = useToast();

  // console.log("taskListData  : ", taskListData);
  // console.log("filteredData  : ", filteredData);

  useEffect(() => {
    setFilteredData(taskListData?.ProjectProgressList);
  }, [taskListData?.ProjectProgressList]);

  const changeHandlerForSelectPeriodOptionForTeamTask = (option: string) => {
    setSelectedPeriodOptionForUncompletedTaskList(option);
  };

  const updateFilteredDataForTask = (filterValueForTask: string) => {
    if (filterValueForTask !== "") {
      const filteredData = taskListData?.ProjectProgressList.filter((item) =>
        item.task.toLowerCase().includes(filterValueForTask.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(taskListData?.ProjectProgressList);
      console.log("filterValueForTask : ", filterValueForTask);
    }
  };

  const handleFilterChangeForTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilterValueForTask(value);
    updateFilteredDataForTask(value);
  };

  const updateFilteredDataForTaskManager = (
    filterValueForTaskManager: string
  ) => {
    if (filterValueForTaskManager !== "") {
      const filteredData = taskListData?.ProjectProgressList.filter((item) =>
        item.task_manager.username
          .toLowerCase()
          .includes(filterValueForTaskManager.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(taskListData?.ProjectProgressList);
      console.log("filterValueForTaskManager : ", filterValueForTaskManager);
    }
  };

  const handleFilterChangeForTaskManager = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // setFilterValueForTaskClassification(value);
    updateFilteredDataForTaskManager(value);
  };

  const updateFilteredDataForTaskClassification = (
    filterValueForTaskClassification: string
  ) => {
    if (filterValueForTaskClassification !== "") {
      const filteredData = taskListData?.ProjectProgressList.filter((item) =>
        item.task_classification
          .toLowerCase()
          .includes(filterValueForTaskClassification.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(taskListData?.ProjectProgressList);
      console.log(
        "filterValueForTaskClassification : ",
        filterValueForTaskClassification
      );
    }
  };

  const handleFilterChangeForTaskClassification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilterValueForTaskClassification(value);
    updateFilteredDataForTaskClassification(value);
  };

  const searchUncompletedListforUserName = (username: string) => {
    console.log("username : ", username);

    set_username_for_search(username);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const pk = parseInt(value, 10);

    if (checked) {
      setCheckedRowPks([...checkedRowPks, pk]);
    } else {
      setCheckedRowPks(checkedRowPks.filter((item) => item !== pk));
    }
  };

  const mutationForDeleteTasksForChecked = useMutation(
    (checkedRowPks: number[]) => {
      return apiForDeleteTasksForChecked(checkedRowPks);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        // refetch_for_api_docu();
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
    // checkedRowPks
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    mutationForDeleteTasksForChecked.mutate(checkedRowPks);
  };

  const mutationForUpdateTaskDueDateForChecked = useMutation(
    ({ duration_option, checkedRowPks }: typeForDueDateUpdateForChecked) => {
      return apiForUpdateTaskDueDateForChecked({
        duration_option,
        checkedRowPks,
      });
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        // refetch_for_api_docu();
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        toast({
          title: "Update Task Due Date For Checked 성공!",
          status: "success",
          description: data.message,
        });

        // window.location.reload(); // 새로고침
      },
    }
  );

  // due_date update
  const handlerForUpdateTaskDuedateForChecked = (
    duration_option:
      | "undetermined"
      | "noon"
      | "evening"
      | "tomorrow"
      | "day-after-tomorrow"
      | "this-week"
      | "this-month"
  ) => {
    if (checkedRowPks.length === 0) {
      alert("Note를 하나 이상 체크 해주세요");
      return;
    }
    // alert(duration_option);

    mutationForUpdateTaskDueDateForChecked.mutate({
      duration_option,
      checkedRowPks,
    });
  };

  if (!taskListData) {
    return <Box>..Loading</Box>;
  }

  const handleUrgentChange = () => {
    setIsForUrgent(!isForUrgent);
  };

  const handleCashPrizeChange = () => {
    setCheckForCashPrize(!checkForCashPrize);
  };

  // 2244
  return (
    <Box w={"100%"} border={"1px solid purple"} p={0} mt={2}>
      <Box
        border={"1px solid black"}
        display="flex"
        justifyContent={"flex-start"}
        bgColor={"green.200"}
        alignItems={"center"}
        p={2}
      >
        <Box
          // border={"1px solid blue"}
          width={"35%"}
          display="flex"
          flexDirection="row"
          p={2}
        >
          <RadioButtonForGroupByOptionForTaskListUntilYesterday
            groupByOption={groupByOption}
            setGroupByOption={setGroupByOption}
          />
        </Box>
      </Box>

      {/* 0501 */}
      {/* <Box>{checkedRowPks}</Box> */}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Box p={2} gap={2}>
            {/* <Text as="span"></Text> */}
            <Button
              variant="outline"
              size="sm"
              backgroundColor="purple.50"
              _hover={{ backgroundColor: "purple.100" }}
              mr={2}
              onClick={() =>
                handlerForUpdateTaskDuedateForChecked("undetermined")
              }
            >
              마감 날짜 초기화
            </Button>

            <Button
              variant="outline"
              size="sm"
              backgroundColor="purple.50"
              _hover={{ backgroundColor: "purple.100" }}
              mr={2}
              onClick={() => handlerForUpdateTaskDuedateForChecked("noon")}
            >
              마감 날짜 정오
            </Button>

            <Button
              variant="outline"
              size="sm"
              backgroundColor="purple.50"
              _hover={{ backgroundColor: "purple.100" }}
              mr={2}
              onClick={() => handlerForUpdateTaskDuedateForChecked("evening")}
            >
              마감 날짜 오후
            </Button>

            <Button
              variant="outline"
              size="sm"
              backgroundColor="purple.50"
              _hover={{ backgroundColor: "purple.100" }}
              mr={2}
              onClick={() => handlerForUpdateTaskDuedateForChecked("tomorrow")}
            >
              마감 날짜 내일
            </Button>

            <Button
              variant="outline"
              size="sm"
              backgroundColor="purple.50"
              _hover={{ backgroundColor: "purple.100" }}
              mr={2}
              onClick={() =>
                handlerForUpdateTaskDuedateForChecked("day-after-tomorrow")
              }
            >
              마감 날짜 모레
            </Button>

            <Button
              variant="outline"
              size="sm"
              backgroundColor="purple.50"
              _hover={{ backgroundColor: "purple.100" }}
              mr={2}
              onClick={() => handlerForUpdateTaskDuedateForChecked("this-week")}
            >
              마감 날짜 이번주
            </Button>

            <Button
              variant="outline"
              size="sm"
              backgroundColor="purple.50"
              _hover={{ backgroundColor: "purple.100" }}
              mr={2}
              onClick={() =>
                handlerForUpdateTaskDuedateForChecked("this-month")
              }
            >
              마감 날짜 이번달
            </Button>
          </Box>
          <Box display={"flex"} p={2} gap={2}>
            <Checkbox size="lg" colorScheme="blue" />
            <Button
              variant="outline"
              size="sm"
              backgroundColor="red.50"
              _hover={{ backgroundColor: "red.100" }}
              mr={2}
              onClick={deleteTaskForChecked}
            >
              삭제
            </Button>

            <ModalButtonForUpdateTaskManagerForChecked
              button_text="담당자 변경"
              checkedRowPks={checkedRowPks}
              setCheckedRowPks={setCheckedRowPks}
            />

            <ModalButtonForUpdateImortanceForChecked
              button_text="중요도 업데이트"
              checkedRowPks={checkedRowPks}
              setCheckedRowPks={setCheckedRowPks}
            />

            <ModalButtonForUpdateTaskClassificationForChecked
              button_text="분류 업데이트"
              checkedRowPks={checkedRowPks}
              setCheckedRowPks={setCheckedRowPks}
            />
          </Box>
        </Box>
        <Box p={2}>
          <ModalButtonForAddProjectTaskWithDuedateOption
            button_text="Task 추가 For Team Project"
            projectTaskListRefatch={projectTaskListRefatch}
            bgColor="red.300"
            hoverColor="red.500"
            hoverTextColor="yellow"
          />
        </Box>
      </Box>

      <Box>
        {taskListData ? (
          <UncompletedTaskRow
            ProjectProgressList={filteredData}
            totalPageCount={taskListData.totalPageCount}
            task_number_for_one_page={taskListData.task_number_for_one_page}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
            projectTaskListRefatch={projectTaskListRefatch}
            handleCheckboxChange={handleCheckboxChange}
            checkedRowPks={checkedRowPks}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default TaskListUntilYesterday;
