import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  Input,
  useToast,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  Progress,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

  const handleUrgentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsForUrgent(event.target.checked);
  };

  const handleCashPrizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckForCashPrize(event.target.checked);
  };

  const handleFilterChangeForTaskManager = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTaskManager(event.target.value);
  };

  const handleFilterChangeForTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTask(event.target.value);
  };

  const handleFilterChangeForTaskClassification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTaskClassification(event.target.value);
  };

  const handleSelectPeriodOptionForTeamTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPeriodOptionForUncompletedTaskList(event.target.value);
  };

  // 2244
  if (!taskListData) {
    return <Box>..Loading</Box>;
  }

  return (
    <Box
      border={"1px solid black"}
      p={0}
      mt={2}
      width={"100%"}
      // overflowX={"scroll"}
    >
      <Box
        border={"0px solid pink"}
        display={"grid"}
        gridTemplateColumns={{
          xl: "repeat(3, 1fr)", // default value for all breakpoints
          lg: "repeat(3, 1fr)", // for medium-sized screens and up
          sm: "repeat(1, 1fr)", // for small screens and up
        }}
      >
        <Box
          // height={"450px"}
          bg={"green.200"}
          flex={1}
          p={2}
        >
          <Box
            // border={"5px solid blue"}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Box borderBottom={"3px solid #9AE6B4"}>
              <Box>
                <Text fontSize={16}>
                  uncomplete task (total: {taskListData?.totalPageCount}, per :{" "}
                  {taskListData?.task_number_for_one_page})
                </Text>
              </Box>
            </Box>
            <Box borderBottom={"3px solid #9AE6B4"}>
              <Box
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
              </Box>
            </Box>
            <Box borderBottom={"3px solid #9AE6B4"}>
              <Box>
                <StarRatingForSetFilterOptionForTaskList
                  rating={rating_for_filter_option}
                  setRating={set_rating_for_filter_option}
                />
              </Box>
            </Box>
            <Box height="30px" borderBottom={"3px solid #9AE6B4"}>
              <Box>
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
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          // height={"450px"}
          bg={"blue.100"}
          alignItems={"center"}
          // border={"5px solid orange"}
          width={"100%"}
          p={3}
          // flex={1}
        >
          <Box>
            <Box mb={2}>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexBasis="30%" fontWeight="bold">
                  created_at
                </Box>
                <Box flexBasis="70%">
                  <ButtonsForSelectForTeamTaskListPeriod
                    selectedPeriodOptionForUncompletedTaskList={
                      selectedPeriodOptionForUncompletedTaskList
                    }
                    changeHandler={handleSelectPeriodOptionForTeamTask}
                  />
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexBasis="30%" fontWeight="bold">
                  due_date
                </Box>
                <Box flexBasis="70%">
                  <ButtonsForSelectOptionForDueDateForUncompletedTaskList
                    due_date_option_for_filtering={
                      due_date_option_for_filtering
                    }
                    set_due_date_option_for_filtering={
                      set_due_date_option_for_filtering
                    }
                  />
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexBasis="30%" fontWeight="bold">
                  special option
                </Box>
                <Box flexBasis="70%" display="flex" alignItems="center" gap={5}>
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
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexBasis="30%" fontWeight="bold">
                  Gropup By
                </Box>
                <Box flexBasis="70%">
                  <RadioGroup value={groupByOption} onChange={setGroupByOption}>
                    <Stack direction="row">
                      <Radio value="option1">Option 1</Radio>
                      <Radio value="option2">Option 2</Radio>
                      <Radio value="option3">Option 3</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexBasis="30%" fontWeight="bold">
                  manager
                </Box>
                <Box flexBasis="70%">
                  <Input
                    size="xs"
                    variant="outline"
                    bg="blue.50"
                    borderColor="gray.300"
                    _focus={{ border: "0px solid blue", boxShadow: "none" }}
                    _hover={{ bg: "green.50", borderColor: "black" }}
                    _placeholder={{ color: "black" }}
                    id="url"
                    w={"80%"}
                    value={filterValueForTaskManager}
                    onChange={handleFilterChangeForTaskManager}
                  />
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexBasis="30%" fontWeight="bold">
                  task
                </Box>
                <Box flexBasis="70%">
                  <Input
                    size="xs"
                    variant="outline"
                    bg="blue.50"
                    borderColor="gray.300"
                    _focus={{ border: "1px solid blue", boxShadow: "none" }}
                    _hover={{ bg: "green.50", borderColor: "black" }}
                    _placeholder={{ color: "black" }}
                    id="url"
                    w={"80%"}
                    value={filterValueForTask}
                    onChange={handleFilterChangeForTask}
                  />
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box flexBasis="30%" fontWeight="bold">
                  class
                </Box>
                <Box flexBasis="70%">
                  <Input
                    size="xs"
                    variant="outline"
                    bg="blue.50"
                    borderColor="gray.300"
                    _focus={{ border: "1px solid blue", boxShadow: "none" }}
                    _hover={{ bg: "green.50", borderColor: "black" }}
                    _placeholder={{ color: "black" }}
                    id="url"
                    w={"80%"}
                    value={filterValueForTaskClassification}
                    onChange={handleFilterChangeForTaskClassification}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          // height={"450px"}
          // border={"5px solid black"}
          bgColor={"orange.200"}
          alignItems={"center"}
          flex={1}
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
