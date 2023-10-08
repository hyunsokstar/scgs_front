import { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  ITypeForProjectProgressList,
  taskRowForUncompleted,
} from "../../types/project_progress/project_progress_type";
import ButtonForShowCountForTaskStatus from "../Button/ButtonForShowCountForTaskStatus";
import SelectBoxForSetPeriodForFilteringUncompletedTaskList from "../Button/SelectBoxForSetPeriodForFilteringUncompletedTaskList";
import ButtonsForSelectOptionForDueDateForUncompletedTaskList from "../Button/ButtonsForSelectOptionForDueDateForUncompletedTaskList";

interface IProps {
  setFilteredListForUncompleteTask: Dispatch<
    SetStateAction<taskRowForUncompleted[]>
  >;
  set_is_task_due_date_has_passed: Dispatch<SetStateAction<boolean>>;
  set_task_status_for_search: Dispatch<SetStateAction<string>>;
  set_username_for_search: Dispatch<SetStateAction<string | undefined>>;
  set_due_date_option_for_filtering: Dispatch<
    SetStateAction<string | undefined>
  >;
  setCheckForCashPrize: Dispatch<SetStateAction<boolean>>;
  setFilterValueForTask: Dispatch<SetStateAction<string | undefined>>;
  setIsForUrgent: Dispatch<SetStateAction<boolean>>;
  setSelectedPeriodOptionForUncompletedTaskList: Dispatch<
    SetStateAction<string>
  >;
  setGroupByOption: Dispatch<SetStateAction<string>>;
  setFilterValueForTaskManager: Dispatch<SetStateAction<string | undefined>>;
  setFilterValueForTaskClassification: Dispatch<SetStateAction<string>>;
  filteredListForUncompleteTask: taskRowForUncompleted[];
  taskListDataForUncompleted: ITypeForProjectProgressList;
  selectedPeriodOptionForUncompletedTaskList: string;
  task_status_for_search: string;
  username_for_search: string | undefined;
  isForUrgent: boolean;
  due_date_option_for_filtering: string | undefined;
  checkForCashPrize: boolean;
  groupByOption: string;
  filterValueForTaskManager: string | undefined;
  filterValueForTask: string | undefined;
  filterValueForTaskClassification: string;
}

// 1122
const HeaderInfoForUncompletedTaskList = ({
  set_is_task_due_date_has_passed,
  set_task_status_for_search,
  set_username_for_search,
  set_due_date_option_for_filtering,
  setIsForUrgent,
  setCheckForCashPrize,
  setFilterValueForTaskManager,
  setSelectedPeriodOptionForUncompletedTaskList,
  setGroupByOption,
  setFilterValueForTask,
  setFilterValueForTaskClassification,
  taskListDataForUncompleted,
  filteredListForUncompleteTask,
  task_status_for_search,
  username_for_search,
  selectedPeriodOptionForUncompletedTaskList,
  checkForCashPrize,
  groupByOption,
  filterValueForTaskManager,
  due_date_option_for_filtering,
  isForUrgent,
  filterValueForTask,
  filterValueForTaskClassification,
  setFilteredListForUncompleteTask,
}: IProps) => {
  const is_show_for_mobile = useBreakpointValue({
    base: false, // for mobile and small screens
    md: true, // for medium-sized screens and up
    lg: true, // for large screens and up
  });

  const handleUrgentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsForUrgent(event.target.checked);
  };

  const handleSelectPeriodOptionForTeamTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPeriodOptionForUncompletedTaskList(event.target.value);
  };

  const handleCashPrizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckForCashPrize(event.target.checked);
  };

  const searchUncompletedListforUserName = (username: string) => {
    console.log("username : ", username);

    set_username_for_search(username);
  };

  const handleFilterChangeForTaskManager = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filterValue = event.target.value;
    setFilterValueForTaskManager(filterValue);

    const newFilteredTaskList = filteredListForUncompleteTask.filter((task) => {
      return task.task_manager.username.includes(filterValue);
    });
    setFilteredListForUncompleteTask(newFilteredTaskList);
  };

  const handleFilterChangeForTaskClassification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTaskClassification(event.target.value);
  };

  const handleFilterChangeForTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValueForTask(event.target.value);
  };

  return (
    <Box>
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
          bg={"green.200"}
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          // justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          pt={2}
          gap={3}
        >
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            borderBottom={"3px solid #9AE6B4"}
            width={"100%"}
          >
            <Box textAlign={"center"} border={"0px solid blue"}>
              <Text fontSize={20}>UnComplete Task</Text>
              <Text>total: {taskListDataForUncompleted?.totalPageCount} 개</Text>
            </Box>
            <Box
              display={"grid"}
              gridTemplateColumns={"repeat(2, 1fr)"}
              gap={3}
              borderBottom={"1px solid #9AE6B4"}
              flexDirection={"column"}
            >
              <Button
                size="xs"
                variant={"outline"}
                border={"1px solid black"}
                onClick={() => {
                  set_is_task_due_date_has_passed(false);
                  set_task_status_for_search("");
                  set_username_for_search("");
                  set_due_date_option_for_filtering("");
                  setIsForUrgent(false);
                  setCheckForCashPrize(false);
                }}
              >
                reset
              </Button>

              <ButtonForShowCountForTaskStatus
                task_status={"ready"}
                status_imoge={"⚪"}
                status_count={taskListDataForUncompleted?.count_for_ready}
                button_size={"xs"}
                task_status_for_search={task_status_for_search}
                set_task_status_for_search={set_task_status_for_search}
              />
              <ButtonForShowCountForTaskStatus
                button_size={"xs"}
                task_status={"in_progress"}
                status_imoge={"🟡"}
                status_count={taskListDataForUncompleted?.count_for_in_progress}
                task_status_for_search={task_status_for_search}
                set_task_status_for_search={set_task_status_for_search}
              />
              <ButtonForShowCountForTaskStatus
                button_size={"xs"}
                task_status={"testing"}
                status_imoge={"🟠"}
                status_count={taskListDataForUncompleted?.count_for_in_testing}
                task_status_for_search={task_status_for_search}
                set_task_status_for_search={set_task_status_for_search}
              />
              <Button
                size="xs"
                variant={"outline"}
                border={"1px solid black"}
                onClick={() => set_is_task_due_date_has_passed(true)}
              >
                dhp : {taskListDataForUncompleted?.count_for_duedate_passed}
              </Button>
            </Box>
          </Box>
          <Box
            width={"90%"}
            borderBottom={"3px solid #9AE6B4"}
            overflowY={"scroll"}
            maxHeight="240px"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap={3}
          >
            {taskListDataForUncompleted?.writers_info?.map((writer) => {
              return (
                <Box
                  key={writer.username}
                  fontSize="lg"
                  color="blue.900"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    // border={"1px solid black"}
                    mb={1}
                    width={"98%"}
                    _hover={{
                      bg: "#90CDF4",
                      color: "brown",
                    }}
                    onClick={() =>
                      searchUncompletedListforUserName(writer.username)
                    }
                    bgColor={
                      writer.username === username_for_search ? "#90CDF4" : ""
                    }
                  >
                    {writer.username} : {writer.task_count}
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>

        {is_show_for_mobile ? (
          <Box bg={"blue.100"} alignItems={"center"} width={"100%"} p={3}>
            <Box>
              <Box mb={2}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box flexBasis="30%" fontWeight="bold">
                    created_at
                  </Box>
                  <Box flexBasis="70%">
                    <SelectBoxForSetPeriodForFilteringUncompletedTaskList
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
                  <Box
                    flexBasis="70%"
                    display="flex"
                    alignItems="center"
                    gap={5}
                  >
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
                    <RadioGroup
                      value={groupByOption}
                      onChange={setGroupByOption}
                    >
                      <Stack direction="row">
                        <Radio value="member">member</Radio>
                        <Radio value="importance">importance</Radio>
                        {/* <Radio value="option3">Option 3</Radio> */}
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
                    {filterValueForTaskManager}
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
        ) : (
          ""
        )}

        {is_show_for_mobile ? (
          <Box bgColor={"orange.200"} alignItems={"center"} flex={1}>
            <Box display="flex" flexDirection="column" p={10} mr={20} gap={2}>
              <Text>Today</Text>
              <Text>total: {taskListDataForUncompleted.total_task_count_for_today}</Text>
              <Text>
                complete: {taskListDataForUncompleted.completed_task_count_for_today}
              </Text>
              <Text>progress:{taskListDataForUncompleted.achievement_rate_for_today}%</Text>
              <Box w="100%">
                <Progress
                  value={taskListDataForUncompleted.achievement_rate_for_today}
                  size="xs"
                  mb={2}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default HeaderInfoForUncompletedTaskList;
