import {
  Box,
  Button,
  Container,
  Flex,
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
  useTheme,
} from "@chakra-ui/react";

import { useQuery, useMutation } from "@tanstack/react-query";
import React, { ReactElement, useState, useEffect } from "react";
import {
  getUncompletedTaskList,
  getTasksWithCashPrize,
} from "../apis/project_progress_api";
import {
  ITypeForProjectProgressList,
  IUncompletedTaskListForCashPrize,
} from "../types/project_progress/project_progress_type";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRowForCashPrize from "./UncompletedTaskRowForCashPrize";
import ButtonForShowCountForTaskStatus from "./Button/ButtonForShowCountForTaskStatus";

interface Props {}

// 1122
function UncompletedProjectTaskList({}: Props): ReactElement {
  const theme = useTheme();

  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");

  const [username_for_search, set_username_for_search] = useState<string>();
  const [task_status_for_search, set_task_status_for_search] =
    useState<string>("");

  const {
    isLoading,
    data: taskListData,
    refetch: projectTaskListRefatch,
  } = useQuery<IUncompletedTaskListForCashPrize>(
    [
      "getTasksWithCashPrize",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
      username_for_search,
    ],
    getTasksWithCashPrize,
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

  const toast = useToast();

  // console.log("taskListData  : ", taskListData);
  // console.log("filteredData  : ", filteredData);

  useEffect(() => {
    setFilteredData(taskListData?.ProjectProgressList);
  }, [taskListData?.ProjectProgressList]);

  if (!taskListData) {
    return <Box>..Loading</Box>;
  }

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
    setFilterValueForTaskManager(value);
    updateFilteredDataForTaskManager(value);
  };

  // const mutationForSearchListByUserName = useMutation(
  //   apiForSelctUncompletedListForUserName(username),
  //   {
  //     onSuccess: (result: any) => {
  //       console.log("result : ", result);
  //       // queryClient.refetchQueries(["getOneProjectTask"]);

  //       toast({
  //         status: "success",
  //         title: "task status update success",
  //         description: result.message,
  //       });
  //     },
  //     onError: (err) => {
  //       console.log("error : ", err);
  //     },
  //   }
  // );

  const searchUncompletedListforUserName = (username: string) => {
    console.log("username : ", username);

    set_username_for_search(username);
  };

  return (
    <Container maxW={"100%"} border={"1px solid purple"} p={0} mt={2}>
      <Box
        border={"0px solid black"}
        display="flex"
        justifyContent={"space-between"}
        bgColor={"#fafad2"}
        alignItems={"center"}
        px={2}
        py={2}
      >
        <Box border={"0px solid green"}>
          <Box
            border={"0px solid blue"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={2}
          >
            <Box border="0px solid red">
              <Table>
                <Thead>
                  <Tr borderBottom={"2px solid #fafad2"}>
                    <Th colSpan={2}>
                      <Text fontSize={22}>
                        Tasks For Cash Prize (총: {taskListData?.totalPageCount}{" "}개, per_page: {taskListData?.task_number_for_one_page}{" "}
                        개){" "}
                      </Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr borderBottom={"2px solid #fafad2"}>
                    <Td>
                      <Text>진행별</Text>
                    </Td>
                    <Td
                      display={"flex"}
                      justifyContent={"space-between"}
                      gap={2}
                      borderBottom={"1px solid #fafad2"}
                    >
                      {/* fixit */}
                      {/* <ButtonForShowCountForTaskStatus
                        button_text={"⚪ :{taskListData?.count_for_ready"}
                        button_size={"md"}
                        task_status_for_search={task_status_for_search} 
                        set_task_status_for_search={set_task_status_for_search} 
                      /> */}

                      <Text>⚪ :{taskListData?.count_for_ready}</Text>
                      <Text>🟡 : {taskListData?.count_for_in_progress}</Text>
                      <Text>🟠 : {taskListData?.count_for_in_testing}</Text>
                    </Td>
                  </Tr>
                  <Tr height="30px" borderBottom={"2px solid #fafad2"}>
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
                                  searchUncompletedListforUserName(
                                    writer.username
                                  )
                                }
                                bgColor={
                                  writer.username === username_for_search
                                    ? "#90CDF4"
                                    : ""
                                }
                              >
                                {writer.username}
                              </Button>
                              <Text>
                                님 {writer.task_count} 개 , {writer.cash} 원
                              </Text>
                            </HStack>
                          </Box>
                        );
                      })}
                    </Td>
                    {/* <Td borderBottomWidth="1px" borderColor="teal.200">
                        Row 2, Column 3
                      </Td> */}
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>

        <Box>
          <ButtonsForSelectForTeamTaskListPeriod
            selectedPeriodOptionForUncompletedTaskList={
              selectedPeriodOptionForUncompletedTaskList
            }
            changeHandler={changeHandlerForSelectPeriodOptionForTeamTask}
          />

          <Box mt={2}>
            <Box>
              담당 : &nbsp;
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
                value={filterValueForTaskManager}
                onChange={handleFilterChangeForTaskManager}
              />
            </Box>

            <Box>
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
          </Box>
        </Box>

        <Box textAlign={"right"} m={0}>
          <ModalButtonForAddProjectTask
            button_text="task 추가"
            projectTaskListRefatch={projectTaskListRefatch}
          />
        </Box>
      </Box>

      <Box>
        {taskListData ? (
          <UncompletedTaskRowForCashPrize
            ProjectProgressList={filteredData}
            totalPageCount={taskListData.totalPageCount}
            task_number_for_one_page={taskListData.task_number_for_one_page}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
            projectTaskListRefatch={projectTaskListRefatch}
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default UncompletedProjectTaskList;
