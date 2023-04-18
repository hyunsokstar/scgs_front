import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { ReactElement, useState, useEffect } from "react";
import { getCompletedTaskList } from "../apis/project_progress_api";
import { ITypeForProjectProgressList } from "../types/project_progress/project_progress_type";
import ModalButtonForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import ModalForAddProjectTask from "./modal/ModalButtonForAddProjectTask";
import CompletedTaskRow from "./CompletedTaskRow";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import ButtonsForSelectForTeamTaskListPeriod from "./Button/ButtonsForSelectForTeamTaskListPeriod";

interface Props {}

function CompletedProjectTaskList({}: Props): ReactElement {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const [
    selectedPeriodOptionForUncompletedTaskList,
    setSelectedPeriodOptionForUncompletedTaskList,
  ] = useState("all");

  const {
    isLoading,
    data: pageProgressListData,
    refetch: projectTaskListRefatch,
  } = useQuery<ITypeForProjectProgressList>(
    [
      "getCompletedTaskList",
      currentPageNum,
      selectedPeriodOptionForUncompletedTaskList,
    ],
    getCompletedTaskList,
    {
      enabled: true,
    }
  );

  const [filteredData, setFilteredData] = useState<any>(
    pageProgressListData?.ProjectProgressList
  );

  // filterValueForTask
  const [filterValueForTaskManager, setFilterValueForTaskManager] =
    useState<any>();
  const [filterValueForTask, setFilterValueForTask] = useState<any>();

  useEffect(() => {
    setFilteredData(pageProgressListData?.ProjectProgressList);
  }, [pageProgressListData?.ProjectProgressList]);

  const changeHandlerForSelectPeriodOptionForTeamTask = (option: string) => {
    setSelectedPeriodOptionForUncompletedTaskList(option);
  };

  const updateFilteredDataForTask = (filterValueForTask: string) => {
    if (filterValueForTask !== "") {
      const filteredData = pageProgressListData?.ProjectProgressList.filter(
        (item) =>
          item.task.toLowerCase().includes(filterValueForTask.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(pageProgressListData?.ProjectProgressList);
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
      const filteredData = pageProgressListData?.ProjectProgressList.filter(
        (item) =>
          item.task_manager.username
            .toLowerCase()
            .includes(filterValueForTaskManager.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(pageProgressListData?.ProjectProgressList);
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

  return (
    <Container maxW={"100%"} border={"0px solid purple"} p={0} mt={0}>
      <Box
        border={"0px solid black"}
        display="flex"
        justifyContent={"space-between"}
        bgColor={"purple.200"}
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
              <Table border="0px"variant={"unstyled"}>
                <Thead>
                  <Tr>
                    <Th colSpan={2}>
                      {" "}
                      <Box fontSize={22}>
                        완료 리스트 (총: {pageProgressListData?.totalPageCount}{" "}
                        개, per_page:{" "}
                        {pageProgressListData?.task_number_for_one_page} 개){" "}
                      </Box>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody border={"0px solid green"}>
                  <Tr height="30px">
                    <Td
                      // borderBottomWidth="1px"
                      // borderRightWidth="1px"
                      // borderColor="teal.200"
                    >
                      <Text>진행별</Text>
                    </Td>
                    <Td
                      // borderBottomWidth="1px"
                      // borderRightWidth="1px"
                      // borderColor="teal.200"
                      display={"flex"}
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <Text>⚪ :{pageProgressListData?.count_for_ready}</Text>
                      <Text>
                        🟡 : {pageProgressListData?.count_for_in_progress}
                      </Text>
                      <Text>
                        🟠 : {pageProgressListData?.count_for_in_testing}
                      </Text>
                    </Td>
                    {/* <Td borderBottomWidth="1px" borderColor="teal.200">
                      Row 1, Column 3
                    </Td> */}
                  </Tr>
                  <Tr height="30px">
                    <Td
                      // borderBottomWidth="0px"
                      // borderRightWidth="1px"
                      // borderColor="teal.200"
                    >
                      <Text>담당자별:</Text>
                    </Td>
                    <Td
                      // borderBottomWidth="0px"
                      // borderRightWidth="1px"
                      // borderColor="teal.200"
                    >
                      {pageProgressListData?.writers_info?.map((writer) => {
                        return (
                          <Text fontSize="lg" color="blue.900">
                            {writer.username}: {writer.task_count}
                          </Text>
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
          {/* <ModalButtonForAddProjectTask
            projectTaskListRefatch={projectTaskListRefatch}
          /> */}
        </Box>
      </Box>
      <Box>
        {pageProgressListData ? (
          <CompletedTaskRow
            ProjectProgressList={filteredData}
            totalPageCount={pageProgressListData.totalPageCount}
            task_number_for_one_page={
              pageProgressListData.task_number_for_one_page
            }
            projectTaskListRefatch={projectTaskListRefatch}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
          />
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export default CompletedProjectTaskList;
