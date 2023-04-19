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
import { getUncompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import UncompletedTaskRow from "./UncompletedTaskRow";

interface Props {}

function UncompletedProjectTaskList({}: Props): ReactElement {
  const theme = useTheme();

  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");

  const [username_for_search, set_username_for_search] = useState<string>();

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

  const toast = useToast();

  console.log("taskListData  : ", taskListData);
  console.log("filteredData  : ", filteredData);

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
        bgColor={"green.200"}
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
              <Table borderWidth="1px" borderColor="blue.200">
                <Thead>
                  <Tr>
                    <Th colSpan={2}>
                      {" "}
                      <Text fontSize={22}>
                        비완료 리스트 (총: {taskListData?.totalPageCount} 개,
                        per_page: {taskListData?.task_number_for_one_page} 개){" "}
                      </Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr height="30px">
                    <Td
                      borderBottomWidth="0px"
                      borderRightWidth="0px"
                      borderColor="teal.200"
                    >
                      <Text>진행별</Text>
                    </Td>
                    <Td
                      borderBottomWidth="1px"
                      borderRightWidth="1px"
                      borderColor="teal.200"
                      display={"flex"}
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <Text>⚪ :{taskListData?.count_for_ready}</Text>
                      <Text>🟡 : {taskListData?.count_for_in_progress}</Text>
                      <Text>🟠 : {taskListData?.count_for_in_testing}</Text>
                    </Td>
                    {/* <Td borderBottomWidth="1px" borderColor="teal.200">
                      Row 1, Column 3
                    </Td> */}
                  </Tr>
                  <Tr height="30px">
                    <Td
                      borderBottomWidth="1px"
                      borderRightWidth="1px"
                      borderColor="teal.200"
                    >
                      <Text>담당자별:</Text>
                    </Td>
                    <Td
                      borderBottomWidth="1px"
                      borderRightWidth="1px"
                      borderColor="teal.200"
                    >
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
                                // color={
                                //   writer.username === username_for_search
                                //   ? "brown"
                                //   : "black" 
                                // }
                              >
                                {writer.username}
                              </Button>{" "}
                              :<Text>{writer.task_count}</Text>
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
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default UncompletedProjectTaskList;
