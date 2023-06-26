import {
  Box,
  Button,
  HStack,
  Text,
  Input,
  useToast,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Progress,
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
  typeForDueDateOption,
  typeForDueDateUpdateForChecked,
} from "../types/project_progress/project_progress_type";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";
import UncompletedTaskRow from "./UncompletedTaskRow";
import ButtonForShowCountForTaskStatus from "./Button/ButtonForShowCountForTaskStatus";
import StarRatingForSetFilterOptionForTaskList from "./StarRating/StarRatingForSetFilterOptionForTaskList";
import RadioButtonForSelectOptionForGropyBy from "./Button/RadioButtonForSelectOptionForGropyBy";
import ModalButtonForAddProjectTaskWithDuedateOption from "./modal/ModalButtonForAddProjectTaskWithDuedateOption";
import ButtonsForUnompletedTaskForChecked from "./Button/ButtonsForUnompletedTaskForChecked";
import ButtonsForSelectOptionForDueDateForUncompletedTaskList from "./Button/ButtonsForSelectOptionForDueDateForUncompletedTaskList";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import ModalButtonForUpdateTaskManagerForChecked from "./Button/ModalButtonForUpdateTaskManagerForChecked";
import ModalButtonForUpdateImortanceForChecked from "./modal/ModalButtonForUpdateImortanceForChecked";
import ButtonForFilteringTaskForDueDate from "./Button/ButtonForFilteringTaskForDueDate";
import ModalButtonForUpdateTaskClassificationForChecked from "./modal/ModalButtonForUpdateTaskClassificationForChecked";

interface Props {
  basic_due_date_option?: typeForDueDateOption;
}

// 1122
function UncompletedProjectTaskList({
  basic_due_date_option,
}: Props): ReactElement {
  const queryClient = useQueryClient();

  const [checkedRowPks, setCheckedRowPks] = useState<any[]>([]);
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

  const mutationForUpdateTaskDueDateForChecked = useMutation(
    ({ duration_option, checkedRowPks }: typeForDueDateUpdateForChecked) => {
      return apiForUpdateTaskDueDateForChecked({
        duration_option,
        checkedRowPks,
      });
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);
        setCheckedRowPks([]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        toast({
          title: "Update Task Due Date For Checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const handlerForUpdateTaskDuedateForChecked = (
    duration_option:
      | "undetermined"
      | "noon"
      | "evening"
      | "night"
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

  const handleChangeForAllCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const rowPks =
      taskListData?.ProjectProgressList.map((item) => item.pk) || [];

    if (checked) {
      setCheckedRowPks([...checkedRowPks, ...rowPks]);
    } else {
      setCheckedRowPks([]);
    }
  };

  // 2244
  return (
    <Box
      border={"3px solid purple"}
      p={0}
      mt={2}
      overflowX={"scroll"}
      // overflowY={"scroll"}
    >
      <Box
        border={"1px solid black"}
        display="flex"
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        alignItems={"center"}
        width={"100%"}
      >
        <Box
          height={"450px"}
          bg={"green.200"}
          border={"5px solid red"}
          alignItems={"center"}
          width={"100%"}
        >
          <Table border={"0px solid blue"}>
            <Tr borderBottom={"3px solid #9AE6B4"}>
              <Th colSpan={2}>
                <Text fontSize={16}>
                  uncomplete task (total: {taskListData?.totalPageCount}, per :{" "}
                  {taskListData?.task_number_for_one_page} ){" "}
                </Text>
              </Th>
            </Tr>
            <Tr borderBottom={"3px solid #9AE6B4"}>
              <Td>
                <Text>Progress status</Text>
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
                  button_size={"md"}
                  task_status={"in_progress"}
                  status_imoge={"🟡"}
                  status_count={taskListData?.count_for_in_progress}
                  task_status_for_search={task_status_for_search}
                  set_task_status_for_search={set_task_status_for_search}
                />

                <ButtonForShowCountForTaskStatus
                  button_size={"md"}
                  task_status={"testing"}
                  status_imoge={"🟠"}
                  status_count={taskListData?.count_for_in_testing}
                  task_status_for_search={task_status_for_search}
                  set_task_status_for_search={set_task_status_for_search}
                />
              </Td>
            </Tr>
            <Tr borderBottom={"3px solid #9AE6B4"}>
              <Td>Importance</Td>
              <Td>
                <StarRatingForSetFilterOptionForTaskList
                  rating={rating_for_filter_option}
                  setRating={set_rating_for_filter_option}
                />
              </Td>
            </Tr>
            <Tr height="30px" borderBottom={"3px solid #9AE6B4"}>
              <Td>
                <Text>Task Manager</Text>
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
            </Tr>
          </Table>
        </Box>

        <Box
          height={"450px"}
          bg={"blue.100"}
          alignItems={"center"}
          width={"100%"}
          border={"5px solid orange"}
        >
          <Table variant="unstyled" size="md" mb={2}>
            <Tbody>
              <Tr>
                <Td>created_at</Td>
                <Td>
                  <ButtonsForSelectForTeamTaskListPeriod
                    selectedPeriodOptionForUncompletedTaskList={
                      selectedPeriodOptionForUncompletedTaskList
                    }
                    changeHandler={
                      changeHandlerForSelectPeriodOptionForTeamTask
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>due_date</Td>
                <Td>
                  <ButtonsForSelectOptionForDueDateForUncompletedTaskList
                    due_date_option_for_filtering={
                      due_date_option_for_filtering
                    }
                    set_due_date_option_for_filtering={
                      set_due_date_option_for_filtering
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>special option</Td>
                <Td>
                  <Box display={"flex"} mt={0} gap={5} alignItems={"center"}>
                    <Box display="flex" alignItems="center">
                      Is Emergency :{" "}
                      <Checkbox
                        size="lg"
                        ml={2}
                        border={"1px solid gray"}
                        isChecked={isForUrgent}
                        onChange={handleUrgentChange}
                      />
                    </Box>
                    <Box display="flex" alignItems="center">
                      is_prize :{" "}
                      <Checkbox
                        size="lg"
                        border={"1px solid gray"}
                        ml={2}
                        isChecked={checkForCashPrize}
                        onChange={handleCashPrizeChange}
                      />
                    </Box>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Gropup By</Td>
                <Td>
                  <RadioButtonForSelectOptionForGropyBy
                    groupByOption={groupByOption}
                    setGroupByOption={setGroupByOption}
                  />
                </Td>
              </Tr>

              <Tr>
                <Td>manager</Td>
                <Td>
                  {" "}
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
                </Td>
              </Tr>

              <Tr>
                <Td>task</Td>
                <Td>
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
                </Td>
              </Tr>

              <Tr>
                <Td>classification</Td>
                <Td>
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
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Box
          flex={1}
          flexGrow={1}
          height={"450px"}
          border={"3px solid black"}
          bgColor={"orange.200"}
          alignItems={"center"}
        >
          <Box display="flex" flexDirection="column" p={10} mr={20} gap={2}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Today
            </Text>
            <Text>total: {taskListData.total_task_count_for_today}</Text>
            <Text>complete: {taskListData.completed_task_count_for_today}</Text>
            <Text>progress:{taskListData.achievement_rate_for_today}%</Text>
            <Box w="100%">
              <Progress
                value={taskListData.achievement_rate_for_today}
                size="xs"
                mb={2}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        ml={2}
      >
        <Checkbox
          size={"lg"}
          onChange={handleChangeForAllCheckBox}
          checked={
            checkedRowPks.length === taskListData?.ProjectProgressList.length
          }
        />
        <ButtonsForUnompletedTaskForChecked
          checkedRowPks={checkedRowPks}
          setCheckedRowPks={setCheckedRowPks}
          deleteTaskForChecked={deleteTaskForChecked}
          handlerForUpdateTaskDuedateForChecked={
            handlerForUpdateTaskDuedateForChecked
          }
        />
        <ModalButtonForAddProjectTaskWithDuedateOption
          button_text="Register Task for team project"
          size={"sm"}
          projectTaskListRefatch={projectTaskListRefatch}
          bgColor="red.300"
          hoverColor="red.500"
          hoverTextColor="yellow"
        />
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
