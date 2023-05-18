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

interface Props {}

// 1122
function UncompletedProjectTaskList({}: Props): ReactElement {
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
    useState<string>("");

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
        justifyContent={"space-between"}
        bgColor={"green.200"}
        alignItems={"center"}
        p={4}
      >
        <Box width={"35%"}>
          <Table border={"0px solid blue"} mb={1}>
            <Tr borderBottom={"2px solid #9AE6B4"}>
              <Th colSpan={2}>
                <Text fontSize={22}>
                  비완료 리스트 (총: {taskListData?.totalPageCount} 개,
                  per_page: {taskListData?.task_number_for_one_page} 개){" "}
                </Text>
              </Th>
            </Tr>
            <Tr borderBottom={"2px solid #9AE6B4"}>
              <Td>
                <Text>진행별</Text>
              </Td>
              <Td
                display={"flex"}
                justifyContent={"flex-start"}
                gap={3}
                borderBottom={"1px solid #9AE6B4"}
              >
                <ButtonForShowCountForTaskStatus
                  task_status={"ready"}
                  status_imoge={"⚪"}
                  status_count={taskListData?.count_for_ready}
                  button_size={"md"}
                  task_status_for_search={task_status_for_search}
                  set_task_status_for_search={set_task_status_for_search}
                />

                <ButtonForShowCountForTaskStatus
                  task_status={"in_progress"}
                  status_imoge={"🟡"}
                  status_count={taskListData?.count_for_in_progress}
                  button_size={"md"}
                  task_status_for_search={task_status_for_search}
                  set_task_status_for_search={set_task_status_for_search}
                />

                <ButtonForShowCountForTaskStatus
                  task_status={"testing"}
                  status_imoge={"🟠"}
                  status_count={taskListData?.count_for_in_testing}
                  button_size={"md"}
                  task_status_for_search={task_status_for_search}
                  set_task_status_for_search={set_task_status_for_search}
                />
              </Td>
              {/* <Td borderBottomWidth="1px" borderColor="teal.200">
                      Row 1, Column 3
                    </Td> */}
            </Tr>
            <Tr borderBottom={"2px solid #9AE6B4"}>
              <Td>중요도</Td>
              <Td>
                <StarRatingForSetFilterOptionForTaskList
                  rating={rating_for_filter_option}
                  setRating={set_rating_for_filter_option}
                />
              </Td>
            </Tr>
            <Tr height="30px" borderBottom={"2px solid #9AE6B4"}>
              <Td>
                <Text>담당자별:</Text>
              </Td>
              <Td>
                {taskListData?.writers_info?.map((writer) => {
                  return (
                    <Box fontSize="lg" color="blue.900">
                      <HStack>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          border={"1px solid black"}
                          mb={1}
                          _hover={{
                            bg: "#90CDF4",
                            color: "brown",
                          }}
                          onClick={() =>
                            searchUncompletedListforUserName(writer.username)
                          }
                          bgColor={
                            writer.username === username_for_search
                              ? "#90CDF4"
                              : ""
                          }
                        >
                          {writer.username} : {writer.task_count}
                        </Button>
                      </HStack>
                    </Box>
                  );
                })}
              </Td>
              {/* <Td borderBottomWidth="1px" borderColor="teal.200">
                      Row 2, Column 3
                    </Td> */}
            </Tr>
          </Table>
        </Box>

        <Box>
          <Text mb={1}>생성 시점:</Text>
          <ButtonsForSelectForTeamTaskListPeriod
            selectedPeriodOptionForUncompletedTaskList={
              selectedPeriodOptionForUncompletedTaskList
            }
            changeHandler={changeHandlerForSelectPeriodOptionForTeamTask}
          />
          <Box mt={3}>
            마감 기한:
            <Box display={"flex"} gap={2} mt={1}>
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
            </Box>
            <Box>
              {/* <ButtonsForSelectFilterOptionForTaskClassification /> */}
            </Box>
            <Box display={"flex"} mt={5} gap={5} alignItems={"center"}>
              <Box display="flex" alignItems="center">
                긴급 여부 :{" "}
                <Checkbox
                  size="lg"
                  ml={2}
                  border={"1px solid gray"}
                  isChecked={isForUrgent}
                  onChange={handleUrgentChange}
                />
              </Box>
              <Box display="flex" alignItems="center">
                상금 여부 :{" "}
                <Checkbox
                  size="lg"
                  border={"1px solid gray"}
                  ml={2}
                  isChecked={checkForCashPrize}
                  onChange={handleCashPrizeChange}
                />
              </Box>
            </Box>
          </Box>
          <Box mt={3}>
            <Box>
              담당 : &nbsp;
              <Input
                size="xs"
                variant="outline"
                bg="blue.50"
                borderColor="gray.300"
                _focus={{ border: "0px solid blue", boxShadow: "none" }}
                _hover={{ bg: "green.50", borderColor: "black" }}
                _placeholder={{ color: "black" }}
                id="url"
                w={"300px"}
                value={filterValueForTaskManager}
                onChange={handleFilterChangeForTaskManager}
              />
            </Box>

            <Box mt={1}>
              업무 : &nbsp;
              <Input
                size="xs"
                variant="outline"
                bg="blue.50"
                borderColor="gray.300"
                _focus={{ border: "1px solid blue", boxShadow: "none" }}
                _hover={{ bg: "green.50", borderColor: "black" }}
                _placeholder={{ color: "black" }}
                id="url"
                w={"300px"}
                value={filterValueForTask}
                onChange={handleFilterChangeForTask}
              />
            </Box>

            <Box mt={1}>
              분류 : &nbsp;
              <Input
                size="xs"
                variant="outline"
                bg="blue.50"
                borderColor="gray.300"
                _focus={{ border: "1px solid blue", boxShadow: "none" }}
                _hover={{ bg: "green.50", borderColor: "black" }}
                _placeholder={{ color: "black" }}
                id="url"
                w={"300px"}
                value={filterValueForTaskClassification}
                onChange={handleFilterChangeForTaskClassification}
              />
            </Box>
          </Box>
        </Box>

        <Box
          // border={"1px solid blue"}
          width={"20%"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <RadioButtonForSelectOptionForGropyBy
            groupByOption={groupByOption}
            setGroupByOption={setGroupByOption}
          />
        </Box>

        <Box>
          <Box display="flex" flexDirection="column" p={10} mr={20} gap={2}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Today Task Status
            </Text>
            <Text>총 업무 개수: {taskListData.total_task_count_for_today}</Text>
            <Text>
              총 완료 개수: {taskListData.completed_task_count_for_today}
            </Text>
            <Text>달성률:{taskListData.achievement_rate_for_today}%</Text>
            <Box w="100%">
              <Progress
                value={taskListData.achievement_rate_for_today}
                size="sm"
                mb={2}
              />
            </Box>
          </Box>
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
          <ModalButtonForAddProjectTask
            button_text="task 추가"
            projectTaskListRefatch={projectTaskListRefatch}
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

export default UncompletedProjectTaskList;
